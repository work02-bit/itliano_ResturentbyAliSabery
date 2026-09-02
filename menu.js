/* =========================================================
   ITALIANO — منطق صفحة المنيو
   ========================================================= */

function priceOf(item, size){
  if (typeof item.p === "number") return item.p;
  return item.p[size];
}

function firstSize(item){
  if (typeof item.p === "number") return null;
  return ["L","M","S"].find(k => item.p[k] != null);
}

function setActiveCategory(id){
  document.querySelectorAll(".cat-tab").forEach(t => t.classList.toggle("active", t.dataset.target === id));
  const select = document.getElementById("catSelect");
  if (select) select.value = id;
}

function renderTabs(){
  const tabs = document.getElementById("catTabs");
  tabs.innerHTML = MENU.map((cat, i) => `
    <button class="cat-tab ${i === 0 ? "active" : ""}" data-target="${cat.id}">
      ${iconSvg(cat.icon)}<span>${cat.name}</span>
    </button>
  `).join("");

  tabs.querySelectorAll(".cat-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      setActiveCategory(tab.dataset.target);
      const section = document.getElementById(tab.dataset.target);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // قائمة منسدلة بديلة للتنقل السريع (مفيدة أساسًا على الموبايل)
  const select = document.getElementById("catSelect");
  select.innerHTML = MENU.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join("");
  select.addEventListener("change", () => {
    setActiveCategory(select.value);
    const section = document.getElementById(select.value);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function productCard(cat, item, idx){
  const uid = `${cat.id}-${idx}`;
  const hasSizes = typeof item.p !== "number";
  const sizeKeys = hasSizes ? ["L","M","S"].filter(k => item.p[k] != null) : [];
  const defaultSize = firstSize(item);
  const price = priceOf(item, defaultSize);

  const sizePicker = sizeKeys.length > 1 ? `
    <div class="size-picker" data-uid="${uid}">
      ${sizeKeys.map(k => `<button type="button" class="size-btn ${k === defaultSize ? "active" : ""}" data-size="${k}">${SIZE_LABELS[k]}</button>`).join("")}
    </div>` : "";

  return `
    <article class="product-card" data-uid="${uid}" data-name="${item.n}">
      ${item.tag ? `<span class="p-tag">${item.tag}</span>` : ""}
      ${item.img ? `<div class="product-media has-photo" style="background-image:url('${item.img}')"></div>` : ""}
      <div class="product-top">
        <h3 class="product-name">${item.n}</h3>
      </div>
      ${item.d ? `<p class="product-desc">${item.d}</p>` : ""}
      ${sizePicker}
      <div class="product-foot">
        <span class="price" data-price-display>${price}<small> جنيه</small></span>
        <button class="add-btn" data-add
          data-cat-id="${cat.id}" data-cat-name="${cat.name}"
          data-name="${item.n}" data-size="${defaultSize || ""}" data-price="${price}">
          ${iconSvg("plus")}<span>أضف</span>
        </button>
      </div>
    </article>`;
}

function renderMenu(){
  const content = document.getElementById("menuContent");
  content.innerHTML = MENU.map(cat => `
    <section class="menu-category" id="${cat.id}">
      <div class="menu-category-head">
        <div class="cat-icon-wrap">${iconSvg(cat.icon)}</div>
        <div>
          <h2>${cat.name}</h2>
          ${cat.note ? `<span>${cat.note}</span>` : ""}
        </div>
      </div>
      <div class="product-grid">
        ${cat.items.map((item, idx) => productCard(cat, item, idx)).join("")}
      </div>
    </section>
  `).join("") + `<div class="no-results" id="noResults" style="display:none">${iconSvg("empty")}<p>مفيش أصناف مطابقة للبحث</p></div>`;
}

/* --- تغيير المقاس داخل الكارت --- */
document.addEventListener("click", (e) => {
  const sizeBtn = e.target.closest(".size-btn");
  if (sizeBtn){
    const picker = sizeBtn.closest(".size-picker");
    picker.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    sizeBtn.classList.add("active");
    const card = sizeBtn.closest(".product-card");
    const name = card.querySelector(".product-name").textContent;
    const cat = MENU.find(c => card.closest("section").id === c.id);
    const item = cat.items.find(i => i.n === name);
    const size = sizeBtn.dataset.size;
    const newPrice = priceOf(item, size);
    card.querySelector("[data-price-display]").innerHTML = `${newPrice}<small> جنيه</small>`;
    const addBtn = card.querySelector("[data-add]");
    addBtn.dataset.size = size;
    addBtn.dataset.price = newPrice;
  }

  const addBtn = e.target.closest("[data-add]");
  if (addBtn){
    Cart.add({
      catId: addBtn.dataset.catId,
      catName: addBtn.dataset.catName,
      name: addBtn.dataset.name,
      size: addBtn.dataset.size || null,
      unitPrice: Number(addBtn.dataset.price),
      qty: 1
    });
    showToast(`تمت إضافة "${addBtn.dataset.name}" للسلة`, "cart");
    addBtn.classList.add("added");
    addBtn.innerHTML = `${iconSvg("check")}<span>تمت الإضافة</span>`;
    setTimeout(() => {
      addBtn.classList.remove("added");
      addBtn.innerHTML = `${iconSvg("plus")}<span>أضف</span>`;
    }, 1200);
  }
});

/* --- البحث --- */
document.getElementById("menuSearch") && document.getElementById("menuSearch").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  let anyVisible = false;
  document.querySelectorAll(".menu-category").forEach(section => {
    let sectionHasMatch = false;
    section.querySelectorAll(".product-card").forEach(card => {
      const match = !q || card.dataset.name.toLowerCase().includes(q) || section.querySelector("h2").textContent.toLowerCase().includes(q);
      card.style.display = match ? "" : "none";
      if (match) sectionHasMatch = true;
    });
    section.style.display = sectionHasMatch ? "" : "none";
    if (sectionHasMatch) anyVisible = true;
  });
  document.getElementById("noResults").style.display = anyVisible ? "none" : "block";
});

renderTabs();
renderMenu();

/* تحديث التصنيف النشط تلقائيًا أثناء التمرير (لو المتصفح بيدعمها) */
if (window.IntersectionObserver){
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveCategory(entry.target.id);
    });
  }, { rootMargin: "-160px 0px -70% 0px" });
  document.querySelectorAll(".menu-category").forEach(sec => sectionObserver.observe(sec));
}

/* لو الرابط فيه # لتصنيف معين (جاي من الصفحة الرئيسية) */
if (location.hash){
  const target = document.querySelector(location.hash);
  if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 200);
}
