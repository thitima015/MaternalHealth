const MENU_DB = [
  { name: "ผัดซีอิ๊วหมูใส่ไข่", kcal: 535, carb: 3.3, group: "carb" },
  { name: "ราดหน้าหมู", kcal: 452, carb: 2.8, group: "carb" },
  { name: "ก๋วยเตี๋ยวเส้นหมี่ไก่มะระ", kcal: 300, carb: 2.0, group: "carb" },
  { name: "สุกี้ทะเล", kcal: 235, carb: 1.7, group: "carb" },
  { name: "ผัดไทยใส่ไข่", kcal: 600, carb: 3.0, group: "carb" },
  { name: "ข้าวมันไก่", kcal: 380, carb: 2.3, group: "carb" },
  { name: "ข้าวกล้องสวย 1 ทัพพี", kcal: 80, carb: 1.0, group: "carb" },
  { name: "ไข่ต้ม 1 ฟอง", kcal: 78, carb: 0, group: "protein" },
  { name: "ไก่ต้มไม่มีหนัง 60 กรัม", kcal: 90, carb: 0, group: "protein" },
  { name: "ปลานึ่งมะนาว", kcal: 120, carb: 0.2, group: "protein" },
  { name: "ผักต้ม / ผัดน้ำมันน้อย", kcal: 50, carb: 0.3, group: "veg" },
  { name: "ต้มจืดผักรวม", kcal: 40, carb: 0.2, group: "veg" }
];

let currentMeal = "เช้า";
let currentGroup = "all";
let selectedFoodItem = null;
let carbQty = 1;

let foodLog = [];
let insulinLog = [];

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  document.getElementById("dateBadge").innerText = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
  renderMenu();
  updateLogView();
  updateSummary();
});

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));

  const tabs = ['record', 'log', 'summary', 'guide'];
  const idx = tabs.indexOf(tabId);
  if (idx !== -1) document.querySelectorAll('.tab-btn')[idx].classList.add('active');
  document.getElementById(`tab-${tabId}`).classList.add('active');
}

function selectMeal(btn) {
  document.querySelectorAll('.meal-time-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentMeal = btn.getAttribute('data-meal');
}

function filterGroup(btn, group) {
  document.querySelectorAll('.food-group-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentGroup = group;
  renderMenu();
}

function searchMenu(val) {
  renderMenu(val.trim());
}

function renderMenu(query = "") {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";

  const filtered = MENU_DB.filter(item => {
    const matchesGroup = currentGroup === "all" || item.group === currentGroup;
    const matchesSearch = item.name.includes(query);
    return matchesGroup && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:span 2;text-align:center;color:var(--muted);padding:20px;">ไม่พบอาหารคลัง</div>';
    return;
  }

  filtered.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "menu-item";
    if (selectedFoodItem && selectedFoodItem.name === item.name) btn.classList.add("selected");
    btn.innerHTML = `
      <div class="name">${item.name}</div>
      <div class="stats">
        <span class="badge kcal">${item.kcal} kcal</span>
        <span class="badge carb">${item.carb} คาร์บ</span>
      </div>
    `;
    btn.onclick = () => {
      document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('selected'));
      selectedFoodItem = (selectedFoodItem?.name === item.name) ? null : item;
      if (selectedFoodItem) btn.classList.add("selected");
    };
    grid.appendChild(btn);
  });
}

