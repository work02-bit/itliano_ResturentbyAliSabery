/* =========================================================
   ITALIANO — بيانات المطعم (الفروع + المنيو)
   البيانات مستخرجة من صور المنيو الرسمية للمطعم
   ========================================================= */

/* الفروع الثلاثة
   ملحوظة: حقل whatsapp هو الرقم اللي هيتفتح عليه واتساب لما العميل
   يبعت طلبه. لو رقم الواتساب مختلف عن رقم الفرع العادي، غيّره هنا
   بصيغة دولية من غير + أو أصفار زيادة (مصر: يبدأ بـ 20 بدل الصفر الأول).

   openHour / closeHour: ساعات العمل بنظام 24 ساعة، تُستخدم لحساب
   "مفتوح الآن" / "مغلق" تلقائيًا. لو المواعيد بتعدي نص الليل
   (زي 12 ظهرًا لحد 4 فجرًا) اكتبها زي ما هي، الدالة isBranchOpenNow
   بتحسبها صح لوحدها. غيّر الرقمين هنا لو مواعيد فرع مختلفة عن التانية. */
const BRANCHES = [
  {
    id: "malawi",
    name: "فرع ملوي",
    address: "شارع الجلاء، أمام مركز شرطة ومجلس مدينة ملوي",
    phone: [
  "01024822389",
  "01200230377",
  "01110225373",
  "01007735147",
  "01228387987"
],
    whatsapp: "201024822389",
    openHour: 12,
    closeHour: 4
  },
  {
    id: "dermwas",
    name: "فرع ديرمواس",
    address: "ديرمواس، جاردينيا، حمام السباحة",
   phone: [
  "01005608404",
  "01277702073",
   "01118758584"
],
    whatsapp: "201005608404",
    openHour: 12,
    closeHour: 4
  },
  {
    id: "nady_alhayah",
    name: "فرع نادي الحياة",
    address: " مدخل ملوي قبلي",
   phone: [
  "01055455467",
  "01121554554"
],
    whatsapp: "201024822389",
    openHour: 16,
    closeHour: 4
  }
];

