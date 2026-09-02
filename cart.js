/* =========================================================
   ITALIANO — إدارة السلة والطلبات عبر Local Storage
   ========================================================= */

const DELIVERY_FEE = 20;

const Cart = {
  KEY: "italiano_cart",

  _read(){
    try{
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  },

  _write(items){
    localStorage.setItem(this.KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent("cart:changed", { detail: items }));
  },

  /** يرجع كل عناصر السلة الحالية */
  getAll(){ return this._read(); },

  /** يضيف صنف؛ لو نفس الصنف بنفس المقاس موجود يزود الكمية فقط */
  add({ catId, catName, name, size, unitPrice, qty = 1 }){
    const items = this._read();
    const lineKey = `${catId}__${name}__${size || "std"}`;
    const existing = items.find(i => i.key === lineKey);
    if (existing){
      existing.qty += qty;
    } else {
      items.push({ key: lineKey, catId, catName, name, size: size || null, unitPrice, qty });
    }
    this._write(items);
    return lineKey;
  },

  updateQty(key, qty){
    let items = this._read();
    if (qty <= 0){
      items = items.filter(i => i.key !== key);
    } else {
      const line = items.find(i => i.key === key);
      if (line) line.qty = qty;
    }
    this._write(items);
  },

  remove(key){
    const items = this._read().filter(i => i.key !== key);
    this._write(items);
  },

  clear(){ this._write([]); },

  count(){ return this._read().reduce((s, i) => s + i.qty, 0); },

  total(){ return this._read().reduce((s, i) => s + i.qty * i.unitPrice, 0); }
};

/* =========================================================
   إدارة الطلبات (تُستخدم في صفحة الفاتورة)
   ========================================================= */
const Orders = {
  KEY: "italiano_orders",
  LAST_KEY: "italiano_last_order_id",

  _read(){
    try{
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  },
  _write(orders){ localStorage.setItem(this.KEY, JSON.stringify(orders)); },

  getAll(){ return this._read().sort((a,b) => b.createdAt - a.createdAt); },

  getById(id){ return this._read().find(o => o.id === id); },

  /** ينشئ طلبًا جديدًا من محتوى السلة الحالية وبيانات العميل */
  create(customer){
    const items = Cart.getAll();
    const orders = this._read();
    const id = "ORD-" + (1000 + orders.length + 1);
    const order = {
      id,
      createdAt: Date.now(),
      customer,
      items,
      total: Cart.total() + DELIVERY_FEE,
      status: "new"
    };
    orders.push(order);
    this._write(orders);
    localStorage.setItem(this.LAST_KEY, id);
    Cart.clear();
    return order;
  },

  getLastOrder(){
    const id = localStorage.getItem(this.LAST_KEY);
    return id ? this.getById(id) : null;
  }
};

const STATUS_LABELS = {
  new: "جديد",
  preparing: "جاري التحضير",
  ready: "جاهز",
  delivered: "تم التسليم"
};