function changeQty(amt) {
  carbQty = Math.max(0.5, carbQty + amt);
  document.getElementById("carbQty").innerText = carbQty;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

function addSelectedFood() {
  if (!selectedFoodItem) { showToast("⚠️ กรุณาเลือกรายการอาหารก่อน"); return; }
  foodLog.push({
    name: selectedFoodItem.name, meal: currentMeal,
    kcal: Math.round(selectedFoodItem.kcal * carbQty), carb: selectedFoodItem.carb * carbQty
  });
  showToast(`เพิ่มอาหารมื้อ${currentMeal}แล้ว!`);
  updateLogView(); updateSummary();
}

function addFreeFood() {
  const name = document.getElementById("freeFood").value.trim();
  const kcal = parseFloat(document.getElementById("freeKcal").value) || 0;
  const carb = parseFloat(document.getElementById("freeCarb").value) || 0;
  if (!name) { showToast("⚠️ กรุณากรอกชื่ออาหาร"); return; }
  foodLog.push({ name, meal: currentMeal, kcal, carb });
  showToast("เพิ่มรายการอาหารแล้ว!");
  document.getElementById("freeFood").value = "";
  document.getElementById("freeKcal").value = "";
  document.getElementById("freeCarb").value = "";
  updateLogView(); updateSummary();
}

function addInsulin() {
  const type = document.getElementById("insulinType").value;
  const dose = parseFloat(document.getElementById("insulinDose").value) || 0;
  const timing = document.getElementById("insulinTiming").value;
  if (dose <= 0) { showToast("⚠️ กรุณาระบุปริมาณยา"); return; }
  insulinLog.push({ type, dose, timing });
  showToast("บันทึกการรับยาแล้ว!");
  document.getElementById("insulinDose").value = "";
  updateLogView(); updateSummary();
}

function deleteFood(idx) { foodLog.splice(idx, 1); updateLogView(); updateSummary(); }
function deleteInsulin(idx) { insulinLog.splice(idx, 1); updateLogView(); updateSummary(); }

function updateLogView() {
  const fBox = document.getElementById("foodLogContainer");
  fBox.innerHTML = foodLog.length === 0 ? `<div class="empty-state"><div class="icon">🍽️</div>ยังไม่มีรายการอาหาร</div>` :
    '<ul class="log-list">' + foodLog.map((item, i) => `
      <li class="log-item">
        <div class="log-left"><div class="log-name">${item.name}</div><div class="log-meta">มื้อ${item.meal} | ${item.kcal} kcal | คาร์บ ${item.carb} ส่วน</div></div>
        <button class="del-btn" onclick="deleteFood(${i})">🗑️</button>
      </li>`).join('') + '</ul>';

  const iBox = document.getElementById("insulinLogContainer");
  iBox.innerHTML = insulinLog.length === 0 ? `<div class="empty-state"><div class="icon">💉</div>ยังไม่มีบันทึกยา</div>` :
    '<ul class="log-list">' + insulinLog.map((item, i) => `
      <li class="log-item">
        <div class="log-left"><div class="log-name">${item.type} (${item.dose} Unit)</div><div class="log-meta">${item.timing}</div></div>
        <button class="del-btn" onclick="deleteInsulin(${i})">🗑️</button>
      </li>`).join('') + '</ul>';
}

function updateSummary() {
  let tKcal = 0, tCarb = 0, tInsulin = 0;
  let breakdown = { "เช้า": { kcal: 0, carb: 0 }, "กลางวัน": { kcal: 0, carb: 0 }, "เย็น": { kcal: 0, carb: 0 } };

  foodLog.forEach(item => {
    tKcal += item.kcal; tCarb += item.carb;
    if (breakdown[item.meal]) { breakdown[item.meal].kcal += item.kcal; breakdown[item.meal].carb += item.carb; }
  });
  insulinLog.forEach(item => tInsulin += item.dose);

  document.getElementById("totalKcal").innerText = tKcal;
  document.getElementById("totalCarb").innerText = tCarb.toFixed(1);
  document.getElementById("totalInsulin").innerText = tInsulin;

  // Progress calculations (Targets: 2000kcal, 12 carbs)
  const kPct = Math.min(100, (tKcal / 2000) * 100);
  document.getElementById("kcalPct").innerText = Math.round(kPct) + "%";
  document.getElementById("kcalBar").style.width = kPct + "%";

  const cPct = Math.min(100, (tCarb / 12) * 100);
  document.getElementById("carbPct").innerText = `${tCarb.toFixed(1)} / 12 ส่วน`;
  document.getElementById("carbBar").style.width = cPct + "%";

  document.getElementById("mealBreakdown").innerHTML = Object.keys(breakdown).map(m => `
    <div class="meal-section">
      <div class="meal-section-header">${m === 'เช้า' ? '🌅' : m === 'กลางวัน' ? '☀️' : '🌆'} มื้อ${m}</div>
      <div style="display:flex;justify-content:space-between;padding:0 10px;font-size:0.85rem;">
        <span>พลังงาน: <b>${breakdown[m].kcal} kcal</b></span>
        <span>คาร์บ: <b>${breakdown[m].carb.toFixed(1)} ส่วน</b></span>
      </div>
    </div>`).join('');
}

function saveDay() {
  showToast("💾 บันทึกข้อมูลวันนี้สำเร็จ!");
}