/* بيرجع نص ساعات العمل بصيغة عربية جاهزة للعرض، مبني على openHour/closeHour */
function branchHoursLabel(branch){
  const fmt = (h) => {
    const period = h >= 12 && h < 24 ? (h === 12 ? "ظهرًا" : "مساءً") : (h === 0 ? "منتصف الليل" : "فجرًا");
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12} ${period}`;
  };
  return `من ${fmt(branch.openHour)} حتى ${fmt(branch.closeHour)}`;
}

/* بيرجع true لو الفرع مفتوح دلوقتي بناءً على وقت جهاز الزائر */
function isBranchOpenNow(branch){
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const openMins = branch.openHour * 60;
  const closeMins = branch.closeHour * 60;
  if (closeMins <= openMins){
    // المواعيد بتعدي نص الليل (مثال: 12 ظهرًا لحد 4 فجرًا)
    return mins >= openMins || mins < closeMins;
  }
  return mins >= openMins && mins < closeMins;
}


/* أيقونة كل تصنيف (مفاتيح تُستخدم مع js/icons.js) */

/* هيكل كل صنف:
   { n: الاسم, p: رقم واحد أو { L, M, S } , d: وصف/مكونات (اختياري), tag: ملحوظة صغيرة (اختياري), img: مسار صورة الصنف (اختياري) }

   لإضافة صورة لأي صنف: حط صورته في assets/food/ وبعدين ضيف مفتاح
   img للصنف هنا، مثال:
   { n: "إيطاليانو", p: {...}, img: "assets/food/pizza-italiano.jpg" }
   لو مفيش img، الكارت هيفضل شكله زي دلوقتي بالأيقونة عادي.
*/

const MENU = [
  {
    id: "mix-boxes",
    name: "وجبات ميكس",
    icon: "bucket",
    note: "أشهر وجبات إيطاليانو",
    items: [
      { n: "ستار بوكس", p: 200, d: "2 قطعة بروست + 2 قطعة استربس + أرز + بطاطس +  2 تومية + كول سلو +3 خبز + كاتشب" ,img:"assets/food/mixchicken/small.jpg"},
      { n: "شير بوكس", p: 350, d: "4 قطع بروست + 4 قطع استربس + 2 أرز + بطاطس + 3 تومية + 2 كول سلو +6 خبز + كاتشب",img:"assets/food/mixchicken/large.jpg" }
    ]
  },
  {
    id: "fried-boxes",
    name: "فرايد بوكس",
    icon: "drumstick",
    items: [
      { n: "سناك بوكس", p: 110, d: "2 قطعة (صدر + جناح) أو (فخد + دبوس) +1 أرز + تومية +2 خبز + كاتشب + بطاطس" ,img:"assets/food/friedbox/snak.jpg"},
      { n: "ميديام بوكس", p: 140, d: "3 قطع (صدر + فخد + جناح) +1 أرز + تومية +2 خبز + كاتشب + كول سلو",img:"assets/food/friedbox/med.jpg" },
      { n: "دينر بوكس", p: 155, d: "3 قطع (صدر + فخد + دبوس) +1 أرز + تومية +2 خبز + كاتشب + كول سلو",img:"assets/food/friedbox/dinner.jpg" },
      { n: "بيج بوكس", p: 200, d: "4 قطع (صدر + فخد + دبوس + جناح) +1 أرز +2 تومية +3 خبز + كاتشب + كول سلو",img:"assets/food/friedbox/big.jpg" },
      { n: "بريك بوكس", p: 220, d: "5 قطع (صدر + فخد + دبوس + جناح + كيلة) +1 أرز +3 تومية +3 خبز + كاتشب +2 كول سلو",img:"assets/food/friedbox/photo_2026-09-10_21-05-39.jpg" }
    ]
  },
  {
    id: "family-boxes",
    name: "وجبات اللمة",
    icon: "family",
    note: "للتجمعات الكبيرة",
    items: [
      { n: "فاميلي بوكس", p: 395, d: "9 قطع (2صدر +2 فخد + 2 دبوس + 2 جناح + 1 كيلة) +2 أرز +3 تومية +5 خبز + بطاطس + كاتشب +3 كول سلو" ,img:"assets/food/family/9.jpg"},
      { n: "سوبر فاميلي بوكس", p: 520, d: "13 قطعة (2 صدر + 3 فخد +3 دبوس + 3 جناح + 2 كيلة) +3 أرز +4 تومية +7 خبز + بطاطس + كاتشب +3 كول سلو + لتر كولا",img:"assets/food/family/13.jpg" },
      { n: "بارتي بوكس", p: 750, d: "18 قطعة (4 صدر +4  فخد +4 دبوس +4 جناح + 2 كيلة) +3 أرز +4 تومية +9 خبز + بطاطس + كاتشب +4 كول سلو + لتر كولا" ,img:"assets/food/family/18.jpg"}
    ]
  },
  {
    id: "strips-meals",
    name: "وجبات استربس",
    icon: "strips",
    items: [
      { n: "سناك استربس", p: 120, d: "3 قطع استربس +1 أرز + تومية +3 خبز + كاتشب",img:"assets/food/streps/1.jpg" },
      { n: "بيج استربس", p: 230, d: "6 قطع استربس +1 أرز + بطاطس +2 تومية +5 خبز + كاتشب" ,img:"assets/food/streps/2.jpg"},
      { n: "إكسترا استربس", p: 330, d: "9 قطع استربس +2 أرز + بطاطس +3 تومية +8 خبز + كاتشب" ,img:"assets/food/streps/3.jpg"},
      { n: "فاميلي إكسترا", p: 420, d: "12 قطعة استربس +3 أرز + بطاطس +4 تومية +15 خبز + كاتشب", img:"assets/food/streps/4.jpg"}
    ]
  },
  {
    id: "kids-meals",
    name: "وجبات الأطفال",
    icon: "kids",
    items: [
      { n: " 1 جناح +  1 كيلة ", p: 65, d: "أرز + تومية + خبز + كاتشب + بطاطس " ,img:"assets/food/kids/1.jpg"},
      { n: " 1 دبوس + 1 جناح + 1 كيلة", p: 90, d: "أرز + تومية + خبز + كاتشب + بطاطس" ,img:"assets/food/kids/2.jpg"},
      { n: "4 أجنحة", p: 90, d: "أرز + تومية + خبز + كاتشب + بطاطس" ,img:"assets/food/kids/3.jpg"}
    ]
  },
  {
    id: "rizo-rice",
    name: "أرز ريزو",
    icon: "rice",
    items: [
      { n: "أرز استربس", p: 80 ,img:"assets/food/rice/photo_2026-09-10_22-24-26.jpg"},
      { n: "أرز سادة", p: 30 ,img:"assets/food/rice/sada.jpg"}
    ]
  },
  {
    id: "chicken-extras",
    name: "إضافات الفرايد تشيكن",
    icon: "extras",
    items: [
      { n: "بطاطس", p: { L: 30, S: 20 } ,img:"assets/food/extrachicken/botato.jpg"},
      { n: "صوص شيدر", p: 25,img:"assets/food/extrachicken/sossheder.jpg" },
      { n: "بطاطس شيدر", p: 60 ,img:"assets/food/extrachicken/boatosheder.jpg"},
      { n: "بطاطس موتزاريلا", p: 80 ,img:"assets/food/extrachicken/morzlla.jpg"},
      { n: "تشيكن فرايز", p: 85,img:"assets/food/extrachicken/frayz.jpg" },
      { n: "خبز", p: 3 ,img:"assets/food/extrachicken/kaizr.jpg"},
      { n: "تومية", p: 10,img:"assets/food/extrachicken/somia.jpg" },
      { n: "كول سلو", p: 10,img:"assets/food/extrachicken/kolsolo.jpg" },
      { n: "جناح", p: 25 ,img:"assets/food/extrachicken/gna7.jpg"},
      { n: "دبوس", p: 40,img:"assets/food/extrachicken/dabos.jpg" },
      { n: "فخد", p: 50,img:"assets/food/extrachicken/fakhz.jpg" },
      { n: "صدر", p: 80 ,img:"assets/food/extrachicken/sdr.jpg"},
      { n: "مشروب غازي (لتر)", p: 30 ,img:"assets/food/extrachicken/mashropat.jpg"}
    ]
  },

  {
    id: "pizza-italiano",
    name: "بيتزا إيطالى",
    icon: "pizza",
    note: "الأشهر بين رواد إيطاليانو",
    items: [
      { n: "مرجريتا", p: { L: 120, M: 100, S: 80 },img:"assets/food/pizza/margerta.jpg" },
      { n: "فراخ", p: { L: 150, M: 125, S: 100 },img:"assets/food/pizza/chicken.jpg" },
      { n: "لحمة", p: { L: 150, M: 125, S: 100 },img:"assets/food/pizza/meat.jpg" },
      { n: "بانيه بلدى", p: { L: 170, M: 135, S: 110 },img:"assets/food/pizza/baneebaldi.jpg" },
      { n: "بانيه كوكى", p: { L: 150, M: 125, S: 100 },img:"assets/food/pizza/baneecoki.jpg" },
      { n: "مكس جبن", p: { L: 150, M: 125, S: 100 },img:"assets/food/pizza/mixgbn.jpg" },
      { n: "مشروم", p: { L: 150, M: 125, S: 100 },img:"assets/food/pizza/mashrom.jpg"},
      { n: "تشيكن باربكيو", p: { L: 170, M: 140, S: 120 },img:"assets/food/pizza/barbkio.jpg" },
      { n: "تشكن شيدر", p: { L: 170, M: 140, S: 120 },img:"assets/food/pizza/chickenshider.jpg" },
      { n: "تشيكن رانش", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/ransh.jpg"},
      { n: "إيطاليانو", p: { L: 180, M: 150, S: 120 }, d: "فور سيزون: لحمة، فراخ، سجق، سوسيس",img:"assets/food/pizza/itliano.jpg" },
      { n: "ميكسيكانو", p: { L: 150, M: 125, S: 100 } ,img:"assets/food/pizza/mixco.jpg"},
      { n: "استربس", p: { L: 170, M: 135, S: 110 } ,img:"assets/food/pizza/streps.jpg"},
      { n: "مكس فراخ", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/mixchicken.jpg"},
      { n: "مكس لحوم", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/mixmeat.jpg"},
      { n: "سوبر كرانشى", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/supercranshy.jpg"},
      { n: "سوبر سوبريم", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/supersuprem.jpg"},
      { n: "زنجر", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/zngr.jpg"},
      { n: "سلامى", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/salami.jpg"},
      { n: "سوسيس", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/soses.jpg"},
      { n: "سجق", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/sogk.jpg"},
      { n: "بسطرمة", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/bastrma.jpg"},
      { n: "تونة", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/tona.jpg"},
      { n: "فاهيتا", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/faheta.jpg"},
      { n: "شيش", p: { L: 170, M: 140, S: 120 } ,img:"assets/food/pizza/shesh.jpg"}
    ]
  },
  {
    id: "pizza-sharky",
    name: "بيتزا شرقى",
    icon: "pizza",
    items: [
      { n: "لحمة", p: { L: 190, M: 150, S: 120 },img:"assets/food/pizzasharqi/meat.jpg" },
      { n: "فراخ", p: { L: 190, M: 150, S: 120 },img:"assets/food/pizzasharqi/chicken.jpg" },
      { n: "سجق", p: { L: 190, M: 150, S: 120 } ,img:"assets/food/pizzasharqi/sogk.jpg"},
      { n: "سوسيس", p: { L: 190, M: 150, S: 120 } ,img:"assets/food/pizzasharqi/soses.jpg"},
      { n: "بسطرمة", p: { L: 190, M: 150, S: 120 },img:"assets/food/pizzasharqi/bastrma.jpg" },
      { n: "مشكل جبن", p: { L: 190, M: 150, S: 120 },img:"assets/food/pizzasharqi/mixgbn.jpg" },
      { n: "مشكل لحوم", p: { L: 200, M: 160, S: 130 } ,img:"assets/food/pizzasharqi/mixmeat.jpg"},
      { n: "مشكل فراخ", p: { L: 200, M: 160, S: 130 },img:"assets/food/pizzasharqi/mixchicken.jpg" },
      { n: "إيطاليانو", p: { L: 200, M: 160, S: 130 },img:"assets/food/pizzasharqi/itliano.jpg", d: "فور سيزون: لحمة، فراخ، سجق، سوسيس" },
      { n: "برو ماكس", p: 250, tag: "عائلي",img:"assets/food/pizzasharqi/promax.jpg" }
    ]
  },
  {
    id: "feteer-hadeq",
    name: "فطير حادق",
    icon: "feteer",
    items: [
      { n: "خضروات", p: { L: 130, M: 100, S: 90 },img:"assets/food/fateerr/khodar.jpg" },
      { n: "جبنة رومي وبيض", p: { L: 150, M: 120, S: 100 },img:"assets/food/fateerr/egg&gbn.jpg" },
      { n: "لحمة", p: { L: 180, M: 140, S: 110 },img:"assets/food/fateerr/meat.jpg" },
      { n: "فراخ", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/chicken.jpg"},
      { n: "بانيه كوكى", p: { L: 180, M: 140, S: 110 },img:"assets/food/fateerr/baneekoki.jpg" },
      { n: "مشروم", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/mashrom.jpg"},
      { n: "مشكل لحوم", p: { L: 190, M: 150, S: 120 } ,img:"assets/food/fateerr/mixmeat.jpg"},
      { n: "مشكل فراخ", p: { L: 190, M: 150, S: 120 } ,img:"assets/food/fateerr/mixchicken.jpg"},
      { n: "مشكل جبن", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/mixgbn.jpg"},
      { n: "سجق", p: { L: 180, M: 140, S: 110 },img:"assets/food/fateerr/sogk.jpg" },
      { n: "سوسيس", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/sosess.jpg"},
      { n: "بانيه بلدى", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/baneebaldi.jpg"},
      { n: "زنجر", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/zngr.jpg"},
      { n: "بسطرمة", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/bastrma.jpg"},
      { n: "تونة", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/tona.jpg"},
      { n: "برجر", p: { L: 180, M: 140, S: 110 } ,img:"assets/food/fateerr/burger.jpg"},
      { n: "إيطاليانو", p: { L: 200, M: 150, S: 130 },img:"assets/food/fateerr/itliano.jpg", d: "فور سيزون: لحمة، فراخ، سجق، سوسيس" }
    ]
  },
  {
    id: "feteer-helw",
    name: "فطير حلو",
    icon: "sweet",
    items: [
      { n: "سكر سادة", p: { L: 50, M: 30 },img:"assets/food/fateerr/sokrsada.jpg" },
      { n: "سكر وقرفة", p: { L: 60, M: 40 },img:"assets/food/fateerr/sokrkerfa.jpg" },
      { n: "بغاشة", p: { L: 60, M: 40 } ,img:"assets/food/fateerr/bghasha.jpg"},
      { n: "كاستر", p: { L: 70, M: 50 },img:"assets/food/fateerr/kaster.jpg" },
      { n: "بسكوتة", p: { L: 100, M: 80 },img:"assets/food/fateerr/bskweet.jpg" },
      { n: "بسبوسة", p: { L: 150, M: 100 },img:"assets/food/fateerr/basbosa.jpg" },
      { n: "قشطة وعسل", p: { L: 130, M: 100 },img:"assets/food/fateerr/ashtaw3sl.jpg" },
      { n: "شيكولاتة", p: { L: 150, M: 100 },img:"assets/food/fateerr/choclate.jpg" },
      { n: "نوتيلا ميكس", p: { L: 170, M: 120 },img:"assets/food/fateerr/notilamix.jpg" },
      { n: "مكسرات", p: { L: 150, M: 120 },img:"assets/food/fateerr/mxsarat.jpg" },
      { n: "فواكه", p: { L: 300, M: 200 },img:"assets/food/fateerr/fruit.jpg" }
    ]
  },
  {
    id: "calzone",
    name: "كلزونى",
    icon: "calzone",
    items: [
      { n: "لحمة", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/meat.jpg"},
      { n: "فراخ", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/chicken.jpg"},
      { n: "كوردن بلو", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/cordnblo.jpg"},
      { n: "ميجا", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/mega.jpg"},
      { n: "سجق", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/sogk.jpg"},
      { n: "سوسيس", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/soses.jpg"},
      { n: "مكس لحوم", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/mixmeat.jpg"},
      { n: "مكس فراخ", p: { L: 150, M: 130, S: 110 } ,img:"assets/food/kalzony/mixchicken.jpg"}
    ]
  },
  {
    id: "rocket-roll",
    name: "صاروخ رول",
    icon: "roll",
    items: [
      { n: "لحمة", p: { L: 120, M: 100 },img:"assets/food/roll/meat.jpg" },
      { n: "فراخ", p: { L: 120, M: 100 } ,img:"assets/food/roll/chicken.jpg"},
      { n: "مكس جبن", p: { L: 120, M: 100 },img:"assets/food/roll/mixgbn.jpg" },
      { n: "مكس لحوم", p: { L: 120, M: 100 } ,img:"assets/food/roll/mixmeat.jpg"},
      { n: "مكس فراخ", p: { L: 120, M: 100 },img:"assets/food/roll/mixchicken.jpg" },
      { n: "سجق", p: { L: 120, M: 100 } ,img:"assets/food/roll/sogk.jpg"},
      { n: "سوسيس", p: { L: 120, M: 100 } ,img:"assets/food/roll/soses.jpg"},
      { n: "زنجر", p: { L: 120, M: 100 } ,img:"assets/food/roll/zngr.jpg"},
      { n: "بانيه بلدى", p: { L: 120, M: 100 },img:"assets/food/roll/banee.jpg" },
      { n: "كفتة بلدي", p: { L: 120, M: 100 },img:"assets/food/roll/koftamafroma.jpg" }
    ]
  },
  {
    id: "syrian-meals",
    name: "وجبات سورى",
    icon: "syrian",
    items: [
      { n: "وجبة عربى", p: { L: 140, M: 110, S: 90 },img:"assets/food/wagbasory/3rby.jpg" },
      { n: "فتة شاورما فراخ", p: { L: 150, M: 130, S: 100 },img:"assets/food/wagbasory/fata.jpg" },
      { n: "وجبة زنجر", p: { L: 140, M: 120, S: 100 } ,img:"assets/food/wagbasory/zngr.jpg"},
      { n: "وجبة بانيه", p: { L: 140, M: 120, S: 100 } ,img:"assets/food/wagbasory/banee.jpg"},
      { n: "بوكس الأبطال", p: 400, tag: "عائلي",img:"assets/food/wagbasory/mix.jpg" }
    ]
  },
  {
    id: "italiano-sandwiches",
    name: "سندوتشات إيطاليانو",
    icon: "sandwich",
    items: [
      { n: "كوردن بلو زنجر", p: 75,img:"assets/food/sandwtchh/kordnbzngr.jpg" },
      { n: "كوردن بلو برجر", p: 75 ,img:"assets/food/sandwtchh/kordonbb.jpg"},
      { n: "برجر", p: 75,img:"assets/food/sandwtchh/burger.jpg" },
      { n: "زنجر", p: 75,img:"assets/food/sandwtchh/zngr.jpg" },
      { n: "كوردن بلو", p: 75 ,img:"assets/food/sandwtchh/kordnbl.jpg"},
      { n: "استربس", p: 75,img:"assets/food/sandwtchh/streps.jpg" },
      { n: "شاورما", p: 75,img:"assets/food/sandwtchh/shawrma.jpg" },
      { n: "بانيه بلدى", p: 75 ,img:"assets/food/sandwtchh/banee.jpg"},
      { n: "سوبر كرانشى", p: 75 ,img:"assets/food/sandwtchh/supercrnshy.jpg"},
      { n: "إيطاليانو",d: "فراخ + لحمة + سجق + سوسيس" ,p: 75,img:"assets/food/sandwtchh/itliano.jpg" }
    ]
  },
  {
    id: "syrian-sandwiches",
    name: "سندوتشات سورى",
    icon: "sandwich",
    items: [
      { n: "بطاطس", p: { L: 55, M: 45, S: 35 },img:"assets/food/shawrma/botato.jpg" },
      { n: "شاورما", p: { L: 90, M: 80, S: 70 },img:"assets/food/shawrma/shawrma.jpg" },
      { n: "بانيه كوكى", p: { L: 80, M: 70, S: 60 },img:"assets/food/shawrma/baneek.jpg" },
      { n: "كفتة", p: { L: 70, M: 60, S: 50 } ,img:"assets/food/shawrma/koftA.jpg"},
      { n: "برجر", p: { L: 80, M: 70, S: 60 },img:"assets/food/shawrma/burger.jpg" },
      { n: "زنجر", p: { L: 90, M: 80, S: 70 } ,img:"assets/food/shawrma/zngr.jpg"},
      { n: "بانيه بلدى", p: { L: 90, M: 80, S: 70 },img:"assets/food/shawrma/banee.jpg" },
      { n: "استربس", p: { L: 90, M: 80, S: 70 } ,img:"assets/food/shawrma/streps.jpg"},
      { n: "شيش", p: { L: 90, M: 80, S: 70 } ,img:"assets/food/shawrma/shesh.jpg"},
      { n: "لحمة مفرومة", p: { L: 90, M: 80, S: 70 } ,img:"assets/food/shawrma/LA7MAmafroma.jpg"}
    ]
  },
  {
    id: "pasta",
    name: "مكرونات",
    icon: "pasta",
    items: [
      { n: "بشاميل لحمة", p: { L: 90, M: 70 } ,img:"assets/food/pasta/meat.jpg"},
      { n: "بشاميل فراخ", p: { L: 90, M: 70 } ,img:"assets/food/pasta/chicken.jpg"},
      { n: "نجرسكو", p: { L: 90, M: 70 },img:"assets/food/pasta/negrsko.jpg" },
      { n: "باستا", p: { L: 110, M: 90 } ,img:"assets/food/pasta/pasta.jpg"},
      { n: "ميكس", p: { L: 110, M: 90 } ,img:"assets/food/pasta/mix.jpg"}
    ]
  },
  {
    id: "basmati-rice",
    name: "الأرز البسمتى",
    icon: "rice",
    items: [
      { n: "ريزو سادة", p: { L: 30, M: 15 },img:"assets/food/rice/sada.jpg" },
      { n: "ريزو فراخ", p: { L: 90, M: 70 } ,img:"assets/food/rice/chicken.jpg"},
      { n: "ريزو لحمة", p: { L: 90, M: 70 },img:"assets/food/rice/meat.jpg" },
      { n: "ريزو بانيه كوكى", p: { L: 80, M: 60 },img:"assets/food/rice/baneekoki.jpg" },
      { n: "ريزو بانيه بلدى", p: { L: 90, M: 70 },img:"assets/food/rice/baneeballdy.jpg" },
      { n: "ريزو زنجر", p: { L: 90, M: 70 },img:"assets/food/rice/zngr.jpg" },
      { n: "ريزو ميكس فراخ", p: { L: 100, M: 80 },img:"assets/food/rice/mixchicken.jpg" }
    ]
  },
  {
    id: "crepes",
    name: "الكريبات",
    icon: "crepe",
    items: [
      { n: "كريب بطاطس", p: { L: 55, M: 45 } ,img:"assets/food/crepes/potato.jpg"},
      { n: "كريب بانيه كوكى", p: { L: 70, M: 60 } ,img:"assets/food/crepes/banekoki.jpg"},
      { n: "كريب مكس جبن", p: { L: 70, M: 60 } ,img:"assets/food/crepes/mixgbnn.jpg"},
      { n: "كريب مشروم", p: { L: 90, M: 70 } ,img:"assets/food/crepes/mashrom.jpg"},
      { n: "كريب شاورما", p: { L: 90, M: 70 } ,img:"assets/food/crepes/shawrma.jpg"},
      { n: "كريب لحمة", p: { L: 90, M: 70 } ,img:"assets/food/crepes/meat.jpg"},
      { n: "كريب كفتة", p: { L: 90, M: 70 } ,img:"assets/food/crepes/kofta.jpg"},
      { n: "كريب برجر", p: { L: 90, M: 70 } ,img:"assets/food/crepes/burger.jpg"},
      { n: "كريب كبدة", p: { L: 90, M: 70 } ,img:"assets/food/crepes/kebda.jpg"},
      { n: "كريب سجق", p: { L: 90, M: 70 } ,img:"assets/food/crepes/sogk.jpg"},
      { n: "كريب سوسيس", p: { L: 90, M: 70 },img:"assets/food/crepes/sosess.jpg" },
      { n: "كريب بانيه بلدى", p: { L: 100, M: 80 } ,img:"assets/food/crepes/banebaldi.jpg"},
      { n: "كريب زنجر", p: { L: 100, M: 80 },img:"assets/food/crepes/zengr.jpg" },
      { n: "كريب شيش", p: { L: 120, M: 100 },img:"assets/food/crepes/shesh.jpg" },
      { n: "كريب استربس", p: { L: 100, M: 80 },img:"assets/food/crepes/sterps.jpg" },
      { n: "كريب مكس فراخ", p: { L: 100, M: 80 } ,img:"assets/food/crepes/mixchicken.jpg"},
      { n: "كريب فاهيتا", p: { L: 120, M: 100 },img:"assets/food/crepes/faheta.jpg" },
      { n: "كريب مكس لحوم", p: { L: 120, M: 100 } ,img:"assets/food/crepes/mixmeat.jpg"},
      { n: "كريب سوبر كرانشى", p: { L: 120, M: 100 },img:"assets/food/crepes/supercranshy.jpg" },
      { n: "كريب إيطاليانو", p: { L: 120, M: 100 } ,img:"assets/food/crepes/itliano.jpg"},
      { n: "كريب الوحش", p: 150, tag: "الأكبر",img:"assets/food/crepes/photo_2026-09-03_22-22-38.jpg" }
    ]
  },
  {
    id: "sweet-crepe",
    name: "الكريب الحلو",
    icon: "sweet",
    items: [
      { n: "شيكولاتة", p: { L: 80, M: 70 },img:"assets/food/crepes/choclate.jpg" },
      { n: "شيكولاتة موز", p: { L: 80, M: 70 } ,img:"assets/food/crepes/choclatmoz.jpg"},
      { n: "شيكولاتة ميكس", p: { L: 80, M: 70 },img:"assets/food/crepes/choclatmix.jpg" },
      { n: "شيكولاتة مكسرات", p: { L: 80, M: 70 },img:"assets/food/crepes/choclatmxrat.jpg" }
    ]
  },
  {
    id: "pizza-extras",
    name: "إضافات  البيتزا-الكريبات-الفطير-السندوتشات-الوجبات-الارز -المكرونات",
    icon: "extras",
    items: [
      { n: "موتزريلا", p: { L: 40, M: 30, S: 20 } ,img:"assets/food/extras/mot.jpg"},
      { n: "صوصات", p: { L: 40, M: 30, S: 20 }  ,img:"assets/food/extras/صوصات.jpg"},
      { n: "فراخ", p: { L: 80, M: 60, S: 40 }  ,img:"assets/food/extras/EXTRACHICKEN.jpg"},
      { n: "لحوم", p: { L: 80, M: 60, S: 40 }  ,img:"assets/food/extras/meat.jpg"},
      { n: "حشو أطراف", p: { L: 50, M: 40, S: 30 } ,img:"assets/food/extras/حشو.jpg" },
      { n: "تومية", p: { L: 30, M: 20 }  ,img:"assets/food/extras/somia.jpg"},
      { n: "باكيت بطاطس", p: { L: 30, M: 20 }  ,img:"assets/food/extras/botato.jpg"},
      { n: "مخلل", p: { L: 20, M: 10 }  ,img:"assets/food/extras/مخلل.jpg"},
      { n: "كول سلو", p: { L: 20, M: 10 }  ,img:"assets/food/extras/kolsolo.jpg"},
      { n: "عيش سوري", p: 3 ,img:"assets/food/extras/سوري.jpg" }
    ]
  }
];

/* تسميات المقاسات (تُستخدم في كل صفحات الموقع) */
const SIZE_LABELS = { L: "كبير", M: "وسط", S: "صغير" };

/* أفضلية عرض الأصناف في الصفحة الرئيسية (بطاقات مختارة) */
const FEATURED_IDS = [
  { cat: "mix-boxes", n: "شير بوكس" },
  { cat: "pizza-italiano", n: "إيطاليانو" },
  { cat: "strips-meals", n: "إكسترا استربس" },
  { cat: "feteer-hadeq", n: "مشكل لحوم" },
  { cat: "family-boxes", n: "بارتي بوكس" },
  { cat: "italiano-sandwiches", n: "سوبر كرانشى" }
];
