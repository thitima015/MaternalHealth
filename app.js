/* ===== GDM Carb Care — App Logic ===== */

// ── DATA ──────────────────────────────────────────────────────────────────
const FOODS = {
  carb: [
    { id: 'rice', name: 'ข้าวสวย', portion: '1 ทัพพี', carb: 1, grams: 15, cal: 70, emoji: '🍚' },
    { id: 'brown_rice', name: 'ข้าวกล้อง', portion: '1 ทัพพี', carb: 1, grams: 15, cal: 65, emoji: '🍚' },
    { id: 'sticky_rice', name: 'ข้าวเหนียว', portion: '½ ทัพพี', carb: 1, grams: 15, cal: 70, emoji: '🍚' },
    { id: 'bread', name: 'ขนมปังแผ่น', portion: '1 แผ่น', carb: 1, grams: 15, cal: 65, emoji: '🍞' },
    { id: 'vermicelli', name: 'เส้นหมี่สุก', portion: '1 ทัพพี', carb: 1, grams: 15, cal: 50, emoji: '🍜' },
    { id: 'jelly', name: 'วุ้นเส้นสุก', portion: '1 ทัพพี', carb: 1, grams: 15, cal: 45, emoji: '🫙' },
    { id: 'noodle_big', name: 'เส้นใหญ่สุก', portion: '1 ทัพพี', carb: 1, grams: 15, cal: 52, emoji: '🍝' },
    { id: 'corn_cob', name: 'มักกะโรนีสุก', portion: '1 ทัพพี', carb: 1, grams: 15, cal: 55, emoji: '🌽' },
  ],
  veg: [
    { id: 'broccoli', name: 'บรอกโคลี', portion: '1 ถ้วย', carb: 0, grams: 0, cal: 30, emoji: '🥦' },
    { id: 'carrot', name: 'แครอท', portion: '½ ถ้วย', carb: 1, grams: 15, cal: 35, emoji: '🥕' },
    { id: 'spinach', name: 'ผักโขม', portion: '1 ถ้วย', carb: 0, grams: 0, cal: 20, emoji: '🌿' },
    { id: 'cucumber', name: 'แตงกวา', portion: '½ ถ้วย', carb: 0, grams: 0, cal: 10, emoji: '🥒' },
  ],
  fruit: [
    { id: 'guava', name: 'ฝรั่ง', portion: '½ ผล', carb: 1, grams: 15, cal: 55, emoji: '🍈' },
    { id: 'apple', name: 'แอปเปิ้ล', portion: '½ ผล', carb: 1, grams: 15, cal: 60, emoji: '🍎' },
    { id: 'banana', name: 'กล้วย', portion: '1 ผล', carb: 2, grams: 30, cal: 90, emoji: '🍌' },
    { id: 'watermelon', name: 'แตงโม', portion: '1 ชิ้น', carb: 1, grams: 15, cal: 50, emoji: '🍉' },
  ],
  milk: [
    { id: 'milk_box', name: 'นมจืด 1 กล่อง', portion: '1 กล่อง', carb: 1, grams: 12, cal: 80, emoji: '🥛' },
    { id: 'soy_milk', name: 'นมถั่วเหลือง', portion: '1 แก้ว', carb: 1, grams: 12, cal: 90, emoji: '🥛' },
  ]
};

