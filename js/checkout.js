/* =========================================================
   ITALIANO — منطق صفحة إتمام الطلب
   ========================================================= */

// لو السلة فاضية، ملهاش معنى تكمل خطوة الدفع
if (Cart.getAll().length === 0){
  location.href = "cart.html";
}

let selectedBranch = null;

function renderBranchOptions(){
  const wrap = document.getElementById("branchOptions");
  wrap.innerHTML = BRANCHES.map(b => `
    <div class="branch-option" data-branch="${b.id}">${b.name}</div>
  `).join("");
  wrap.querySelectorAll(".branch-option").forEach(el => {
    el.addEventListener("click", () => {
      wrap.querySelectorAll(".branch-option").forEach(o => o.classList.remove("active"));
      el.classList.add("active");
      selectedBranch = el.dataset.branch;
      document.querySelector('[data-field="branch"]').classList.remove("invalid");
    });
  });
}

function renderSummarySide(){
  const items = Cart.getAll();
  const subtotal = Cart.total();
  const total = subtotal + DELIVERY_FEE;
  document.getElementById("summarySide").innerHTML = `
    <h3>ملخص الطلب</h3>
    ${items.map(i => `
      <div class="summary-line">
        <span>${i.name}${i.size ? ` (${SIZE_LABELS[i.size]})` : ""} × ${i.qty}</span>
        <span>${i.qty * i.unitPrice} ج.م</span>
      </div>`).join("")}
    <div class="summary-line"><span>رسوم التوصيل</span><span>${DELIVERY_FEE} ج.م</span></div>
    <div class="summary-line total"><span>الإجمالي</span><b>${total} ج.م</b></div>
  `;
}

function setInvalid(name, invalid){
  const field = document.querySelector(`[data-field="${name}"]`);
  field.classList.toggle("invalid", invalid);
}

document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fName").value.trim();
  const phone = document.getElementById("fPhone").value.trim();
  const address = document.getElementById("fAddress").value.trim();
  const notes = document.getElementById("fNotes").value.trim();

  const phoneOk = /^01[0125][0-9]{8}$/.test(phone);

  setInvalid("name", name.length < 2);
  setInvalid("phone", !phoneOk);
  setInvalid("address", address.length < 5);
  setInvalid("branch", !selectedBranch);

  if (name.length < 2 || !phoneOk || address.length < 5 || !selectedBranch){
    showToast("من فضلك راجع البيانات المطلوبة", "close");
    return;
  }

  const branch = BRANCHES.find(b => b.id === selectedBranch);
  const order = Orders.create({ name, phone, address, notes, branchId: branch.id, branchName: branch.name });

  // فتح واتساب فورًا على رقم الفرع المختار (نافذة جديدة عشان صفحة الفاتورة تفضل مفتوحة)
  window.open(buildWhatsAppLink(order), "_blank");

  location.href = "invoice.html";
});

renderBranchOptions();
renderSummarySide();
