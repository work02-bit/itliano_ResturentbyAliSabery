/* =========================================================
   ITALIANO — إرسال الطلب على واتساب
   =========================================================
   بيبني رسالة نصية منسّقة فيها كل تفاصيل الفاتورة (رقم الطلب،
   بيانات العميل، الأصناف، الإجمالي) ويفتحها في محادثة واتساب
   على رقم الفرع اللي العميل اختاره وقت الدفع.
   ========================================================= */

function buildWhatsAppMessage(order){
  const lines = [];
  lines.push(`*طلب جديد من موقع إيطاليانو*`);
  lines.push(`رقم الطلب: ${order.id}`);
  lines.push(``);
  lines.push(`*بيانات العميل*`);
  lines.push(`الاسم: ${order.customer.name}`);
  lines.push(`الهاتف: ${order.customer.phone}`);
  lines.push(`العنوان: ${order.customer.address}`);
  lines.push(`الفرع: ${order.customer.branchName}`);
  if (order.customer.notes) lines.push(`ملاحظات: ${order.customer.notes}`);
  lines.push(``);
  lines.push(`*الأصناف*`);
  order.items.forEach(i => {
    const sizeLabel = i.size ? ` (${SIZE_LABELS[i.size] || i.size})` : "";
    lines.push(`- ${i.name}${sizeLabel} × ${i.qty} — ${i.qty * i.unitPrice} ج.م`);
  });
  lines.push(``);
  lines.push(`*الإجمالي النهائي: ${order.total} ج.م*`);

  return lines.join("\n");
}

/** يرجع رابط واتساب جاهز لفتحه (يوجّه لرقم الفرع الصحيح) */
function buildWhatsAppLink(order){
  const branch = BRANCHES.find(b => b.id === order.customer.branchId);
  const number = (branch && branch.whatsapp) || (branch && branch.phone) || "";
  const message = encodeURIComponent(buildWhatsAppMessage(order));
  return `https://wa.me/${number}?text=${message}`;
}