const MEALS = {
  carb: [
    {
      id: 'basil_chicken', name: 'ข้าวกะเพราไก่ 1 จาน', carb: 3, grams: 45, cal: 450, emoji: '🍛',
      ingredients: ['ข้าวสวย', 'ไก่', 'ผัก', 'น้ำมัน'],
      ingredEmoji: ['🍚', '🍗', '🥦', '🫙'],
      tip: 'ควรเลือกน้ำมันที่ไม่มีน้ำมันมาก และเพิ่มผักเพื่อช่วยควบคุมน้ำตาลในเลือด'
    },
    { id: 'chicken_rice', name: 'ข้าวมันไก่', carb: 3, grams: 45, cal: 420, emoji: '🍗', ingredients: ['ข้าวมัน', 'ไก่ต้ม', 'น้ำซุป', 'ซอส'], ingredEmoji: ['🍚', '🍗', '🍲', '🧂'], tip: 'ควรตักน้ำมันแยก' },
    { id: 'fried_rice', name: 'ข้าวผัด', carb: 3, grams: 45, cal: 480, emoji: '🍳', ingredients: ['ข้าว', 'ไข่', 'ผัก', 'น้ำมัน'], ingredEmoji: ['🍚', '🥚', '🥦', '🫙'], tip: 'ลดน้ำมันและเพิ่มผัก' },
    { id: 'noodle_soup', name: 'ก๋วยเตี๋ยว', carb: 2, grams: 30, cal: 280, emoji: '🍜', ingredients: ['เส้น', 'หมู', 'ผัก', 'น้ำซุป'], ingredEmoji: ['🍜', '🐷', '🥬', '🍲'], tip: 'เลือกน้ำใสแทนน้ำมัน' },
    { id: 'pad_thai', name: 'ผัดไทย', carb: 3, grams: 45, cal: 400, emoji: '🍝', ingredients: ['เส้น', 'กุ้ง', 'ไข่', 'ถั่วงอก'], ingredEmoji: ['🍜', '🦐', '🥚', '🌱'], tip: 'ขอน้ำมันน้อย' },
    { id: 'rad_na', name: 'ราดหน้า', carb: 3, grams: 45, cal: 380, emoji: '🍛', ingredients: ['เส้น', 'หมู', 'ผัก', 'ซอส'], ingredEmoji: ['🍜', '🐷', '🥦', '🧂'], tip: 'เพิ่มผักมาก' },
    { id: 'stir_veg', name: 'ผัดซีอิ๊ว', carb: 2, grams: 30, cal: 350, emoji: '🥗', ingredients: ['เส้น', 'ไก่', 'ผัก', 'ซอส'], ingredEmoji: ['🍜', '🍗', '🥦', '🧂'], tip: 'ควบคุมปริมาณซอส' },
    { id: 'red_pork_rice', name: 'ข้าวหมูแดง', carb: 3, grams: 45, cal: 430, emoji: '🍖', ingredients: ['ข้าว', 'หมูแดง', 'ผัก', 'น้ำราด'], ingredEmoji: ['🍚', '🐷', '🥦', '🧂'], tip: 'ลดน้ำราด' },
  ]
};

// ── STATE ─────────────────────────────────────────────────────────────────
const state = {
  currentScreen: 'home',
  prevScreen: 'home',
  activeMealType: 'breakfast',  // breakfast | lunch | dinner | snack
  activeCategory: 'carb',       // carb | veg | fruit | milk
  calcItems: { rice: 0, bread: 0, vermicelli: 0, jelly: 0, brown_rice: 0 },
  selectedMeal: null,
  logDate: new Date(),
  logEntries: {
    breakfast: [
      { name: 'ข้าวสวย', amount: '2 ทัพพี', carb: 2 },
      { name: 'ต้มข่าไก่', amount: '1 ถ้วย', carb: 0 },
      { name: 'ฝรั่ง', amount: '½ ผล', carb: 1 },
      { name: 'นมจืด', amount: '1 กล่อง', carb: 1 },
    ],
    lunch: [{ name: 'ข้าวกะเพราไก่', amount: '1 จาน', carb: 3 }, { name: 'น้ำเปล่า', amount: '1 แก้ว', carb: 0 }],
    dinner: [{ name: 'ข้าวสวย', amount: '1 ทัพพี', carb: 1 }, { name: 'ต้มยำกุ้ง', amount: '1 ถ้วย', carb: 0 }, { name: 'ผัดผัก', amount: '½ ถ้วย', carb: 0 }],
    snack: [{ name: 'แอปเปิ้ล', amount: '½ ผล', carb: 1 }],
  }
};

// ── HELPERS ────────────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }
function showToast(msg) {
  const t = document.querySelector('.toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
function navigate(screenId, back = false) {
  const prev = document.querySelector('.screen.active');
  if (prev) prev.classList.remove('active');
  const next = document.getElementById(`screen-${screenId}`);
  if (next) next.classList.add('active');
  state.prevScreen = state.currentScreen;
  state.currentScreen = screenId;
  // highlight nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.screen === screenId);
  });
  if (screenId === 'log') renderLogScreen();
  if (screenId === 'summary') renderSummary();
}
function goBack() { navigate(state.prevScreen); }

