/* =========================================================
   ITALIANO — منطق صفحة الفاتورة
   ========================================================= */

function formatDate(ts){
  const d = new Date(ts);
  return d.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }) +
    " — " + d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
}

function renderInvoice(){
  const order = Orders.getLastOrder();
  const wrap = document.getElementById("invoiceWrap");

  if (!order){
    wrap.innerHTML = `
      <div class="empty-state">
        ${iconSvg("empty")}
        <h3>لا يوجد طلب لعرضه</h3>
        <p>لسه معملتش أي طلب، ابدأ من المنيو</p>
        <a href="menu.html" class="btn btn-primary">تصفح المنيو</a>
      </div>`;
    return;
  }

  const subtotal = order.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const deliveryFee = order.total - subtotal;

  wrap.innerHTML = `
    <div class="invoice-card">
      <div class="invoice-head">
        <div>
          <h2>إيطاليانو</h2>
          <span style="font-size:.82rem; color:rgba(246,239,221,.7)">فاتورة طلب</span>
        </div>
        <div class="order-no">
          <span style="font-size:.75rem; color:rgba(246,239,221,.6)">رقم الطلب</span>
          <strong>${order.id}</strong>
        </div>
      </div>
      <div class="invoice-body">
        <div class="invoice-meta">
          <div><span>اسم العميل</span><strong>${order.customer.name}</strong></div>
          <div><span>رقم الهاتف</span><strong dir="ltr">${order.customer.phone}</strong></div>
          <div><span>العنوان</span><strong>${order.customer.address}</strong></div>
          <div><span>الفرع</span><strong>${order.customer.branchName}</strong></div>
          <div><span>تاريخ الطلب</span><strong>${formatDate(order.createdAt)}</strong></div>
          ${order.customer.notes ? `<div><span>ملاحظات</span><strong>${order.customer.notes}</strong></div>` : ""}
        </div>

        <table class="invoice-table">
          <thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th></tr></thead>
          <tbody>
            ${order.items.map(i => `
              <tr>
                <td>${i.name}${i.size ? ` (${SIZE_LABELS[i.size] || i.size})` : ""}</td>
                <td>${i.qty}</td>
                <td>${i.qty * i.unitPrice} ج.م</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <div class="invoice-totals">
          <div class="summary-line"><span>الإجمالي الفرعي</span><span>${subtotal} ج.م</span></div>
          <div class="summary-line"><span>رسوم التوصيل</span><span>${deliveryFee} ج.م</span></div>
          <div class="summary-line total"><span>الإجمالي النهائي</span><b>${order.total} ج.م</b></div>
        </div>

        <div class="invoice-status status-${order.status}" id="statusPill">
          ${iconSvg("clock")}<span>${STATUS_LABELS[order.status]}</span>
        </div>

        <div class="invoice-actions">
          <button class="btn btn-whatsapp" id="whatsappBtn">${iconSvg("whatsapp")} إرسال الطلب عبر واتساب</button>
          <a href="menu.html" class="btn btn-ghost">طلب جديد</a>
        </div>
      </div>
      <p class="thanks-note">لو محصلش تفتح واتساب لوحدها، دوس على الزرار وابعت الرسالة يدويًا عشان يوصل طلبك للفرع.</p>
    </div>`;

  document.getElementById("whatsappBtn").addEventListener("click", () => {
    window.open(buildWhatsAppLink(order), "_blank");
  });
}

renderInvoice();
