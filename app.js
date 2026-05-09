/* ============================================================
   สุขภาพคุณแม่ตั้งครรภ์ — app.js
   ============================================================ */

let sugarLog = [];
let currentTrimester = 1;

/* ---- Helpers ---- */
function now() {
  return new Date().toLocaleString('th-TH');
}

function showTab(t) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  const tabEl = document.getElementById('tab-' + t);
  if (tabEl) tabEl.classList.add('active');
  
  const tabIndex = ['sugar', 'bmi', 'food', 'calorie', 'introduce'].indexOf(t);
  if (tabIndex !== -1) {
    document.querySelectorAll('.nav-btn')[tabIndex].classList.add('active');
  }
  
  if (t === 'sugar') renderSugarLog();
  if (t === 'food')  renderFood(currentTrimester);
}

/* ================================================================
   BLOOD SUGAR (เกณฑ์สำหรับหญิงตั้งครรภ์)
   ================================================================ */
const SUGAR_LIMITS = {
  fasting:     { ok: 95,  warn: 105 },
  postmeal1h:  { ok: 140, warn: 160 },
  postmeal2h:  { ok: 120, warn: 140 },
  bedtime:     { ok: 100, warn: 120 },
};

const TIMING_LABEL = {
  fasting:    'ก่อนอาหาร',
  postmeal1h: 'หลังอาหาร 1 ชม.',
  postmeal2h: 'หลังอาหาร 2 ชม.',
  bedtime:    'ก่อนนอน',
};

function saveSugar() {
  const val    = parseFloat(document.getElementById('sugar-val').value);
  const timing = document.getElementById('sugar-time').value;

  if (!val || val < 40 || val > 600) {
    alert('กรุณากรอกค่าน้ำตาลที่ถูกต้อง (40–600 mg/dL)');
    return;
  }

  const lim = SUGAR_LIMITS[timing];
  let level, msg;

  if (val <= lim.ok) {
    level = 'ok';
    msg = `✅ ค่าน้ำตาลอยู่ในเกณฑ์ปกติสำหรับหญิงตั้งครรภ์ (${TIMING_LABEL[timing]} ≤ ${lim.ok} mg/dL) ดูแลต่อเนื่องไว้เลยนะคะ`;
  } else if (val <= lim.warn) {
    level = 'warn';
    msg = `⚠️ ค่าน้ำตาลสูงกว่าเกณฑ์เล็กน้อย ควรลดแป้งและน้ำตาล เพิ่มผัก ออกกำลังกายเบา ๆ หลังอาหาร และแจ้งแพทย์ในนัดถัดไป`;
  } else {
    level = 'danger';
    msg = `🚨 ค่าน้ำตาลสูงมาก (${TIMING_LABEL[timing]} > ${lim.warn} mg/dL) ควรปรึกษาแพทย์โดยเร็ว อาจมีภาวะเบาหวานขณะตั้งครรภ์ (GDM)`;
  }

  const entry = { val, timing: TIMING_LABEL[timing], level, time: now() };
  sugarLog.unshift(entry);

  // Update metrics
  const vals = sugarLog.map(e => e.val);
  const lastEl = document.getElementById('m-last');
  lastEl.textContent = val;
  lastEl.className   = 'metric-val ' + level;
  document.getElementById('m-avg').textContent   = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  document.getElementById('m-count').textContent = vals.length;

  document.getElementById('sugar-result').innerHTML =
    `<div class="result-box ${level}">${msg}</div>`;
  document.getElementById('sugar-val').value = '';
  renderSugarLog();
}

function clearSugar() {
  document.getElementById('sugar-val').value    = '';
  document.getElementById('sugar-time').selectedIndex = 0;
  document.getElementById('sugar-result').innerHTML   = '';
}