// ── CALC SCREEN ─────────────────────────────────────────────────────────────
const CALC_FOODS = [
  { id: 'rice', name: 'ข้าวสวย', portion: '1 ทัพพี', emoji: '🍚' },
  { id: 'bread', name: 'ขนมปังแผ่น', portion: '1 แผ่น', emoji: '🍞' },
  { id: 'vermicelli', name: 'เส้นหมี่สุก', portion: '1 ทัพพี', emoji: '🍜' },
  { id: 'jelly', name: 'วุ้นเส้นสุก', portion: '1 ทัพพี', emoji: '🫙' },
  { id: 'brown_rice', name: 'ข้าวกล้อง', portion: '1 ทัพพี', emoji: '🍚' },
];

function renderCalcScreen() {
  const list = $('calc-food-list');
  list.innerHTML = CALC_FOODS.map(f => `
    <div class="food-row">
      <div class="food-info">
        <span class="food-name">${f.emoji} ${f.name}</span>
        <span class="food-carb-label">1 คาร์บ = ${f.portion}</span>
      </div>
      <div class="food-right">
        <span class="carb-badge">1 คาร์บ</span>
        <div class="counter">
          <button onclick="changeCount('${f.id}',-1)">−</button>
          <span class="count" id="cnt-${f.id}">${state.calcItems[f.id] || 0}</span>
          <button onclick="changeCount('${f.id}',1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
  updateCalcTotal();
}

function changeCount(id, delta) {
  state.calcItems[id] = Math.max(0, (state.calcItems[id] || 0) + delta);
  const el = $(`cnt-${id}`);
  if (el) el.textContent = state.calcItems[id];
  updateCalcTotal();
}

function updateCalcTotal() {
  const total = Object.values(state.calcItems).reduce((a, b) => a + b, 0);
  const grams = total * 15;
  const el = $('calc-total');
  if (el) el.innerHTML = `
    <span class="label">คาร์บรวม</span>
    <div>
      <span class="value">${total}</span>
      <span class="unit"> คาร์บ</span>
    </div>
    <span class="gram">${grams} กรัมคาร์โบไฮเดรต</span>
  `;
}

function saveCalcEntry() {
  const total = Object.values(state.calcItems).reduce((a, b) => a + b, 0);
  if (total === 0) { showToast('กรุณาเลือกอาหารอย่างน้อย 1 รายการ'); return; }
  const meal = state.activeMealType;
  CALC_FOODS.forEach(f => {
    const cnt = state.calcItems[f.id] || 0;
    if (cnt > 0) {
      state.logEntries[meal].push({ name: f.name, amount: `${cnt} ${f.portion.split(' ').pop()}`, carb: cnt });
    }
  });
  Object.keys(state.calcItems).forEach(k => state.calcItems[k] = 0);
  renderCalcScreen();
  showToast('✅ บันทึกการอาหารเรียบร้อย');
  setTimeout(() => navigate('log'), 700);
}

// ── CUSTOM FOOD SCREEN ──────────────────────────────────────────────────────
function saveCustomFood() {
  const name = $('custom-name').value.trim();
  const amount = $('custom-amount').value.trim() || '1 ส่วน';
  const carbStr = $('custom-carb').value;
  const carb = parseFloat(carbStr);

  if (!name) {
    showToast('กรุณากรอกชื่ออาหาร');
    return;
  }
  if (isNaN(carb) || carb < 0) {
    showToast('กรุณากรอกคาร์บให้ถูกต้อง');
    return;
  }

  state.logEntries[state.activeMealType].push({ name, amount, carb });
  
  // Clear form
  $('custom-name').value = '';
  $('custom-amount').value = '1 ส่วน';
  $('custom-carb').value = '';
  
  showToast('✅ บันทึกรายการอาหารเรียบร้อย');
  setTimeout(() => navigate('log'), 700);
}

// ── LIBRARY SCREEN ──────────────────────────────────────────────────────────
function renderLibrary() {
  const cat = state.activeCategory;
  const foods = FOODS[cat] || [];
  const grid = $('lib-grid');
  grid.innerHTML = foods.map(f => `
    <div class="food-card ${state.selectedMeal?.id === f.id ? 'selected' : ''}"
         onclick="selectLibFood('${f.id}','${cat}')">
      <div class="food-thumb">${f.emoji}</div>
      <div class="food-card-body">
        <div class="food-card-name">${f.name}</div>
        <div class="food-card-sub">${f.portion} = 1 คาร์บ (${f.grams} ก.)</div>
      </div>
    </div>
  `).join('');

  // detail panel
  const detail = $('lib-detail');
  if (state.selectedLibFood) {
    const f = state.selectedLibFood;
    detail.style.display = 'block';
    detail.innerHTML = `
      <div class="food-card-detail">
        <h4>${f.emoji} ${f.name}</h4>
        <p style="font-size:12px;color:var(--text-sub);margin-top:4px">${f.portion}</p>
        <div class="detail-stats">
          <span class="stat-pill">🌾 ${f.carb} คาร์บ</span>
          <span class="stat-pill">⚖️ ${f.grams} ก.</span>
          <span class="stat-pill">🔥 ${f.cal} kcal</span>
        </div>
        <button class="btn-primary" style="margin-top:10px;font-size:13px;padding:8px 16px"
          onclick="addLibFoodToLog()">+ เพิ่มในบันทึก</button>
      </div>`;
  } else { detail.style.display = 'none'; }
}

function selectLibFood(id, cat) {
  const food = FOODS[cat].find(f => f.id === id);
  state.selectedLibFood = food;
  renderLibrary();
}

function addLibFoodToLog() {
  if (!state.selectedLibFood) return;
  const f = state.selectedLibFood;
  state.logEntries[state.activeMealType].push({ name: f.name, amount: f.portion, carb: f.carb });
  showToast(`✅ เพิ่ม ${f.name} ในบันทึกแล้ว`);
  state.selectedLibFood = null;
  renderLibrary();
}

function setLibCat(cat) {
  state.activeCategory = cat;
  state.selectedLibFood = null;
  document.querySelectorAll('.cat-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === cat);
  });
  renderLibrary();
}

// ── MEALS (single dish) SCREEN ──────────────────────────────────────────────
function renderMealsScreen() {
  const grid = $('meals-grid');
  grid.innerHTML = MEALS.carb.map(m => `
    <div class="food-card ${state.selectedMeal?.id === m.id ? 'selected' : ''}"
         onclick="selectMeal('${m.id}')">
      <div class="food-thumb">${m.emoji}</div>
      <div class="food-card-body">
        <div class="food-card-name">${m.name}</div>
        <div class="food-card-sub">${m.carb} คาร์บ · ${m.cal} kcal</div>
      </div>
    </div>
  `).join('');

  const detail = $('meal-detail');
  if (state.selectedMeal) {
    const m = state.selectedMeal;
    detail.style.display = 'block';
    detail.innerHTML = `
      <div class="food-card-detail">
        <h4>${m.emoji} ${m.name}</h4>
        <div class="detail-stats">
          <span class="stat-pill">🌾 ${m.carb} คาร์บ</span>
          <span class="stat-pill">⚖️ ${m.grams} ก.</span>
          <span class="stat-pill">🔥 ${m.cal} kcal</span>
        </div>
        <div style="margin-top:10px;font-size:13px;color:var(--text-sub)">ส่วนประกอบหลัก:</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px">
          ${m.ingredients.map((ing, i) => `<div class="ingr-chip"><span class="ingr-icon">${m.ingredEmoji[i]}</span>${ing}</div>`).join('')}
        </div>
        <div class="tip-banner" style="margin:10px 0 0">💡 ${m.tip}</div>
        <button class="btn-primary" style="margin-top:10px;font-size:13px;padding:8px 16px"
          onclick="addMealToLog()">+ เพิ่มในบันทึก</button>
      </div>`;
  } else { detail.style.display = 'none'; }
}

function selectMeal(id) {
  state.selectedMeal = MEALS.carb.find(m => m.id === id) || null;
  renderMealsScreen();
}

function addMealToLog() {
  if (!state.selectedMeal) return;
  const m = state.selectedMeal;
  state.logEntries[state.activeMealType].push({ name: m.name, amount: '1 จาน', carb: m.carb });
  showToast(`✅ เพิ่ม ${m.name} ในบันทึกแล้ว`);
  state.selectedMeal = null;
  renderMealsScreen();
}

// ── LOG SCREEN ──────────────────────────────────────────────────────────────
const MEAL_LABELS = {
  breakfast: { label: 'อาหารเช้า', icon: '☀️', target: 60 },
  lunch: { label: 'อาหารกลางวัน', icon: '🌤️', target: 75 },
  dinner: { label: 'อาหารเย็น', icon: '🌙', target: 45 },
  snack: { label: 'อาหารว่าง', icon: '🍎', target: 15 },
};

function renderLogScreen() {
  const entries = state.logEntries[state.activeMealType];
  const total = entries.reduce((a, e) => a + e.carb, 0);
  const grams = total * 15;
  const list = $('log-list');
  const info = MEAL_LABELS[state.activeMealType];
  list.innerHTML = entries.length ? entries.map((e, i) => `
    <div class="log-item">
      <div>
        <div class="log-name">${e.name}</div>
        <div class="log-amount">${e.amount}</div>
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        <span class="log-carb">${e.carb} คาร์บ</span>
        <button class="del-btn" onclick="deleteLogEntry(${i})">🗑</button>
      </div>
    </div>
  `).join('') : `<div style="padding:20px;text-align:center;color:var(--text-light);font-size:14px">ยังไม่มีบันทึกสำหรับ${info.label}</div>`;

  $('log-total').innerHTML = `
    <div style="text-align:center">
      <div style="font-size:13px;color:var(--text-sub)">คาร์บรวม</div>
      <div style="font-size:30px;font-weight:800;color:var(--primary)">${total}</div>
      <div style="font-size:12px;color:var(--text-sub)">= ${grams} กรัมคาร์โบไฮเดรต</div>
    </div>
    <div style="text-align:center">
      <div style="font-size:13px;color:var(--text-sub)">พลังงาน</div>
      <div style="font-size:30px;font-weight:800;color:var(--accent)">${total * 70}</div>
      <div style="font-size:12px;color:var(--text-sub)">kcal (โดยประมาณ)</div>
    </div>
  `;
}

function deleteLogEntry(idx) {
  state.logEntries[state.activeMealType].splice(idx, 1);
  renderLogScreen();
}

function setMealTab(meal) {
  state.activeMealType = meal;
  document.querySelectorAll('.meal-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.meal === meal);
  });
  renderLogScreen();
}

// ── SUMMARY SCREEN ──────────────────────────────────────────────────────────
function renderSummary() {
  const totals = {};
  let grandCarb = 0, grandCal = 0;
  Object.entries(state.logEntries).forEach(([meal, entries]) => {
    const c = entries.reduce((a, e) => a + e.carb, 0);
    totals[meal] = c;
    grandCarb += c;
    grandCal += c * 70;
  });

  $('summary-grand-carb').textContent = grandCarb;
  $('summary-grand-gram').textContent = `= ${grandCarb * 15} กรัมคาร์โบไฮเดรต`;
  $('summary-kcal').textContent = grandCal;

  const maxCarb = Math.max(...Object.values(totals), 1);
  const rows = $('summary-rows');
  rows.innerHTML = Object.entries(MEAL_LABELS).map(([key, info]) => {
    const c = totals[key] || 0;
    const pct = Math.round((c / info.target) * 100);
    const barW = Math.min(100, Math.round((c / maxCarb) * 100));
    return `
      <div class="meal-summary-row">
        <span class="meal-icon">${info.icon}</span>
        <span class="meal-name">${info.label}</span>
        <div class="progress-bar-wrap">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${barW}%"></div>
          </div>
        </div>
        <span class="carb-val">${c} คาร์บ / ${c * 15}ก.</span>
      </div>`;
  }).join('');
}

// ── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.screen));
  });
  document.querySelector('.nav-fab').addEventListener('click', () => navigate('calc'));

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', goBack);
  });

  // Home quick-actions
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.goto));
  });

  // Library category tabs
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => setLibCat(tab.dataset.cat));
  });

  // Meal tabs in log
  document.querySelectorAll('.meal-tab').forEach(tab => {
    tab.addEventListener('click', () => setMealTab(tab.dataset.meal));
  });

  // Save calc button
  const saveBtn = $('calc-save');
  if (saveBtn) saveBtn.addEventListener('click', saveCalcEntry);

  // Init screens
  renderCalcScreen();
  renderLibrary();
  renderMealsScreen();
  renderLogScreen();
  renderSummary();
  navigate('home');
});