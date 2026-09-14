/* =========================================================
   ITALIANO — سلوكيات عامة مشتركة بين كل الصفحات
   ========================================================= */

/** تحديث عداد السلة في الهيدر */
function syncCartBadge(){
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = Cart.count();
  });
}

/** إظهار تنبيه صغير أسفل الصفحة */
function showToast(message, icon = "check"){
  let toast = document.querySelector(".toast");
  if (!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${iconSvg(icon)}<span>${message}</span>`;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  syncCartBadge();

  // زر فتح/إغلاق قائمة الجوال
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav){
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.innerHTML = iconSvg(isOpen ? "close" : "menu");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.innerHTML = iconSvg("menu");
    }));
  }

  // حقن أيقونة السلة داخل الزر
  document.querySelectorAll("[data-icon]").forEach(el => {
    el.innerHTML = iconSvg(el.getAttribute("data-icon"));
  });
});

document.addEventListener("cart:changed", syncCartBadge);
