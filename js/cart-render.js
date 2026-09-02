/* =========================================================
   ITALIANO — عرض صفحة السلة
   ========================================================= */

function cartRowHtml(line){
  const sizeLabel = line.size ? ` (${SIZE_LABELS[line.size] || line.size})` : "";
  return `
    <div class="cart-row" data-key="${line.key}">
      <div class="cart-row-icon">${iconSvg("bucket")}</div>
      <div class="cart-row-info">
        <div class="cart-row-name">${line.name}${sizeLabel}</div>
        <div class="cart-row-meta">${line.catName} · ${line.unitPrice} جنيه للقطعة</div>
      </div>
      <div class="qty-stepper" data-key="${line.key}">
        <button type="button" data-step="-1">${iconSvg("minus")}</button>
        <span>${line.qty}</span>
        <button type="button" data-step="1">${iconSvg("plus")}</button>
      </div>
      <div class="row-price">${line.qty * line.unitPrice} <small style="font-size:.6rem">ج.م</small></div>
      <button class="row-remove" data-remove="${line.key}" aria-label="حذف الصنف">${iconSvg("trash")}</button>
    </div>`;
}

function renderCartPage(){
  const workspace = document.getElementById("workspace");
  const items = Cart.getAll();

  if (items.length === 0){
    workspace.innerHTML = `
      <div class="empty-state">
        ${iconSvg("empty")}
        <h3>السلة فاضية دلوقتي</h3>
        <p>يلا نبدأ نختار من منيو إيطاليانو</p>
        <a href="menu.html" class="btn btn-primary">تصفح المنيو</a>
      </div>`;
    return;
  }

  const subtotal = Cart.total();
  const total = subtotal + DELIVERY_FEE;

  workspace.innerHTML = `
    <div class="workspace-grid">
      <div class="cart-list">${items.map(cartRowHtml).join("")}</div>
      <aside class="summary-card">
        <h3>ملخص الطلب</h3>
        <div class="summary-line"><span>عدد الأصناف</span><span>${Cart.count()}</span></div>
        <div class="summary-line"><span>الإجمالي الفرعي</span><span>${subtotal} ج.م</span></div>
        <div class="summary-line"><span>رسوم التوصيل</span><span>${DELIVERY_FEE} ج.م</span></div>
        <div class="summary-line total"><span>الإجمالي</span><b>${total} ج.م</b></div>
        <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:20px">متابعة الطلب</a>
        <a href="menu.html" class="btn btn-ghost btn-block" style="margin-top:10px">إضافة المزيد</a>
      </aside>
    </div>`;
}

document.addEventListener("click", (e) => {
  const stepBtn = e.target.closest("[data-step]");
  if (stepBtn){
    const key = stepBtn.closest(".qty-stepper").dataset.key;
    const line = Cart.getAll().find(i => i.key === key);
    if (line) Cart.updateQty(key, line.qty + Number(stepBtn.dataset.step));
    renderCartPage();
  }
  const removeBtn = e.target.closest("[data-remove]");
  if (removeBtn){
    Cart.remove(removeBtn.dataset.remove);
    showToast("تم حذف الصنف من السلة", "trash");
    renderCartPage();
  }
});

renderCartPage();