function renderSugarLog() {
  const el = document.getElementById('sugar-log-list');
  if (!sugarLog.length) { el.innerHTML = '<p class="empty">ยังไม่มีข้อมูล</p>'; return; }
  const labels = { ok: 'ปกติ', warn: 'เฝ้าระวัง', danger: 'เร่งด่วน' };
  el.innerHTML = sugarLog.slice(0, 20).map(e => `
    <div class="history-item">
      <div style="display:flex;align-items:flex-start;gap:8px;flex:1;min-width:0">
        <i class="ti ti-droplet" style="font-size:17px;color:#f48fb1;margin-top:1px;flex-shrink:0"></i>
        <div>
          <div style="font-size:13px;font-weight:500">${e.val} mg/dL — ${e.timing}</div>
          <div style="font-size:11px;color:#bbb;margin-top:2px">${e.time}</div>
        </div>
      </div>
      <span class="badge ${e.level}">${labels[e.level]}</span>
    </div>`).join('');
}

function clearSugarLog() {
  if (!confirm('ลบประวัติน้ำตาลทั้งหมด?')) return;
  sugarLog = [];
  document.getElementById('m-last').textContent  = '—';
  document.getElementById('m-last').className    = 'metric-val';
  document.getElementById('m-avg').textContent   = '—';
  document.getElementById('m-count').textContent = '0';
  renderSugarLog();
}

function exportSugarCSV() {
  if (!sugarLog.length) { alert('ไม่มีข้อมูลน้ำตาล'); return; }
  const rows = [
    ['วันเวลา', 'ค่าน้ำตาล (mg/dL)', 'ช่วงเวลา', 'สถานะ'],
    ...sugarLog.map(e => [e.time, e.val, e.timing, { ok:'ปกติ', warn:'เฝ้าระวัง', danger:'เร่งด่วน' }[e.level]])
  ];
  downloadCSV(rows, 'ประวัติค่าน้ำตาล.csv');
}

