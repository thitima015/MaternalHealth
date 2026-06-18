const MENU_DB = [
  // ===== อาหารจานเดียว =====
  { name: "ผัดซีอิ๊วหมูใส่ไข่", kcal: 535, carb: 3.3, group: "meal" },
{ name: "ราดหน้าหมู", kcal: 452, carb: 2.8, group: "meal" },
{ name: "ก๋วยเตี๋ยวเส้นหมี่ไก่มะระ", kcal: 300, carb: 2.0, group: "meal" },
{ name: "สุกี้ทะเล", kcal: 235, carb: 1.7, group: "meal" },
{ name: "ผัดไทยใส่ไข่", kcal: 600, carb: 3.0, group: "meal" },
{ name: "ข้าวมันไก่", kcal: 380, carb: 2.3, group: "meal" },
{ name: "ข้าวหมูแดง", kcal: 540, carb: 3.5, group: "meal" },
{ name: "ข้าวขาหมู", kcal: 690, carb: 3.5, group: "meal" },

  // ===== คาร์โบไฮเดรต 1 ส่วน =====
  { name: "ข้าวสวย 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "ข้าวกล้อง 1 ทัพพี", kcal: 75, carb: 1, group: "carb" },
  { name: "ข้าวเหนียว 1/2 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "ขนมปัง 1 แผ่น", kcal: 70, carb: 1, group: "carb" },
  { name: "เส้นหมี่สุก 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "เส้นใหญ่สุก 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "บะหมี่สุก 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "วุ้นเส้นสุก 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "เส้นขนมจีน 1 จับ", kcal: 80, carb: 1, group: "carb" },
  { name: "เส้นเกี้ยมอี๋สุก 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "เส้นพาสต้า/สปาเกตตีสุก 1 ทัพพี", kcal: 80, carb: 1, group: "carb" },
  { name: "บะหมี่กึ่งสำเร็จรูป 1 ซอง", kcal: 250, carb: 2.5, group: "carb" },

  // ===== เนื้อสัตว์ =====
  { name: "ไข่ต้ม 1 ฟอง", kcal: 78, carb: 0, group: "protein" },
  { name: "ไข่เป็ดต้ม 1 ฟอง", kcal: 130, carb: 0, group: "protein" },
  { name: "อกไก่ต้ม 60 กรัม", kcal: 90, carb: 0, group: "protein" },
  { name: "หมูไม่ติดมัน 60 กรัม", kcal: 120, carb: 0, group: "protein" },
  { name: "เนื้อวัวไม่ติดมัน 60 กรัม", kcal: 130, carb: 0, group: "protein" },
  { name: "ปลาทู 1 ตัว", kcal: 150, carb: 0, group: "protein" },
  { name: "ปลาแซลมอน 60 กรัม", kcal: 140, carb: 0, group: "protein" },
  { name: "กุ้งต้ม 6 ตัว", kcal: 80, carb: 0, group: "protein" },

  // ===== ผัก =====
  { name: "ผักกาดขาว", kcal: 13, carb: 0.2, group: "veg" },
  { name: "คะน้า", kcal: 25, carb: 0.3, group: "veg" },
  { name: "กวางตุ้ง", kcal: 15, carb: 0.2, group: "veg" },
  { name: "ผักบุ้ง", kcal: 19, carb: 0.3, group: "veg" },
  { name: "กะหล่ำปลี", kcal: 22, carb: 0.4, group: "veg" },
  { name: "บรอกโคลี", kcal: 34, carb: 0.4, group: "veg" },
  { name: "แครอท", kcal: 41, carb: 0.6, group: "veg" },
  { name: "แตงกวา", kcal: 15, carb: 0.2, group: "veg" },
  { name: "ถั่วฝักยาว", kcal: 35, carb: 0.5, group: "veg" },
  { name: "ฟักทอง", kcal: 49, carb: 1.0, group: "veg" },
  { name: "เห็ดนางฟ้า", kcal: 22, carb: 0.3, group: "veg" },
  { name: "เห็ดเข็มทอง", kcal: 37, carb: 0.4, group: "veg" },
  { name: "มะเขือเทศ", kcal: 18, carb: 0.3, group: "veg" },
  { name: "ผักสลัด", kcal: 15, carb: 0.2, group: "veg" },
  { name: "ตำลึง", kcal: 20, carb: 0.3, group: "veg" },
  { name: "ชะอม", kcal: 57, carb: 0.5, group: "veg" },
  { name: "ยอดฟักแม้ว", kcal: 18, carb: 0.2, group: "veg" },
  { name: "ดอกกะหล่ำ", kcal: 25, carb: 0.4, group: "veg" },

  // ===== ผลไม้ =====
  { name: "แอปเปิ้ล", kcal: 60, carb: 1, group: "fruit" },
  { name: "ฝรั่ง", kcal: 60, carb: 1, group: "fruit" },
  { name: "ส้ม", kcal: 60, carb: 1, group: "fruit" },
  { name: "แตงโม", kcal: 60, carb: 1, group: "fruit" },
  { name: "มะละกอ", kcal: 55, carb: 1, group: "fruit" },
  { name: "แก้วมังกร", kcal: 60, carb: 1, group: "fruit" },
  { name: "ชมพู่", kcal: 50, carb: 0.8, group: "fruit" },
  { name: "สับปะรด", kcal: 60, carb: 1, group: "fruit" },
  { name: "กล้วยน้ำว้า", kcal: 60, carb: 1, group: "fruit" },
  { name: "มะม่วงสุก 1/2 ผล", kcal: 80, carb: 1.2, group: "fruit" },
  { name: "มังคุด 4 ผล", kcal: 60, carb: 1, group: "fruit" },
  { name: "ส้มโอ 2 กลีบ", kcal: 60, carb: 1, group: "fruit" },
  { name: "เงาะ 4 ผล", kcal: 60, carb: 1, group: "fruit" },

  // ===== นม =====
  { name: "นมรสจืด 1 แก้ว (240 มล.)", kcal: 120, carb: 0.8, group: "milk" },
  { name: "นมพร่องมันเนย 1 แก้ว (240 มล.)", kcal: 80, carb: 1, group: "milk" },
  { name: "นมถั่วเหลืองจืด 1 แก้ว (240 มล.)", kcal: 80, carb: 0.5, group: "milk" },
  { name: "นมเปรี้ยว 1 ขวดเล็ก (100 มล.)", kcal: 70, carb: 1.2, group: "milk" },
  { name: "โยเกิร์ต 1 ถ้วย", kcal: 80, carb: 1, group: "milk" },
  { name: "นมแพะ 1 แก้ว (240 มล.)", kcal: 150, carb: 0.8, group: "milk" },
];


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
    const matchesGroup =
      currentGroup === "all" || item.group === currentGroup;

    const matchesSearch =
      item.name.toLowerCase().includes(query.toLowerCase());

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
    const carbBadge = item.group === "protein" ? "" : `<span class="badge carb">${item.carb} คาร์บ</span>`;
    btn.innerHTML = `
      <div class="name">${item.name}</div>
      <div class="stats">
        <span class="badge kcal">${item.kcal} kcal</span>
        ${carbBadge}
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
    name: selectedFoodItem.name,
    kcal: Math.round(selectedFoodItem.kcal * carbQty), carb: selectedFoodItem.carb * carbQty,
    group: selectedFoodItem.group
  });
  showToast(`เพิ่มอาหารแล้ว!`);
  updateLogView(); updateSummary();
}

function addFreeFood() {
  const name = document.getElementById("freeFood").value.trim();
  const kcal = parseFloat(document.getElementById("freeKcal").value) || 0;
  const carb = parseFloat(document.getElementById("freeCarb").value) || 0;
  if (!name) { showToast("⚠️ กรุณากรอกชื่ออาหาร"); return; }
  foodLog.push({ name, kcal, carb });
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
    '<ul class="log-list">' + foodLog.map((item, i) => {
      const carbText = item.group === "protein" ? "" : ` | คาร์บ ${item.carb} ส่วน`;
      return `
      <li class="log-item">
        <div class="log-left"><div class="log-name">${item.name}</div><div class="log-meta">${item.kcal} kcal${carbText}</div></div>
        <button class="del-btn" onclick="deleteFood(${i})">🗑️</button>
      </li>`;
    }).join('') + '</ul>';

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
  foodLog.forEach(item => {
    tKcal += item.kcal; tCarb += item.carb;
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


}

function saveDay() {
  showToast("💾 บันทึกข้อมูลวันนี้สำเร็จ!");
}

function toggleTri(tri) {
  const btn1 = document.getElementById("btn-tri1");
  const btn2 = document.getElementById("btn-tri2");
  const con1 = document.getElementById("tri1-container");
  const con2 = document.getElementById("tri2-container");
  
  if (tri === 1) {
    btn1.classList.add("active");
    btn2.classList.remove("active");
    con1.style.display = "block";
    con2.style.display = "none";
  } else {
    btn1.classList.remove("active");
    btn2.classList.add("active");
    con1.style.display = "none";
    con2.style.display = "block";
  }
}