function downloadCSV(rows, filename) {
  const bom = '\uFEFF';
  const csv = bom + rows.map(r =>
    r.map(v => '"' + String(v||'').replace(/"/g,'""') + '"').join(',')
  ).join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' })),
    download: filename
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ================================================================
   BMI (สำหรับหญิงตั้งครรภ์ — ใช้ BMI ก่อนตั้งครรภ์)
   ================================================================ */

// น้ำหนักที่ควรขึ้นทั้งครรภ์ตาม IOM guideline
const WEIGHT_GAIN = {
  underweight: { label: 'ผอม (BMI < 18.5)',    range: '12.5–18 กก.',  lo: 12.5, hi: 18   },
  normal:      { label: 'ปกติ (BMI 18.5–24.9)', range: '11.5–16 กก.', lo: 11.5, hi: 16   },
  overweight:  { label: 'น้ำหนักเกิน (BMI 25–29.9)', range: '7–11.5 กก.', lo: 7,  hi: 11.5 },
  obese:       { label: 'อ้วน (BMI ≥ 30)',       range: '5–9 กก.',     lo: 5,   hi: 9    },
};

function calcBMI() {
  const w    = parseFloat(document.getElementById('weight').value);
  const hcm  = parseFloat(document.getElementById('height').value);
  const wNow = parseFloat(document.getElementById('weight-now').value);
  const week = parseInt(document.getElementById('gestweek').value) || 0;

  if (!w || !hcm || hcm < 50 || hcm > 250) {
    alert('กรุณากรอกน้ำหนักก่อนตั้งครรภ์และส่วนสูงให้ครบถ้วน');
    return;
  }

  const h   = hcm / 100;
  const bmi = +(w / (h * h)).toFixed(1);

  let cat, wgKey, rateLo, rateHi, tri1Lo, tri1Hi;
  // อิงอัตราการเพิ่มของน้ำหนักตาม IOM Guideline 2009 (กก./สัปดาห์ในไตรมาส 2-3)
  if (bmi < 18.5) { 
    cat = 'ผอม (Underweight)';        wgKey = 'underweight'; 
    rateLo = 0.44; rateHi = 0.58; tri1Lo = 1; tri1Hi = 2;
  } else if (bmi < 25) { 
    cat = 'ปกติ (Normal)';             wgKey = 'normal';      
    rateLo = 0.35; rateHi = 0.50; tri1Lo = 1; tri1Hi = 2;
  } else if (bmi < 30) { 
    cat = 'น้ำหนักเกิน (Overweight)';  wgKey = 'overweight'; 
    rateLo = 0.23; rateHi = 0.33; tri1Lo = 1; tri1Hi = 2;
  } else { 
    cat = 'อ้วน (Obese)';              wgKey = 'obese';       
    rateLo = 0.17; rateHi = 0.27; tri1Lo = 0.5; tri1Hi = 2;
  }

  const wg = WEIGHT_GAIN[wgKey];

  let expectedNow = '';
  let statusHtml = '';

  if (week > 0) {
    let expectedLo = 0;
    let expectedHi = 0;

    // คำนวณน้ำหนักที่ควรขึ้นตามอายุครรภ์ (IOM Guidelines)
    if (week <= 13) {
      expectedLo = (tri1Lo / 13) * week;
      expectedHi = (tri1Hi / 13) * week;
    } else {
      const extraWeeks = week - 13;
      expectedLo = tri1Lo + (extraWeeks * rateLo);
      expectedHi = tri1Hi + (extraWeeks * rateHi);
    }
    
    expectedLo = Math.min(expectedLo, wg.lo);
    expectedHi = Math.min(expectedHi, wg.hi);

    expectedNow = `<div style="margin-top:8px;padding:8px;background:rgba(255,255,255,.5);border-radius:6px;font-size:13px">
      📅 สัปดาห์ที่ ${week}: น้ำหนักควรขึ้นประมาณ <strong>${expectedLo.toFixed(1)}–${expectedHi.toFixed(1)} กก.</strong>
    </div>`;

    if (wNow) {
      const weightGained = wNow - w;
      let gainStatus = '';
      let gainColor = '';
      
      if (weightGained < expectedLo) {
        gainStatus = 'ขึ้นน้อยกว่าเกณฑ์';
        gainColor = '#d97706'; // ส้ม
      } else if (weightGained > expectedHi) {
        gainStatus = 'ขึ้นมากกว่าเกณฑ์';
        gainColor = '#dc2626'; // แดง
      } else {
        gainStatus = 'อยู่ในเกณฑ์ปกติ';
        gainColor = '#16a34a'; // เขียว
      }

      statusHtml = `<div style="margin-top:8px;padding:8px;border:1px solid ${gainColor};border-radius:6px;font-size:13px;color:${gainColor};background:#fff">
        ⚖️ น้ำหนักขึ้นมาแล้ว: <strong>${weightGained.toFixed(1)} กก.</strong> (${gainStatus})
      </div>`;
    }
  }

  const level = bmi < 18.5 ? 'warn' : bmi < 25 ? 'ok' : bmi < 30 ? 'warn' : 'danger';

  document.getElementById('bmi-result').innerHTML = `
    <div class="result-box ${level}" style="margin-top:.75rem">
      <div style="font-size:26px;font-weight:600;margin-bottom:6px">BMI: ${bmi}</div>
      <div style="font-weight:500;margin-bottom:8px">${cat}</div>
      <div style="font-size:13px;margin-bottom:4px">
        🏋️ น้ำหนักตลอดการตั้งครรภ์ควรขึ้น: <strong>${wg.range}</strong>
      </div>
      ${expectedNow}
      ${statusHtml}
      <div style="margin-top:10px;font-size:12px;opacity:.8">
        * อิงตาม IOM (Institute of Medicine) Guideline 2009
      </div>
    </div>`;
}

function clearBMI() {
  ['weight', 'height', 'weight-now', 'gestweek'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('bmi-result').innerHTML = '';
}

/* ================================================================
   FOOD MENU BY TRIMESTER
   ================================================================ */
const FOOD_DATA = {
  1: {
    title: 'ไตรมาส 1 (สัปดาห์ 1–12)',
    subtitle: 'ช่วงสร้างอวัยวะสำคัญ — เน้นโฟเลต เหล็ก และโปรตีน',
    nutrients: [
      { name: 'โฟเลต (Folate)', amount: '600 mcg/วัน', pct: 90 },
      { name: 'เหล็ก (Iron)',   amount: '27 mg/วัน',   pct: 70 },
      { name: 'โปรตีน',         amount: '+10 g/วัน',   pct: 60 },
      { name: 'แคลเซียม',       amount: '1,000 mg/วัน', pct: 55 },
      { name: 'พลังงานเพิ่ม',   amount: '+0 kcal',     pct: 10 },
    ],
    meals: [
      {
        icon: '🌅', label: 'อาหารเช้า',
        img: 'tri1_breakfast.png',
        items: ['ข้าวกล้อง 1 ทัพพี', 'ไข่ตุ๋นทรงเครื่อง (ใส่หมูสับ แครอท)', 'นมอุ่น 1 แก้ว'],
        nut: { kcal: 350, carb: 45, pro: 20, fat: 10 }
      },
      {
        icon: '☀️', label: 'อาหารกลางวัน',
        img: 'tri1_lunch.png',
        items: ['ข้าวกล้อง 1.5 ทัพพี', 'ไก่ผัดขิง (ลดแพ้ท้อง)', 'ต้มเลือดหมูใส่ใบตำลึง'],
        nut: { kcal: 480, carb: 55, pro: 35, fat: 12 }
      },
      {
        icon: '🌙', label: 'อาหารเย็น',
        img: 'tri1_dinner.png',
        items: ['ข้าวกล้อง 1 ทัพพี', 'แกงเลียงกุ้งสด', 'ผลไม้สด 2-3 ชิ้น'],
        nut: { kcal: 320, carb: 40, pro: 22, fat: 5 }
      },
      {
        icon: '🍎', label: 'ของว่าง',
        img: null,
        items: ['ฝรั่ง 1 ผล', 'อัลมอนด์ 1 หยิบมือ'],
        nut: { kcal: 180, carb: 20, pro: 8, fat: 8 }
      }
    ],
    avoid: [
      'ปลาดิบ / ซูชิ / แอลกอฮอล์ทุกชนิด',
      'เนื้อสัตว์ดิบหรือสุกไม่ทั่วถึง (แฮม ไส้กรอกดิบ)',
      'นมดิบ / ชีสที่ไม่ผ่านพาสเจอร์ไรซ์',
      'คาเฟอีนเกิน 200 mg/วัน (กาแฟ ≈ 1 แก้ว/วัน)',
      'อาหารทะเลที่มีปรอทสูง (ปลาฉลาม ปลาอินทรี)',
    ],
    tip: '💊 รับประทานวิตามิน Folic Acid (400–800 mcg/วัน) ก่อนและระหว่างไตรมาสแรก เพื่อป้องกันความพิการของท่อประสาท หากมีอาการแพ้ท้องรุนแรง แบ่งอาหารเป็นมื้อเล็ก ๆ 5–6 มื้อ/วัน',
  },

  2: {
    title: 'ไตรมาส 2 (สัปดาห์ 13–26)',
    subtitle: 'ช่วงเติบโตเร็ว — เน้นแคลเซียม โปรตีน และ DHA',
    nutrients: [
      { name: 'แคลเซียม',      amount: '1,000 mg/วัน', pct: 80 },
      { name: 'โปรตีน',        amount: '+25 g/วัน',   pct: 75 },
      { name: 'DHA / โอเมก้า-3', amount: '200 mg/วัน', pct: 65 },
      { name: 'เหล็ก (Iron)',   amount: '27 mg/วัน',  pct: 70 },
      { name: 'พลังงานเพิ่ม',  amount: '+340 kcal',   pct: 45 },
    ],
    meals: [
      {
        icon: '🌅', label: 'อาหารเช้า',
        img: 'breakfast.png',
        items: ['ข้าวต้มปลาทูสด', 'น้ำเต้าหู้หวานน้อย 1 แก้ว'],
        nut: { kcal: 360, carb: 45, pro: 22, fat: 10 }
      },
      {
        icon: '☀️', label: 'อาหารกลางวัน',
        img: 'lunch.png',
        items: ['ข้าวกล้อง 1.5 ทัพพี', 'ผัดบล็อกโคลี่กุ้งสด', 'ต้มจืดเต้าหู้ไข่'],
        nut: { kcal: 450, carb: 50, pro: 30, fat: 12 }
      },
      {
        icon: '🌙', label: 'อาหารเย็น',
        img: 'dinner.png',
        items: ['ข้าวกล้อง 1.5 ทัพพี', 'ปลากะพงนึ่งซีอิ๊ว', 'ผักนึ่งรวม'],
        nut: { kcal: 400, carb: 45, pro: 35, fat: 8 }
      },
      {
        icon: '🍎', label: 'ของว่าง',
        img: null,
        items: ['ฟักทองนึ่ง 3-4 ชิ้น', 'นมจืด 1 แก้ว'],
        nut: { kcal: 200, carb: 25, pro: 10, fat: 5 }
      }
    ],
    avoid: [
      'น้ำตาลและของหวานมากเกินไป — เสี่ยงเบาหวานขณะตั้งครรภ์',
      'อาหารเค็มจัด — บวมน้ำ ความดันสูง',
      'แอลกอฮอล์และคาเฟอีนเกินขนาด',
      'อาหารแปรรูปสูง (ไส้กรอก แฮม มาม่า) — โซเดียมสูง',
      'ผักและผลไม้ที่ไม่ล้างสะอาด — เสี่ยงเชื้อลิสทีเรีย',
    ],
    tip: '🦷 ไตรมาสนี้ลูกเริ่มสร้างกระดูกและฟัน แคลเซียมจากนม โยเกิร์ต เต้าหู้ และผักใบเขียวสำคัญมาก ควรออกกำลังกายเบา ๆ เช่น เดิน ว่ายน้ำ หรือโยคะคนท้อง 30 นาที/วัน',
  },

  3: {
    title: 'ไตรมาส 3 (สัปดาห์ 27–40)',
    subtitle: 'ช่วงสุดท้ายก่อนคลอด — เน้นเหล็ก DHA และพลังงาน',
    nutrients: [
      { name: 'เหล็ก (Iron)',    amount: '27 mg/วัน',   pct: 85 },
      { name: 'DHA / โอเมก้า-3', amount: '200 mg/วัน', pct: 75 },
      { name: 'แคลเซียม',        amount: '1,000 mg/วัน', pct: 80 },
      { name: 'โปรตีน',          amount: '+25 g/วัน',   pct: 80 },
      { name: 'พลังงานเพิ่ม',    amount: '+450 kcal',   pct: 60 },
    ],
    meals: [
      {
        icon: '🌅', label: 'อาหารเช้า',
        img: 'breakfast.png',
        items: ['ข้าวต้มตับหมูและหมูสับ', 'ไข่ลวก 1 ฟอง', 'นมสด 1 แก้ว'],
        nut: { kcal: 420, carb: 45, pro: 28, fat: 12 }
      },
      {
        icon: '☀️', label: 'อาหารกลางวัน',
        img: 'lunch.png',
        items: ['ข้าวกล้อง 1.5 ทัพพี', 'ผัดผักบุ้งไฟแดงหมูชิ้น', 'ต้มยำปลาทู (น้ำใส)'],
        nut: { kcal: 480, carb: 55, pro: 35, fat: 14 }
      },
      {
        icon: '🌙', label: 'อาหารเย็น',
        img: 'dinner.png',
        items: ['ข้าวกล้อง 1 ทัพพี', 'ปลากะพงนึ่งมะนาว', 'ยำวุ้นเส้นหมูสับ (ไม่เผ็ด)'],
        nut: { kcal: 450, carb: 50, pro: 30, fat: 10 }
      },
      {
        icon: '🍎', label: 'ของว่าง',
        img: null,
        items: ['กล้วยน้ำว้าปิ้ง 2 ใบ', 'อินทผลัม 3 ผล'],
        nut: { kcal: 250, carb: 58, pro: 2, fat: 1 }
      }
    ],
    avoid: [
      'อาหารรสจัด เผ็ดจัด — ทำให้แสบร้อนกลางอก (Heartburn)',
      'อาหารที่ทำให้ท้องอืด (กะหล่ำ ถั่วเหลืองดิบ) — เพราะมดลูกกดกระเพาะ',
      'น้ำมากเกินไปก่อนนอน — ปัสสาวะบ่อยกลางคืน',
      'แอลกอฮอล์ / คาเฟอีน / บุหรี่ — ห้ามเด็ดขาด',
      'อาหารสุกไม่ทั่วถึง — เสี่ยงติดเชื้ออันตรายต่อทารก',
    ],
    tip: '🍽️ ช่วงนี้กระเพาะถูกกด ควรแบ่งอาหารเป็น 5–6 มื้อเล็ก ๆ ทานอินทผลัม 2–3 ผล/วันตั้งแต่สัปดาห์ที่ 36 อาจช่วยให้ปากมดลูกสุกและลดระยะเวลาคลอดได้ตามงานวิจัย',
  },
};

function selectTrimester(n, btn) {
  currentTrimester = n;
  document.querySelectorAll('.trim-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderFood(n);
}

function renderFood(n) {
  const d   = FOOD_DATA[n];
  const el  = document.getElementById('food-content');

  // Nutrient bars
  const nutrientHTML = d.nutrients.map(nu => `
    <div class="nutrient-bar">
      <div class="nutrient-label">${nu.name}</div>
      <div class="nutrient-track">
        <div class="nutrient-fill" style="width:${nu.pct}%"></div>
      </div>
      <div class="nutrient-val">${nu.amount}</div>
    </div>`).join('');

  // Meal sections with new RC Card UI
  const mealsHTML = d.meals.map(m => `
    <div class="rc-card">
      <div class="rc-header">
        <span class="rc-icon">${m.icon}</span>
        <span class="rc-title">${m.label}</span>
      </div>
      <div class="rc-body">
        ${m.img !== null ? `
        <div style="width:90px;height:90px;border-radius:50%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.1);border:3px solid #fff;overflow:hidden;">
          ${m.img ? `<img src="${m.img}" style="width:100%;height:100%;object-fit:cover;">` : `<i class="ti ti-photo" style="font-size:24px;color:#ccc"></i>`}
        </div>` : ''}
        <div class="rc-details">
          ${m.items.map(item => `<div class="rc-item">${item}</div>`).join('')}
        </div>
      </div>
      <div class="rc-footer">
        <div class="rc-nut">
          <div class="rc-nut-label">พลังงาน</div>
          <div class="rc-nut-val"><strong>${m.nut.kcal}</strong> kcal</div>
        </div>
        <div class="rc-nut">
          <div class="rc-nut-label">คาร์บ</div>
          <div class="rc-nut-val"><strong>${m.nut.carb}</strong> g</div>
        </div>
        <div class="rc-nut">
          <div class="rc-nut-label">โปรตีน</div>
          <div class="rc-nut-val"><strong>${m.nut.pro}</strong> g</div>
        </div>
        <div class="rc-nut">
          <div class="rc-nut-label">ไขมัน</div>
          <div class="rc-nut-val"><strong>${m.nut.fat}</strong> g</div>
        </div>
      </div>
    </div>
  `).join('');

  // Avoid list
  const avoidHTML = d.avoid.map(a => `<div class="avoid-item">${a}</div>`).join('');

  el.innerHTML = `
    <!-- Header -->
    <div class="card" style="background:linear-gradient(135deg,#fce4ec,#f3e5f5);border-color:#f48fb1">
      <div style="font-weight:600;color:#880E4F;margin-bottom:2px">${d.title}</div>
      <div style="font-size:13px;color:#ad1457">${d.subtitle}</div>
    </div>

    <!-- Nutrients -->
    <div class="card">
      <div style="font-size:14px;font-weight:500;margin-bottom:10px;color:#C2185B">
        <i class="ti ti-chart-bar"></i> สารอาหารที่ต้องการ
      </div>
      ${nutrientHTML}
    </div>

    <!-- Menus -->
    <div class="card">
      <div style="font-size:14px;font-weight:500;margin-bottom:12px;color:#C2185B">
        <i class="ti ti-bowl-spoon"></i> ตัวอย่างเมนูแนะนำ
      </div>
      ${mealsHTML}
    </div>

    <!-- Avoid -->
    <div class="card">
      <div style="font-size:14px;font-weight:500;margin-bottom:10px;color:#880E4F">
        <i class="ti ti-ban"></i> อาหารที่ควรหลีกเลี่ยง
      </div>
      ${avoidHTML}
    </div>

    <!-- Tip -->
    <div class="card" style="padding-bottom:1rem">
      <div style="font-size:14px;font-weight:500;margin-bottom:8px;color:#4a148c">
        <i class="ti ti-bulb"></i> เคล็ดลับสุขภาพ
      </div>
      <div class="tip-box">${d.tip}</div>
    </div>`;
}

/* ---- Init ---- */
renderFood(1);

/* ================================================================
   CALORIE CALCULATOR LOGIC
   ================================================================ */
const FOOD_DB = [
  { name: 'ข้าวไข่เจียวหมูสับ', kcal: 450, carb: 45, pro: 15, fat: 25 },
  { name: 'ข้าวกะเพราหมูสับ', kcal: 580, carb: 50, pro: 20, fat: 30 },
  { name: 'ก๋วยเตี๋ยวหมูน้ำใส', kcal: 300, carb: 40, pro: 15, fat: 8 },
  { name: 'ผัดไทยกุ้งสด', kcal: 550, carb: 65, pro: 18, fat: 22 },
  { name: 'ข้าวผัดหมู', kcal: 550, carb: 60, pro: 15, fat: 25 },
  { name: 'ข้าวมันไก่', kcal: 600, carb: 65, pro: 20, fat: 25 },
  { name: 'ต้มเลือดหมู (ไม่ใส่เครื่องใน)', kcal: 150, carb: 5, pro: 15, fat: 8 },
  { name: 'ส้มตำไทย', kcal: 120, carb: 20, pro: 4, fat: 2 },
  { name: 'ไก่ย่าง (1 ไม้)', kcal: 150, carb: 2, pro: 15, fat: 8 },
  { name: 'ข้าวสวย (1 ทัพพี)', kcal: 80, carb: 18, pro: 2, fat: 0 },
  { name: 'ข้าวเหนียว (1 ปั้น)', kcal: 160, carb: 35, pro: 3, fat: 0 },
  { name: 'แซนวิชทูน่า', kcal: 250, carb: 30, pro: 15, fat: 8 },
  { name: 'ไข่ต้ม (1 ฟอง)', kcal: 75, carb: 1, pro: 7, fat: 5 },
  { name: 'ไข่ดาว (1 ฟอง)', kcal: 120, carb: 1, pro: 7, fat: 10 },
  { name: 'นมสดจืด (1 แก้ว)', kcal: 150, carb: 12, pro: 8, fat: 8 },
  { name: 'น้ำเต้าหู้ (ไม่ใส่น้ำตาล)', kcal: 80, carb: 5, pro: 7, fat: 4 },
  { name: 'แกงจืดเต้าหู้หมูสับ', kcal: 180, carb: 5, pro: 15, fat: 10 },
  { name: 'แกงเขียวหวานไก่', kcal: 350, carb: 15, pro: 15, fat: 25 },
  { name: 'กล้วยน้ำว้า (1 ผล)', kcal: 60, carb: 15, pro: 1, fat: 0 },
  { name: 'ฝรั่ง (1 ผล)', kcal: 100, carb: 20, pro: 2, fat: 1 },
  { name: 'แอปเปิ้ล (1 ผล)', kcal: 52, carb: 14, pro: 0, fat: 0 },
  { name: 'มะละกอสุก (6-8 ชิ้นคำ)', kcal: 60, carb: 15, pro: 1, fat: 0 },
  { name: 'แตงโม (6-8 ชิ้นคำ)', kcal: 40, carb: 10, pro: 1, fat: 0 },
  { name: 'ส้มเขียวหวาน (1 ผล)', kcal: 45, carb: 11, pro: 1, fat: 0 },
  { name: 'มะม่วงสุก (ครึ่งผล)', kcal: 90, carb: 20, pro: 1, fat: 0 },
  { name: 'กล้วยหอม (1 ผล)', kcal: 120, carb: 27, pro: 1, fat: 0 },
  { name: 'แก้วมังกร (ครึ่งผล)', kcal: 60, carb: 15, pro: 1, fat: 0 },
  { name: 'องุ่น (10-12 ผล)', kcal: 60, carb: 15, pro: 0, fat: 0 },
  { name: 'ทุเรียน (1 พูเล็ก)', kcal: 150, carb: 27, pro: 2, fat: 5 },
];

let dailyFoodLog = JSON.parse(localStorage.getItem('calorieLog')) || [];

function handleFoodSearch() {
  const input = document.getElementById('food-search').value.trim().toLowerCase();
  const resBox = document.getElementById('food-search-results');
  
  if (!input) {
    resBox.style.display = 'none';
    return;
  }
  
  const matches = FOOD_DB.filter(f => f.name.toLowerCase().includes(input));
  
  if (matches.length === 0) {
    resBox.innerHTML = '<div class="search-item" style="color:#999;justify-content:center">ไม่พบเมนูอาหาร</div>';
  } else {
    resBox.innerHTML = matches.map(m => `
      <div class="search-item" onclick="addFoodToLog('${m.name}')">
        <span class="search-item-name">${m.name}</span>
        <span class="search-item-kcal">${m.kcal} kcal</span>
      </div>
    `).join('');
  }
  resBox.style.display = 'block';
}

// Hide search results when clicking outside
document.addEventListener('click', function(e) {
  const searchInput = document.getElementById('food-search');
  const resBox = document.getElementById('food-search-results');
  if (searchInput && !searchInput.contains(e.target) && resBox && !resBox.contains(e.target)) {
    resBox.style.display = 'none';
  }
});

function addFoodToLog(foodName) {
  const food = FOOD_DB.find(f => f.name === foodName);
  if (food) {
    dailyFoodLog.push({ ...food, id: Date.now() });
    saveAndRenderFoodLog();
    document.getElementById('food-search').value = '';
    document.getElementById('food-search-results').style.display = 'none';
  }
}

function removeFoodFromLog(id) {
  dailyFoodLog = dailyFoodLog.filter(f => f.id !== id);
  saveAndRenderFoodLog();
}

function clearFoodLog() {
  if (confirm('ต้องการล้างรายการอาหารทั้งหมดของวันนี้หรือไม่?')) {
    dailyFoodLog = [];
    saveAndRenderFoodLog();
  }
}

function saveAndRenderFoodLog() {
  localStorage.setItem('calorieLog', JSON.stringify(dailyFoodLog));
  
  const container = document.getElementById('daily-food-log');
  if (!container) return; // Not on the page yet
  
  if (dailyFoodLog.length === 0) {
    container.innerHTML = '<div class="empty">ยังไม่มีรายการอาหาร</div>';
    updateDailyNutrients();
    return;
  }
  
  container.innerHTML = dailyFoodLog.map(f => `
    <div class="log-item">
      <div class="log-item-info">
        <div class="log-item-name">${f.name} <span style="font-weight:normal;color:#ad1457;font-size:13px">(${f.kcal} kcal)</span></div>
        <div class="log-item-macros">
          <span>คาร์บ ${f.carb}g</span>
          <span>โปรตีน ${f.pro}g</span>
          <span>ไขมัน ${f.fat}g</span>
        </div>
      </div>
      <div class="log-item-del" onclick="removeFoodFromLog(${f.id})">
        <i class="ti ti-x"></i>
      </div>
    </div>
  `).join('');
  
  updateDailyNutrients();
}

function updateDailyNutrients() {
  const totals = dailyFoodLog.reduce((acc, curr) => {
    acc.kcal += curr.kcal;
    acc.carb += curr.carb;
    acc.pro += curr.pro;
    acc.fat += curr.fat;
    return acc;
  }, { kcal: 0, carb: 0, pro: 0, fat: 0 });
  
  const tk = document.getElementById('total-kcal');
  const tc = document.getElementById('total-carb');
  const tp = document.getElementById('total-pro');
  const tf = document.getElementById('total-fat');
  
  if (tk) tk.textContent = totals.kcal;
  if (tc) tc.textContent = totals.carb;
  if (tp) tp.textContent = totals.pro;
  if (tf) tf.textContent = totals.fat;
}

// Call on load
saveAndRenderFoodLog();

// Article List Toggle Logic
function toggleArticle(element) {
  // close all other expanded articles (accordion behavior)
  const allArticles = document.querySelectorAll('.article-item');
  allArticles.forEach(item => {
    if (item !== element) {
      item.classList.remove('expanded');
    }
  });
  
  // toggle the clicked one
  element.classList.toggle('expanded');
}