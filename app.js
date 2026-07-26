/* ===== 筋トレログ app.js ===== */
"use strict";

/* ---------- データ ---------- */
const STORAGE_KEY = "kintore.data.v1";
const PARTS = ["胸", "背中", "肩", "二頭", "三頭", "前腕", "前もも", "もも裏", "お尻", "ふくらはぎ", "腹筋", "その他"];
const DATA_VERSION = 5;
const EQUIPS = ["バーベル", "ダンベル", "マシン", "ケーブル", "自重", "その他"];
const DEFAULT_EXERCISES = [
  // 胸
  { name: "ベンチプレス", part: "胸", equip: "バーベル" },
  { name: "インクラインベンチプレス", part: "胸", equip: "バーベル" },
  { name: "デクラインベンチプレス", part: "胸", equip: "バーベル" },
  { name: "ダンベルプレス", part: "胸", equip: "ダンベル" },
  { name: "ダンベルフライ", part: "胸", equip: "ダンベル" },
  { name: "ケーブルクロスオーバー", part: "胸", equip: "ケーブル" },
  { name: "チェストプレス", part: "胸", equip: "マシン" },
  { name: "腕立て伏せ", part: "胸", equip: "自重" },
  { name: "ディップス", part: "胸", equip: "自重" },
  { name: "インクラインダンベルプレス", part: "胸", equip: "ダンベル" },
  { name: "ペックフライ", part: "胸", equip: "マシン" },
  { name: "スミスマシンベンチプレス", part: "胸", equip: "マシン" },
  { name: "ダンベルプルオーバー", part: "胸", equip: "ダンベル" },
  // 背中
  { name: "デッドリフト", part: "背中", equip: "バーベル" },
  { name: "ラットプルダウン", part: "背中", equip: "マシン" },
  { name: "懸垂", part: "背中", equip: "自重" },
  { name: "ベントオーバーロー", part: "背中", equip: "バーベル" },
  { name: "シーテッドロー", part: "背中", equip: "マシン" },
  { name: "ワンハンドロー", part: "背中", equip: "ダンベル" },
  { name: "Tバーロー", part: "背中", equip: "バーベル" },
  { name: "バックエクステンション", part: "背中", equip: "自重" },
  { name: "シュラッグ", part: "背中", equip: "ダンベル" },
  { name: "ストレートアームプルダウン", part: "背中", equip: "ケーブル" },
  { name: "ケーブルロー", part: "背中", equip: "ケーブル" },
  { name: "ラックプル", part: "背中", equip: "バーベル" },
  { name: "インバーテッドロー", part: "背中", equip: "自重" },
  // 肩
  { name: "ショルダープレス", part: "肩", equip: "バーベル" },
  { name: "ダンベルショルダープレス", part: "肩", equip: "ダンベル" },
  { name: "サイドレイズ", part: "肩", equip: "ダンベル" },
  { name: "フロントレイズ", part: "肩", equip: "ダンベル" },
  { name: "リアレイズ", part: "肩", equip: "ダンベル" },
  { name: "アップライトロー", part: "肩", equip: "バーベル" },
  { name: "アーノルドプレス", part: "肩", equip: "ダンベル" },
  { name: "マシンショルダープレス", part: "肩", equip: "マシン" },
  { name: "ケーブルサイドレイズ", part: "肩", equip: "ケーブル" },
  { name: "フェイスプル", part: "肩", equip: "ケーブル" },
  { name: "リバースペックフライ", part: "肩", equip: "マシン" },
  // 二頭（力こぶ）
  { name: "バーベルカール", part: "二頭", equip: "バーベル" },
  { name: "ダンベルカール", part: "二頭", equip: "ダンベル" },
  { name: "ハンマーカール", part: "二頭", equip: "ダンベル" },
  { name: "インクラインカール", part: "二頭", equip: "ダンベル" },
  { name: "プリーチャーカール", part: "二頭", equip: "バーベル" },
  { name: "EZバーカール", part: "二頭", equip: "バーベル" },
  { name: "ケーブルカール", part: "二頭", equip: "ケーブル" },
  { name: "コンセントレーションカール", part: "二頭", equip: "ダンベル" },
  // 三頭（二の腕）
  { name: "トライセプスプレスダウン", part: "三頭", equip: "ケーブル" },
  { name: "スカルクラッシャー", part: "三頭", equip: "バーベル" },
  { name: "キックバック", part: "三頭", equip: "ダンベル" },
  { name: "ナローベンチプレス", part: "三頭", equip: "バーベル" },
  { name: "フレンチプレス", part: "三頭", equip: "ダンベル" },
  { name: "ベンチディップス", part: "三頭", equip: "自重" },
  { name: "ダイヤモンドプッシュアップ", part: "三頭", equip: "自重" },
  { name: "ケーブルオーバーヘッドエクステンション", part: "三頭", equip: "ケーブル" },
  // 前腕
  { name: "リストカール", part: "前腕", equip: "ダンベル" },
  { name: "リバースリストカール", part: "前腕", equip: "ダンベル" },
  { name: "ファーマーズキャリー", part: "前腕", equip: "ダンベル" },
  { name: "リストローラー", part: "前腕", equip: "その他" },
  // 前もも
  { name: "スクワット", part: "前もも", equip: "バーベル" },
  { name: "フロントスクワット", part: "前もも", equip: "バーベル" },
  { name: "ハックスクワット", part: "前もも", equip: "マシン" },
  { name: "レッグプレス", part: "前もも", equip: "マシン" },
  { name: "レッグエクステンション", part: "前もも", equip: "マシン" },
  { name: "ゴブレットスクワット", part: "前もも", equip: "ダンベル" },
  { name: "スミスマシンスクワット", part: "前もも", equip: "マシン" },
  { name: "シシースクワット", part: "前もも", equip: "自重" },
  { name: "ステップアップ", part: "前もも", equip: "ダンベル" },
  // もも裏
  { name: "レッグカール", part: "もも裏", equip: "マシン" },
  { name: "ルーマニアンデッドリフト", part: "もも裏", equip: "バーベル" },
  { name: "グッドモーニング", part: "もも裏", equip: "バーベル" },
  { name: "スティッフレッグデッドリフト", part: "もも裏", equip: "バーベル" },
  { name: "ノルディックハムカール", part: "もも裏", equip: "自重" },
  // お尻
  { name: "ヒップスラスト", part: "お尻", equip: "バーベル" },
  { name: "ランジ", part: "お尻", equip: "ダンベル" },
  { name: "ブルガリアンスクワット", part: "お尻", equip: "ダンベル" },
  { name: "ヒップアブダクション", part: "お尻", equip: "マシン" },
  { name: "グルートブリッジ", part: "お尻", equip: "自重" },
  { name: "ケーブルキックバック", part: "お尻", equip: "ケーブル" },
  { name: "サイドランジ", part: "お尻", equip: "ダンベル" },
  // ふくらはぎ
  { name: "カーフレイズ", part: "ふくらはぎ", equip: "自重" },
  { name: "シーテッドカーフレイズ", part: "ふくらはぎ", equip: "マシン" },
  { name: "スタンディングカーフレイズ", part: "ふくらはぎ", equip: "マシン" },
  { name: "シングルレッグカーフレイズ", part: "ふくらはぎ", equip: "自重" },
  // 腹筋
  { name: "クランチ", part: "腹筋", equip: "自重" },
  { name: "レッグレイズ", part: "腹筋", equip: "自重" },
  { name: "ハンギングレッグレイズ", part: "腹筋", equip: "自重" },
  { name: "プランク", part: "腹筋", equip: "自重" },
  { name: "サイドプランク", part: "腹筋", equip: "自重" },
  { name: "アブローラー", part: "腹筋", equip: "その他" },
  { name: "ロシアンツイスト", part: "腹筋", equip: "自重" },
  { name: "シットアップ", part: "腹筋", equip: "自重" },
  { name: "バイシクルクランチ", part: "腹筋", equip: "自重" },
  { name: "ケーブルクランチ", part: "腹筋", equip: "ケーブル" },
  { name: "マウンテンクライマー", part: "腹筋", equip: "自重" },
  { name: "デッドバグ", part: "腹筋", equip: "自重" },
];

let data = loadData();

/* ---------- 種目ピクトグラム (定義は icons.js) ---------- */
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
function exIconKey(ex) {
  const key = hasOwn(EX_ICON_KEY, ex.name) ? EX_ICON_KEY[ex.name]
    : (hasOwn(PART_ICON_KEY, ex.part) ? PART_ICON_KEY[ex.part] : "dumbbell");
  return hasOwn(ICONS, key) ? key : "dumbbell";
}
function exIconSvg(ex) {
  return ICONS[exIconKey(ex)];
}
function exIconAnim(ex) {
  const key = exIconKey(ex);
  return (typeof ICON_ANIM !== "undefined" && hasOwn(ICON_ANIM, key)) ? ICON_ANIM[key] : ICONS[key];
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
/* 設定・データ要素の検証（インポートや破損データからの防御） */
function sanitizeSettings(s) {
  const out = Object.assign({ autoTimer: true, timerSec: 90, sound: true, notify: true }, s);
  const t = Number(out.timerSec);
  out.timerSec = (Number.isFinite(t) && t >= 15 && t <= 3600) ? Math.round(t) : 90;
  out.autoTimer = !!out.autoTimer;
  out.sound = !!out.sound;
  out.notify = !!out.notify;
  if (typeof out.slotMode !== "string") delete out.slotMode;
  return out;
}
/* 注意: loadData() はファイル先頭付近で実行されるため、ここは必ず関数宣言(巻き上げ)にする */
function isValidExercise(e) {
  return e !== null && typeof e === "object" &&
    typeof e.id === "string" && typeof e.name === "string" && typeof e.part === "string";
}
function isValidSet(s) {
  return s !== null && typeof s === "object" &&
    typeof s.id === "string" && typeof s.exId === "string" && typeof s.date === "string" &&
    Number.isFinite(s.weight) && Number.isFinite(s.reps);
}
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (d && Array.isArray(d.exercises) && Array.isArray(d.sets)) {
        d.exercises = d.exercises.filter(isValidExercise); // 不正要素は自己修復的に除去
        d.sets = d.sets.filter(isValidSet);
        d.settings = sanitizeSettings(d.settings);
        d.removedDefaults = Array.isArray(d.removedDefaults) ? d.removedDefaults : [];
        d.sessions = sanitizeSessions(d.sessions);
        // 旧バージョンのデータ移行
        if ((d.version || 1) < DATA_VERSION) {
          // v4: 部位の細分化（既存種目の部位を名前ベースで付け替え）
          const nameInfo = new Map(DEFAULT_EXERCISES.map(def => [def.name, def]));
          const legacyPart = new Map([["アームカール", "二頭"]]);
          const coarsePart = new Map([["腕", "二頭"], ["脚", "前もも"], ["体幹", "腹筋"]]);
          d.exercises.forEach(e => {
            const info = nameInfo.get(e.name);
            if (info) e.part = info.part;
            else if (legacyPart.has(e.name)) e.part = legacyPart.get(e.name);
            else if (coarsePart.has(e.part)) e.part = coarsePart.get(e.part);
            else if (!PARTS.includes(e.part)) e.part = "その他";
          });
          // v2: 新しいデフォルト種目を追加（削除済みは復活させない）
          DEFAULT_EXERCISES.forEach(def => {
            if (!d.exercises.some(e => e.name === def.name) && !d.removedDefaults.includes(def.name)) {
              d.exercises.push({ id: uid() + def.name, name: def.name, part: def.part, equip: def.equip });
            }
          });
          // v3: 自動タイマーと通知をデフォルトON化
          if ((d.version || 1) < 3) { d.settings.autoTimer = true; d.settings.notify = true; }
          d.version = DATA_VERSION;
        }
        // 器具情報の正規化（デフォルト種目は名前から補完、カスタムは「その他」）
        {
          const nameInfo2 = new Map(DEFAULT_EXERCISES.map(def => [def.name, def]));
          d.exercises.forEach(e => {
            if (!EQUIPS.includes(e.equip)) {
              const info = nameInfo2.get(e.name);
              e.equip = info ? info.equip : "その他";
            }
          });
        }
        return d;
      }
    }
  } catch (e) {
    // 破損時は初期化するが、元データはバックアップに退避（上書き事故防止）
    try {
      const raw2 = localStorage.getItem(STORAGE_KEY);
      if (raw2) localStorage.setItem(STORAGE_KEY + ".backup", raw2);
    } catch (e2) { /* 保存領域不足などは無視 */ }
  }
  return {
    version: DATA_VERSION,
    exercises: DEFAULT_EXERCISES.map(e => ({ id: uid() + e.name, name: e.name, part: e.part, equip: e.equip })),
    sets: [],
    removedDefaults: [],
    sessions: {},
    settings: { autoTimer: true, timerSec: 90, sound: true, notify: true },
  };
}
function sanitizeSessions(s) {
  if (!s || typeof s !== "object" || Array.isArray(s)) return {};
  Object.keys(s).forEach(k => {
    const v = s[k];
    if (!v || typeof v !== "object" || typeof v.end !== "string" || !/^\d{1,2}:\d{2}$/.test(v.end)) { delete s[k]; return; }
    if (v.endDate !== undefined && (typeof v.endDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v.endDate))) delete v.endDate;
  });
  return s;
}
function fmtClock(ts) {
  const d = new Date(ts);
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}
function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return todayStr(new Date(y, m - 1, d + n));
}
function sessionEndTs(workDate, sess) {
  const [h, m] = sess.end.split(":").map(Number);
  const base = sess.endDate || workDate;
  const [y, mo, d] = base.split("-").map(Number);
  return new Date(y, mo - 1, d, h, m).getTime();
}
function sessionDurText(startTs, workDate, sess) {
  if (startTs === null || !sess || !sess.end) return "";
  const mins = Math.round((sessionEndTs(workDate, sess) - startTs) / 60000);
  if (mins <= 0) return "";
  return mins >= 60 ? `${Math.floor(mins / 60)}時間${mins % 60 ? mins % 60 + "分" : ""}` : `${mins}分`;
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function todayStr(d = new Date()) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function fmtDateShort(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${m}/${d}`;
}
function fmtDateLong(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = "日月火水木金土"[new Date(y, m - 1, d).getDay()];
  return `${m}月${d}日(${day})`;
}
function fmtWeight(w) { return w === 0 ? "自重" : `${w}kg`; }
function e1rmOf(s) { return s.weight > 0 ? Math.round(s.weight * (1 + s.reps / 30) * 2) / 2 : 0; }
function fmtNum(n) {
  return Math.round(n) === n ? n.toLocaleString("ja-JP") : n.toLocaleString("ja-JP", { maximumFractionDigits: 1 });
}

/* ---------- 要素 ---------- */
const $ = id => document.getElementById(id);
const pages = { log: $("page-log"), slot: $("page-slot"), history: $("page-history"), chart: $("page-chart"), timer: $("page-timer") };

/* ---------- 状態 ---------- */
let selectedExId = null;
let activePage = "log";
let chartMetric = "max";
let chartRange = 90;

/* ---------- ナビ ---------- */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});
function showPage(name) {
  activePage = name;
  Object.entries(pages).forEach(([k, el]) => el.classList.toggle("active", k === name));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === name));
  if (name === "history") renderHistory();
  if (name === "chart") { populateChartSelect(); renderChart(); }
  if (name === "slot" && !slotState.running && !slotState.hasSpun) slotInitStrips();
  updateTimerPill();
  window.scrollTo(0, 0);
}

/* ---------- カレンダー ---------- */
let calY = new Date().getFullYear();
let calM = new Date().getMonth();
function renderCalendar() {
  const trained = new Set(data.sets.map(s => s.date));
  const monthPrefix = `${calY}-${String(calM + 1).padStart(2, "0")}`;
  const count = [...trained].filter(d => d.startsWith(monthPrefix)).length;
  $("calTitle").textContent = `${calY}年${calM + 1}月`;
  const now = new Date();
  const isThisMonth = calY === now.getFullYear() && calM === now.getMonth();
  $("calSummary").textContent = count > 0
    ? `${isThisMonth ? "今月" : "この月"}のワークアウト: ${count}回 💪`
    : `${isThisMonth ? "今月" : "この月"}はまだ記録なし`;
  const grid = $("calGrid");
  grid.innerHTML = "";
  "日月火水木金土".split("").forEach(w => {
    const el = document.createElement("div");
    el.className = "cal-w";
    el.textContent = w;
    grid.appendChild(el);
  });
  const firstDay = new Date(calY, calM, 1).getDay();
  for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement("div"));
  const days = new Date(calY, calM + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const ds = `${monthPrefix}-${String(d).padStart(2, "0")}`;
    const cell = document.createElement("button");
    const isFuture = ds > todayStr();
    cell.className = "cal-day" + (trained.has(ds) ? " hit" : "") + (ds === todayStr() ? " today" : "") + (isFuture ? " future" : "");
    cell.textContent = d;
    // 日付タップでその日の記録を追加（未来は不可）
    if (!isFuture) cell.addEventListener("click", () => openSetEditor({ mode: "add", date: ds }));
    else cell.disabled = true;
    grid.appendChild(cell);
  }
}
$("calPrev").addEventListener("click", () => {
  calM--; if (calM < 0) { calM = 11; calY--; }
  renderCalendar();
});
$("calNext").addEventListener("click", () => {
  calM++; if (calM > 11) { calM = 0; calY++; }
  renderCalendar();
});

/* ---------- 記録タブ ---------- */
function selectExercise(id) {
  const ex = data.exercises.find(e => e.id === id);
  if (!ex) { toast("この種目は削除されています"); return; }
  selectedExId = id;
  $("setInputCard").hidden = false;
  $("selectedExName").textContent = ex.name;
  $("selectedExIcon").innerHTML = exIconSvg(ex);
  // 前回値を初期値に
  const last = [...data.sets].reverse().find(s => s.exId === id);
  if (last) { $("inputWeight").value = last.weight; $("inputReps").value = last.reps; }
  renderTodaySets();
  $("setInputCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".stepper-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.dataset.target === "weight" ? $("inputWeight") : $("inputReps");
    const step = parseFloat(btn.dataset.step);
    let v = parseFloat(input.value) || 0;
    v = Math.max(btn.dataset.target === "weight" ? 0 : 1, Math.round((v + step) * 10) / 10);
    input.value = v;
  });
});

$("btnLogSet").addEventListener("click", () => {
  if (!selectedExId) return;
  const weight = Math.max(0, parseFloat($("inputWeight").value) || 0);
  const reps = Math.max(1, Math.round(parseFloat($("inputReps").value) || 1));
  // 自己ベスト判定（記録前の全セットと比較）
  const prevMax = data.sets.filter(s => s.exId === selectedExId).reduce((m, s) => Math.max(m, s.weight), 0);
  data.sets.push({ id: uid(), exId: selectedExId, date: todayStr(), ts: Date.now(), weight, reps });
  saveData();
  renderTodaySets();
  renderTodayStats();
  if (weight > prevMax && prevMax > 0) toast(`自己ベスト更新！ ${fmtWeight(weight)} 💪`);
  else toast("記録しました");
  if (data.settings.autoTimer) startTimer(data.settings.timerSec);
});

/* 選択中種目の記録サマリー（自己ベスト・前回・累計） */
function renderExStats() {
  const box = $("exStats");
  if (!selectedExId) { box.hidden = true; return; }
  const all = data.sets.filter(s => s.exId === selectedExId);
  box.hidden = false;
  if (all.length === 0) {
    box.innerHTML = `<div class="ex-stat ex-stat-empty">まだ記録がありません。1セット目を記録しよう！</div>`;
    return;
  }
  const best = all.reduce((m, s) => s.weight > m.weight ? s : m, all[0]);
  const today = todayStr();
  const prevDays = all.filter(s => s.date < today);
  let prevText = "—";
  if (prevDays.length) {
    const lastDate = prevDays.reduce((m, s) => s.date > m ? s.date : m, prevDays[0].date);
    const daySets = prevDays.filter(s => s.date === lastDate);
    const top = daySets.reduce((m, s) => s.weight > m.weight ? s : m, daySets[0]);
    prevText = `${fmtWeight(top.weight)}×${top.reps} (${fmtDateShort(lastDate)})`;
  }
  box.innerHTML = `
    <div class="ex-stat"><span class="ex-stat-label">自己ベスト</span><span class="ex-stat-val"></span></div>
    <div class="ex-stat"><span class="ex-stat-label">前回</span><span class="ex-stat-val"></span></div>
    <div class="ex-stat"><span class="ex-stat-label">累計</span><span class="ex-stat-val"></span></div>`;
  const vals = box.querySelectorAll(".ex-stat-val");
  vals[0].textContent = `${fmtWeight(best.weight)}×${best.reps}`;
  vals[1].textContent = prevText;
  vals[2].textContent = `${all.length}セット`;
}

function renderTodaySets() {
  renderExStats();
  const wrap = $("todaySets");
  wrap.innerHTML = "";
  if (!selectedExId) return;
  const sets = data.sets.filter(s => s.exId === selectedExId && s.date === todayStr());
  sets.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "set-row";
    const vol = s.weight * s.reps;
    row.innerHTML = `
      <span class="set-num"></span>
      <span class="set-detail"></span>
      <span class="set-vol"></span>
      <button class="set-del" aria-label="削除">✕</button>`;
    row.querySelector(".set-num").textContent = `SET ${i + 1}`;
    row.querySelector(".set-detail").textContent = `${fmtWeight(s.weight)} × ${s.reps}回`;
    const rm = e1rmOf(s);
    row.querySelector(".set-vol").textContent = rm > 0 ? `1RM ${fmtNum(rm)}` : (vol > 0 ? `${fmtNum(vol)}kg` : "");
    row.querySelector(".set-del").addEventListener("click", () => {
      data.sets = data.sets.filter(x => x.id !== s.id);
      saveData(); renderTodaySets(); renderTodayStats();
    });
    wrap.appendChild(row);
  });
}

$("sessionEndInput").addEventListener("change", e => {
  const v = e.target.value;
  const t = todayStr();
  if (v) {
    // 開始時刻より前の時刻が入力されたら「翌日」とみなす（日付跨ぎ対応）
    let endDate = t;
    const tss = data.sets.filter(s => s.date === t).map(s => s.ts).filter(Number.isFinite);
    if (tss.length) {
      const sd = new Date(Math.min(...tss));
      const [h, m] = v.split(":").map(Number);
      if (h * 60 + m < sd.getHours() * 60 + sd.getMinutes()) endDate = addDays(t, 1);
    }
    data.sessions[t] = { end: v, endDate };
  } else {
    delete data.sessions[t];
  }
  saveData();
  renderTodayStats();
});
$("btnEndNow").addEventListener("click", () => {
  const workDate = todayStr();
  data.sessions[workDate] = { end: fmtClock(Date.now()), endDate: todayStr() };
  saveData();
  renderTodayStats();
  toast("おつかれさま！💪");
});

function renderTodayStats() {
  const sets = data.sets.filter(s => s.date === todayStr());
  const vol = sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
  $("statVolume").textContent = fmtNum(vol);
  $("statSets").textContent = sets.length;
  $("statExercises").textContent = new Set(sets.map(s => s.exId)).size;
  renderTodayCard(sets, vol);
  renderCalendar();
}

/* 今日の完了セット一覧カード */
function renderTodayCard(sets, vol) {
  const card = $("todayCard");
  card.hidden = sets.length === 0;
  if (sets.length === 0) return;
  $("todayCardSummary").textContent = `${sets.length}セット・${fmtNum(vol)}kg`;
  // セッション時間: 開始=最初のセット記録時刻、完了=手動設定
  const tss = sets.map(s => s.ts).filter(Number.isFinite);
  const startTs = tss.length ? Math.min(...tss) : null;
  $("sessionStart").textContent = startTs !== null ? fmtClock(startTs) : "--:--";
  const sess = data.sessions[todayStr()];
  const endVal = sess && sess.end ? sess.end : "";
  if ($("sessionEndInput").value !== endVal) $("sessionEndInput").value = endVal;
  $("sessionNextDay").hidden = !(sess && sess.endDate && sess.endDate > todayStr());
  $("sessionDur").textContent = sessionDurText(startTs, todayStr(), sess);
  const wrap = $("todayCardList");
  wrap.innerHTML = "";
  const byEx = {};
  sets.forEach(s => { (byEx[s.exId] = byEx[s.exId] || []).push(s); });
  Object.entries(byEx).forEach(([exId, exSets]) => {
    const ex = data.exercises.find(e => e.id === exId);
    const div = document.createElement("div");
    div.className = "day-ex";
    const nm = document.createElement("button");
    nm.className = "today-ex-name";
    nm.innerHTML = `<span class="today-ex-ico"></span><span class="today-ex-label"></span><span class="today-ex-count"></span>`;
    if (ex) nm.querySelector(".today-ex-ico").innerHTML = exIconSvg(ex);
    nm.querySelector(".today-ex-label").textContent = ex ? ex.name : "（削除済み種目）";
    nm.querySelector(".today-ex-count").textContent = `${exSets.length}セット ✔`;
    if (ex) nm.addEventListener("click", () => openExDetail(ex.id));
    div.appendChild(nm);
    const setsDiv = document.createElement("div");
    setsDiv.className = "day-ex-sets";
    exSets.forEach(s => {
      const pill = document.createElement("span");
      pill.className = "hist-set";
      pill.textContent = `${fmtWeight(s.weight)}×${s.reps}`;
      setsDiv.appendChild(pill);
    });
    div.appendChild(setsDiv);
    wrap.appendChild(div);
  });
}

/* ---------- 効く筋肉マップ（細分化） ---------- */
const MUSCLE_LABEL = {
  "胸上部": "大胸筋上部", "胸下部": "大胸筋下部",
  "肩前部": "三角筋前部", "肩中部": "三角筋中部", "肩後部": "三角筋後部",
  "僧帽筋": "僧帽筋", "広背筋": "広背筋", "脊柱起立筋": "脊柱起立筋",
  "二頭": "上腕二頭筋", "三頭": "上腕三頭筋", "前腕": "前腕筋群",
  "腹直筋": "腹直筋", "腹斜筋": "腹斜筋",
  "四頭": "大腿四頭筋", "内転筋": "内転筋", "ハム": "ハムストリングス",
  "臀筋": "大臀筋", "カーフ": "腓腹筋・ヒラメ筋",
};
/* 種目ごとのターゲット (未定義はPART_DEFAULTにフォールバック) */
const EX_MUSCLES = {
  // ===== 胸 =====
  "ベンチプレス": { main: ["胸上部", "胸下部"], sub: ["肩前部", "三頭"] },
  "インクラインベンチプレス": { main: ["胸上部"], sub: ["肩前部", "三頭"] },
  "インクラインダンベルプレス": { main: ["胸上部"], sub: ["肩前部", "三頭"] },
  "デクラインベンチプレス": { main: ["胸下部"], sub: ["三頭"] },
  "ダンベルプレス": { main: ["胸上部", "胸下部"], sub: ["肩前部", "三頭"] },
  "スミスマシンベンチプレス": { main: ["胸上部", "胸下部"], sub: ["肩前部", "三頭"] },
  "チェストプレス": { main: ["胸上部", "胸下部"], sub: ["三頭"] },
  "ダンベルフライ": { main: ["胸上部", "胸下部"], sub: ["肩前部"] },
  "ペックフライ": { main: ["胸上部", "胸下部"], sub: [] },
  "ケーブルクロスオーバー": { main: ["胸下部"], sub: ["肩前部"] },
  "腕立て伏せ": { main: ["胸上部", "胸下部"], sub: ["肩前部", "三頭", "腹直筋"] },
  "ディップス": { main: ["胸下部"], sub: ["三頭", "肩前部"] },
  "ダンベルプルオーバー": { main: ["胸下部", "広背筋"], sub: ["三頭"] },
  // ===== 背中 =====
  "デッドリフト": { main: ["脊柱起立筋"], sub: ["僧帽筋", "広背筋", "ハム", "臀筋", "前腕"] },
  "ラックプル": { main: ["脊柱起立筋", "僧帽筋"], sub: ["前腕"] },
  "ラットプルダウン": { main: ["広背筋"], sub: ["二頭", "肩後部"] },
  "懸垂": { main: ["広背筋"], sub: ["二頭", "腹直筋"] },
  "ベントオーバーロー": { main: ["広背筋", "僧帽筋"], sub: ["二頭", "脊柱起立筋"] },
  "シーテッドロー": { main: ["広背筋", "僧帽筋"], sub: ["二頭"] },
  "ケーブルロー": { main: ["広背筋", "僧帽筋"], sub: ["二頭"] },
  "ワンハンドロー": { main: ["広背筋"], sub: ["二頭", "僧帽筋"] },
  "Tバーロー": { main: ["広背筋", "僧帽筋"], sub: ["二頭"] },
  "インバーテッドロー": { main: ["広背筋"], sub: ["二頭", "腹直筋"] },
  "バックエクステンション": { main: ["脊柱起立筋"], sub: ["臀筋", "ハム"] },
  "シュラッグ": { main: ["僧帽筋"], sub: ["前腕"] },
  "ストレートアームプルダウン": { main: ["広背筋"], sub: ["三頭"] },
  // ===== 肩 =====
  "ショルダープレス": { main: ["肩前部", "肩中部"], sub: ["三頭"] },
  "ダンベルショルダープレス": { main: ["肩前部", "肩中部"], sub: ["三頭"] },
  "マシンショルダープレス": { main: ["肩前部", "肩中部"], sub: ["三頭"] },
  "アーノルドプレス": { main: ["肩前部", "肩中部"], sub: ["三頭"] },
  "サイドレイズ": { main: ["肩中部"], sub: ["僧帽筋"] },
  "ケーブルサイドレイズ": { main: ["肩中部"], sub: ["僧帽筋"] },
  "フロントレイズ": { main: ["肩前部"], sub: ["肩中部"] },
  "リアレイズ": { main: ["肩後部"], sub: ["僧帽筋"] },
  "リバースペックフライ": { main: ["肩後部"], sub: ["僧帽筋"] },
  "フェイスプル": { main: ["肩後部", "僧帽筋"], sub: ["二頭"] },
  "アップライトロー": { main: ["肩中部", "僧帽筋"], sub: ["二頭"] },
  // ===== 腕 =====
  "バーベルカール": { main: ["二頭"], sub: ["前腕"] },
  "ダンベルカール": { main: ["二頭"], sub: ["前腕"] },
  "アームカール": { main: ["二頭"], sub: ["前腕"] },
  "インクラインカール": { main: ["二頭"], sub: [] },
  "プリーチャーカール": { main: ["二頭"], sub: ["前腕"] },
  "EZバーカール": { main: ["二頭"], sub: ["前腕"] },
  "ケーブルカール": { main: ["二頭"], sub: ["前腕"] },
  "コンセントレーションカール": { main: ["二頭"], sub: [] },
  "ハンマーカール": { main: ["二頭", "前腕"], sub: [] },
  "トライセプスプレスダウン": { main: ["三頭"], sub: [] },
  "スカルクラッシャー": { main: ["三頭"], sub: [] },
  "フレンチプレス": { main: ["三頭"], sub: [] },
  "ケーブルオーバーヘッドエクステンション": { main: ["三頭"], sub: [] },
  "キックバック": { main: ["三頭"], sub: [] },
  "ナローベンチプレス": { main: ["三頭"], sub: ["胸下部", "肩前部"] },
  "ベンチディップス": { main: ["三頭"], sub: ["胸下部"] },
  "ダイヤモンドプッシュアップ": { main: ["三頭"], sub: ["胸下部", "腹直筋"] },
  "リストカール": { main: ["前腕"], sub: [] },
  "リバースリストカール": { main: ["前腕"], sub: [] },
  "リストローラー": { main: ["前腕"], sub: [] },
  "ファーマーズキャリー": { main: ["前腕"], sub: ["僧帽筋", "腹直筋"] },
  // ===== 脚 =====
  "スクワット": { main: ["四頭"], sub: ["臀筋", "ハム", "脊柱起立筋", "内転筋"] },
  "フロントスクワット": { main: ["四頭"], sub: ["臀筋", "腹直筋"] },
  "ゴブレットスクワット": { main: ["四頭"], sub: ["臀筋", "内転筋"] },
  "スミスマシンスクワット": { main: ["四頭"], sub: ["臀筋"] },
  "ハックスクワット": { main: ["四頭"], sub: ["臀筋"] },
  "シシースクワット": { main: ["四頭"], sub: [] },
  "レッグプレス": { main: ["四頭"], sub: ["臀筋", "ハム"] },
  "レッグエクステンション": { main: ["四頭"], sub: [] },
  "ステップアップ": { main: ["四頭"], sub: ["臀筋"] },
  "ランジ": { main: ["臀筋", "四頭"], sub: ["ハム"] },
  "ブルガリアンスクワット": { main: ["臀筋", "四頭"], sub: ["ハム", "内転筋"] },
  "サイドランジ": { main: ["臀筋", "内転筋"], sub: ["四頭"] },
  "レッグカール": { main: ["ハム"], sub: [] },
  "ノルディックハムカール": { main: ["ハム"], sub: [] },
  "ルーマニアンデッドリフト": { main: ["ハム"], sub: ["臀筋", "脊柱起立筋"] },
  "スティッフレッグデッドリフト": { main: ["ハム"], sub: ["臀筋", "脊柱起立筋"] },
  "グッドモーニング": { main: ["ハム", "脊柱起立筋"], sub: ["臀筋"] },
  "ヒップスラスト": { main: ["臀筋"], sub: ["ハム", "四頭"] },
  "グルートブリッジ": { main: ["臀筋"], sub: ["ハム"] },
  "ヒップアブダクション": { main: ["臀筋"], sub: [] },
  "ケーブルキックバック": { main: ["臀筋"], sub: ["ハム"] },
  "カーフレイズ": { main: ["カーフ"], sub: [] },
  "スタンディングカーフレイズ": { main: ["カーフ"], sub: [] },
  "シーテッドカーフレイズ": { main: ["カーフ"], sub: [] },
  "シングルレッグカーフレイズ": { main: ["カーフ"], sub: [] },
  // ===== 腹筋 =====
  "クランチ": { main: ["腹直筋"], sub: [] },
  "シットアップ": { main: ["腹直筋"], sub: ["腹斜筋"] },
  "ケーブルクランチ": { main: ["腹直筋"], sub: [] },
  "レッグレイズ": { main: ["腹直筋"], sub: [] },
  "ハンギングレッグレイズ": { main: ["腹直筋"], sub: ["前腕"] },
  "プランク": { main: ["腹直筋", "腹斜筋"], sub: ["肩前部"] },
  "サイドプランク": { main: ["腹斜筋"], sub: [] },
  "アブローラー": { main: ["腹直筋"], sub: ["広背筋", "肩前部"] },
  "ロシアンツイスト": { main: ["腹斜筋"], sub: ["腹直筋"] },
  "バイシクルクランチ": { main: ["腹斜筋", "腹直筋"], sub: [] },
  "マウンテンクライマー": { main: ["腹直筋"], sub: ["肩前部", "四頭"] },
  "デッドバグ": { main: ["腹直筋"], sub: [] },
};
/* 未定義種目のフォールバック: 部位→ターゲット */
const PART_DEFAULT = {
  "胸": { main: ["胸上部", "胸下部"], sub: ["三頭"] },
  "背中": { main: ["広背筋"], sub: ["僧帽筋", "二頭"] },
  "肩": { main: ["肩中部"], sub: ["肩前部"] },
  "二頭": { main: ["二頭"], sub: ["前腕"] },
  "三頭": { main: ["三頭"], sub: [] },
  "前腕": { main: ["前腕"], sub: [] },
  "前もも": { main: ["四頭"], sub: ["臀筋"] },
  "もも裏": { main: ["ハム"], sub: ["臀筋"] },
  "お尻": { main: ["臀筋"], sub: ["ハム"] },
  "ふくらはぎ": { main: ["カーフ"], sub: [] },
  "腹筋": { main: ["腹直筋"], sub: ["腹斜筋"] },
  "その他": { main: [], sub: [] },
};
/* ベクター人体図(フォールバック)用: 細分→旧11部位 */
const FINE2COARSE = {
  "胸上部": "胸", "胸下部": "胸",
  "肩前部": "肩", "肩中部": "肩", "肩後部": "肩",
  "僧帽筋": "背中", "広背筋": "背中", "脊柱起立筋": "背中",
  "腹直筋": "腹筋", "腹斜筋": "腹筋",
  "四頭": "前もも", "内転筋": "前もも", "ハム": "もも裏",
  "臀筋": "お尻", "カーフ": "ふくらはぎ",
  "二頭": "二頭", "三頭": "三頭", "前腕": "前腕",
};
function muscleTargets(ex) {
  if (hasOwn(EX_MUSCLES, ex.name)) return EX_MUSCLES[ex.name];
  return PART_DEFAULT[ex.part] || { main: [], sub: [] };
}
function muscleNames(list) {
  const s = new Set(list);
  const out = [];
  if (s.has("胸上部") && s.has("胸下部")) { out.push("大胸筋"); s.delete("胸上部"); s.delete("胸下部"); }
  if (s.has("肩前部") && s.has("肩中部") && s.has("肩後部")) {
    out.push("三角筋"); ["肩前部", "肩中部", "肩後部"].forEach(k => s.delete(k));
  }
  s.forEach(k => out.push(MUSCLE_LABEL[k] || k));
  return out.join("・");
}

/* 実写風(エコルシェ)人体図 v4: radialGradient陰影 + 筋繊維 + 落ち影 */
const MUSCLE_FILL = { off: "url(#mOff)", sub: "url(#mSub)", main: "url(#mMain)" };
const MUSCLE_STRI = { off: "#7b4238", sub: "#b97709", main: "#a82523" };
function muscleBodySvg(view, mains, subs) {
  let out = MUSCLE_BASE;
  for (const p of MUSCLE_PIECES) {
    if (p.v !== view) continue;
    const state = p.part && mains.includes(p.part) ? "main"
      : (p.part && subs.includes(p.part) ? "sub" : "off");
    let el = p.el.split("__F__").join(MUSCLE_FILL[state]).split("__S__").join(MUSCLE_STRI[state]);
    if (state === "main") {
      el = `<g><animate attributeName="opacity" values="0.72;1;0.72" dur="1.4s" repeatCount="indefinite"/>${el}</g>`;
    }
    out += el;
  }
  out += MUSCLE_AO[view];
  return out;
}
/* 筋肉ピクセル精密マスクで「その筋肉の形のまま」発光させる */
function renderMuscleMapPhoto(mains, subs) {
  const body = view => {
    const masks = PHOTO_MASKS[view];
    const img = view === "f" ? "img/muscles_front_white.png" : "img/muscles_back_white.png";
    let divs = "";
    const add = (parts, cls) => parts.forEach(p => {
      if (!masks[p]) return;
      const u = `url('${masks[p]}')`;
      divs += `<div class="pm ${cls}" style="-webkit-mask-image:${u};mask-image:${u}"></div>`;
    });
    add(subs, "pm-sub");
    add(mains, "pm-main");
    return `<div class="photo-body"><img src="${img}" alt="${view === "f" ? "前面" : "背面"}">${divs}<span class="photo-tag">${view === "f" ? "前" : "後"}</span></div>`;
  };
  $("muscleMap").innerHTML = `<div class="photo-wrap">${body("f")}${body("b")}</div>`;
  $("muscleCredit").textContent = "図: OpenStax A&P (CC BY 4.0)・フォーム: wger.de / Everkinetic (CC BY-SA)";
  // 画像が読み込めない環境ではベクター解剖図にフォールバック
  $("muscleMap").querySelectorAll("img").forEach(im => {
    im.onerror = () => renderMuscleMapVector(mains, subs);
  });
}
function renderMuscleMapVector(mains, subs) {
  // ベクター図は旧11部位単位なので細分ターゲットを変換
  const conv = arr => [...new Set(arr.map(m => FINE2COARSE[m] || m))];
  mains = conv(mains);
  subs = conv(subs).filter(p => !mains.includes(p));
  const css = getComputedStyle(document.documentElement);
  const cMuted = css.getPropertyValue("--text-muted").trim();
  $("muscleMap").innerHTML =
    `<svg viewBox="0 0 130 100" aria-hidden="true">
      ${MUSCLE_DEFS}
      <g>${muscleBodySvg("f", mains, subs)}</g>
      <g transform="translate(70,0)">${muscleBodySvg("b", mains, subs)}</g>
      <text x="30" y="98" text-anchor="middle" font-size="7.5" fill="${cMuted}">前</text>
      <text x="100" y="98" text-anchor="middle" font-size="7.5" fill="${cMuted}">後</text>
    </svg>`;
}
function renderMuscleMap(ex) {
  const info = muscleTargets(ex);
  const mains = info.main || [], subs = (info.sub || []).filter(m => !info.main.includes(m));
  renderMuscleMapPhoto(mains, subs);
  const mainNames = muscleNames(mains) || "全身";
  const subNames = muscleNames(subs);
  $("muscleLabel").textContent = `🎯 メイン: ${mainNames}` + (subNames ? `　サブ: ${subNames}` : "");
}

/* ---------- 種目詳細サブページ ---------- */
let detailExId = null;
function openExDetail(id) {
  const ex = data.exercises.find(e => e.id === id);
  if (!ex) { toast("この種目は削除されています"); return; }
  detailExId = id;
  $("detailIcon").innerHTML = exIconSvg(ex);
  $("detailName").textContent = ex.name;
  $("detailSub").textContent = `${ex.part}・${ex.equip}`;
  renderDetailAnim(ex);
  renderMuscleMap(ex);
  $("detailMemo").value = ex.memo || "";
  const all = data.sets.filter(s => s.exId === id);
  if (all.length) {
    const best = all.reduce((m, s) => s.weight > m.weight ? s : m, all[0]);
    const e1rm = Math.max(...all.map(s => s.weight * (1 + s.reps / 30)));
    const today = todayStr();
    const prevDays = all.filter(s => s.date < today);
    let prevText = "–";
    if (prevDays.length) {
      const lastDate = prevDays.reduce((m, s) => s.date > m ? s.date : m, prevDays[0].date);
      const daySets = prevDays.filter(s => s.date === lastDate);
      const top = daySets.reduce((m, s) => s.weight > m.weight ? s : m, daySets[0]);
      prevText = `${fmtWeight(top.weight)}×${top.reps}`;
    }
    $("dBest").textContent = `${fmtWeight(best.weight)}×${best.reps}`;
    $("dE1rm").textContent = e1rm > 0 ? `${fmtNum(Math.round(e1rm * 10) / 10)}kg` : "–";
    $("dPrev").textContent = prevText;
    $("dSets").textContent = `${all.length}`;
    $("dVol").textContent = `${fmtNum(all.reduce((sum, s) => sum + s.weight * s.reps, 0))}kg`;
    $("dDays").textContent = `${new Set(all.map(s => s.date)).size}日`;
  } else {
    ["dBest", "dE1rm", "dPrev", "dSets", "dVol", "dDays"].forEach(k => { $(k).textContent = "–"; });
  }
  // 日別の記録一覧
  const hist = $("detailHistory");
  hist.innerHTML = "";
  if (!all.length) {
    hist.innerHTML = `<div class="history-empty">まだ記録がありません</div>`;
  } else {
    const byDate = {};
    all.forEach(s => { (byDate[s.date] = byDate[s.date] || []).push(s); });
    Object.keys(byDate).sort().reverse().forEach(date => {
      const daySets = byDate[date];
      const div = document.createElement("div");
      div.className = "day-ex";
      const nm = document.createElement("div");
      nm.className = "day-ex-name";
      const dayMax = Math.max(...daySets.map(s => s.weight));
      const dayRm = Math.max(...daySets.map(e1rmOf));
      nm.textContent = `${fmtDateLong(date)}　${daySets.length}セット・トップ${fmtWeight(dayMax)}` +
        (dayRm > 0 ? `・1RM ${fmtNum(dayRm)}kg` : "");
      div.appendChild(nm);
      const setsDiv = document.createElement("div");
      setsDiv.className = "day-ex-sets";
      daySets.forEach(s => {
        const pill = document.createElement("span");
        pill.className = "hist-set";
        pill.textContent = `${fmtWeight(s.weight)}×${s.reps}`;
        setsDiv.appendChild(pill);
      });
      div.appendChild(setsDiv);
      hist.appendChild(div);
    });
  }
  $("exDetailPage").hidden = false;
  renderDetailChart(all);
}
/* フォームアニメ: 実写イラスト(開始⇄終了のクロスフェード)、無い種目はピクトグラム */
function renderDetailAnim(ex) {
  const photos = (typeof EX_PHOTO !== "undefined" && hasOwn(EX_PHOTO, ex.name)) ? EX_PHOTO[ex.name] : null;
  if (!photos) {
    $("detailAnim").innerHTML = exIconAnim(ex);
    return;
  }
  const cls = photos.length > 1 ? "ap-pair" : "ap-single";
  const imgs = photos.map((src, i) => `<img src="${src}" class="ap${i}" alt="フォーム${i + 1}">`).join("");
  $("detailAnim").innerHTML = `<div class="anim-photo ${cls}">${imgs}</div>`;
  // 読み込み失敗時はピクトグラムにフォールバック
  $("detailAnim").querySelectorAll("img").forEach(im => {
    im.onerror = () => { $("detailAnim").innerHTML = exIconAnim(ex); };
  });
}

/* 詳細ページのミニグラフ（日別の最大重量、自重系は合計回数） */
function renderDetailChart(all) {
  const svg = $("detailChartSvg");
  svg.innerHTML = "";
  const byDate = {};
  all.forEach(s => { (byDate[s.date] = byDate[s.date] || []).push(s); });
  const useReps = all.length > 0 && all.every(s => s.weight === 0);
  $("detailChartTitle").textContent = useReps ? "推移（合計回数）" : "推移（最大重量）";
  const entries = Object.keys(byDate).sort().map(date => ({
    date,
    value: useReps
      ? byDate[date].reduce((sum, s) => sum + s.reps, 0)
      : Math.max(...byDate[date].map(s => s.weight)),
  }));
  $("detailChartEmpty").hidden = entries.length > 0;
  if (!entries.length) return;

  const wrap = svg.parentElement;
  const W = Math.max(200, wrap.clientWidth), H = 150;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const padL = 38, padR = 12, padT = 12, padB = 22;
  const iw = W - padL - padR, ih = H - padT - padB;
  const css = getComputedStyle(document.documentElement);
  const cGrid = css.getPropertyValue("--grid").trim();
  const cMuted = css.getPropertyValue("--text-muted").trim();
  const cSeries = css.getPropertyValue("--series-1").trim();
  const cSurface = css.getPropertyValue("--surface-1").trim();
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    return e;
  };
  const vals = entries.map(e => e.value);
  const padVal = (Math.max(...vals) - Math.min(...vals)) * 0.15 || Math.max(...vals) * 0.1 || 1;
  const { lo, hi, ticks } = niceTicks(Math.max(0, Math.min(...vals) - padVal), Math.max(...vals) + padVal, 3);
  const yScale = v => padT + ih - ((v - lo) / (hi - lo || 1)) * ih;
  const tMin = new Date(entries[0].date).getTime();
  const tMax = new Date(entries[entries.length - 1].date).getTime();
  const xScale = t => tMax === tMin ? padL + iw / 2 : padL + ((t - tMin) / (tMax - tMin)) * iw;
  ticks.forEach(t => {
    const y = yScale(t);
    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y, y2: y, stroke: cGrid, "stroke-width": 1 }));
    const txt = el("text", { x: padL - 6, y: y + 3.5, "text-anchor": "end", "font-size": 9, fill: cMuted });
    txt.textContent = fmtNum(t);
    svg.appendChild(txt);
  });
  const pts = entries.map(e => ({ x: xScale(new Date(e.date).getTime()), y: yScale(e.value) }));
  if (pts.length > 1) {
    const d2 = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    svg.appendChild(el("path", { d: `${d2} L${pts[pts.length - 1].x},${padT + ih} L${pts[0].x},${padT + ih} Z`, fill: cSeries, opacity: 0.08 }));
    svg.appendChild(el("path", { d: d2, fill: "none", stroke: cSeries, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }));
  }
  if (pts.length <= 24) {
    pts.forEach(p => svg.appendChild(el("circle", { cx: p.x, cy: p.y, r: 3.5, fill: cSeries, stroke: cSurface, "stroke-width": 2 })));
  }
  [0, entries.length - 1].forEach(i => {
    if (i === 0 && entries.length === 1) return;
    const txt = el("text", { x: pts[i].x, y: H - 6, "text-anchor": i === 0 ? "start" : "end", "font-size": 9, fill: cMuted });
    txt.textContent = fmtDateShort(entries[i].date);
    svg.appendChild(txt);
  });
  if (entries.length === 1) {
    const txt = el("text", { x: pts[0].x, y: H - 6, "text-anchor": "middle", "font-size": 9, fill: cMuted });
    txt.textContent = fmtDateShort(entries[0].date);
    svg.appendChild(txt);
  }
}
$("detailVideo").addEventListener("click", () => {
  const ex = data.exercises.find(e => e.id === detailExId);
  if (!ex) return;
  window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(ex.name + " やり方 フォーム"), "_blank");
});
$("detailClose").addEventListener("click", () => { $("exDetailPage").hidden = true; });
$("detailGoLog").addEventListener("click", () => {
  $("exDetailPage").hidden = true;
  showPage("log");
  selectExercise(detailExId);
});
$("detailGoChart").addEventListener("click", () => {
  $("exDetailPage").hidden = true;
  showPage("chart");
  if ([...$("chartExercise").options].some(o => o.value === detailExId)) {
    $("chartExercise").value = detailExId;
    renderChart();
  }
});
$("detailMemo").addEventListener("change", () => {
  const ex = data.exercises.find(e => e.id === detailExId);
  if (!ex) return;
  const v = $("detailMemo").value.trim();
  if (v) ex.memo = v;
  else delete ex.memo;
  saveData();
  toast("メモを保存しました");
});
$("selectedExHead").addEventListener("click", () => {
  if (selectedExId) openExDetail(selectedExId);
});

/* ---------- 種目検索サブページ ---------- */
let pickerPart = "すべて";
let pickerEquip = "すべて";

$("btnOpenPicker").addEventListener("click", () => {
  pickerPart = "すべて";
  pickerEquip = "すべて";
  $("pickerSearch").value = "";
  $("pickerPage").hidden = false;
  renderPicker();
});
$("pickerClose").addEventListener("click", () => { $("pickerPage").hidden = true; });
$("pickerSearch").addEventListener("input", renderPickerList);

function renderPicker() {
  renderPickerChips();
  renderPickerList();
}
function renderPickerChips() {
  const partWrap = $("pickerPartChips");
  partWrap.innerHTML = "";
  ["すべて", ...PARTS.filter(p => data.exercises.some(e => e.part === p))].forEach(p => {
    const b = document.createElement("button");
    b.className = "chip chip-sm" + (p === pickerPart ? " active" : "");
    b.textContent = p;
    b.addEventListener("click", () => { pickerPart = p; renderPicker(); });
    partWrap.appendChild(b);
  });
  const eqWrap = $("pickerEquipChips");
  eqWrap.innerHTML = "";
  ["すべて", ...EQUIPS.filter(q => data.exercises.some(e => e.equip === q))].forEach(q => {
    const b = document.createElement("button");
    b.className = "chip chip-sm" + (q === pickerEquip ? " active" : "");
    b.textContent = q;
    b.addEventListener("click", () => { pickerEquip = q; renderPicker(); });
    eqWrap.appendChild(b);
  });
}
function renderPickerList() {
  const q = $("pickerSearch").value.trim().toLowerCase();
  const list = data.exercises.filter(e =>
    (pickerPart === "すべて" || e.part === pickerPart) &&
    (pickerEquip === "すべて" || e.equip === pickerEquip) &&
    (!q || e.name.toLowerCase().includes(q)));
  const wrap = $("pickerList");
  wrap.innerHTML = "";
  if (!list.length) {
    wrap.innerHTML = `<div class="history-empty">見つかりませんでした</div>`;
    return;
  }
  list.forEach(ex => {
    const last = [...data.sets].reverse().find(s => s.exId === ex.id);
    const row = document.createElement("button");
    row.className = "picker-row";
    row.innerHTML = `<span class="pr-ico">${exIconSvg(ex)}</span><span class="pr-txt"><span class="pr-name"></span><span class="pr-sub"></span></span>`;
    const best = data.sets.filter(s => s.exId === ex.id).reduce((m, s) => Math.max(m, s.weight), 0);
    row.querySelector(".pr-name").textContent = ex.name;
    row.querySelector(".pr-sub").textContent =
      `${ex.part}・${ex.equip}` +
      (last ? `　前回 ${fmtWeight(last.weight)}×${last.reps}` : "") +
      (best > 0 ? `　ベスト ${best}kg` : "");
    row.addEventListener("click", () => {
      $("pickerPage").hidden = true;
      selectExercise(ex.id);
    });
    wrap.appendChild(row);
  });
}

/* 種目追加モーダル */
$("btnAddExercise").addEventListener("click", () => {
  $("newExName").value = "";
  $("modalBackdrop").hidden = false;
  $("newExName").focus();
});
$("btnModalCancel").addEventListener("click", () => { $("modalBackdrop").hidden = true; });
$("modalBackdrop").addEventListener("click", e => { if (e.target === $("modalBackdrop")) $("modalBackdrop").hidden = true; });
$("btnModalAdd").addEventListener("click", () => {
  const name = $("newExName").value.trim();
  if (!name) { toast("種目名を入力してください"); return; }
  if (data.exercises.some(e => e.name === name)) { toast("同じ名前の種目があります"); return; }
  const ex = { id: uid(), name, part: $("newExPart").value, equip: $("newExEquip").value };
  data.exercises.push(ex);
  saveData();
  $("modalBackdrop").hidden = true;
  renderSlotModeChips();
  slotReset(); slotInitStrips();
  selectExercise(ex.id);
});
PARTS.forEach(p => {
  const o = document.createElement("option");
  o.value = p; o.textContent = p;
  $("newExPart").appendChild(o);
});
EQUIPS.forEach(q => {
  const o = document.createElement("option");
  o.value = q; o.textContent = q;
  $("newExEquip").appendChild(o);
});

$("btnDeleteExercise").addEventListener("click", () => {
  const ex = data.exercises.find(e => e.id === selectedExId);
  if (!ex) return;
  const n = data.sets.filter(s => s.exId === ex.id).length;
  if (!confirm(`「${ex.name}」を削除しますか？\n記録${n}件も一緒に削除されます。`)) return;
  data.exercises = data.exercises.filter(e => e.id !== ex.id);
  data.sets = data.sets.filter(s => s.exId !== ex.id);
  // デフォルト種目の削除を記録（バージョンアップ時に復活させない）
  if (DEFAULT_EXERCISES.some(def => def.name === ex.name) && !data.removedDefaults.includes(ex.name)) {
    data.removedDefaults.push(ex.name);
  }
  selectedExId = null;
  $("setInputCard").hidden = true;
  saveData();
  renderTodayStats(); renderSlotModeChips();
  slotReset(); slotInitStrips();
});

$("autoTimerToggle").addEventListener("change", e => {
  data.settings.autoTimer = e.target.checked;
  saveData();
});

/* ---------- 履歴タブ ---------- */
function renderHistory() {
  const wrap = $("historyList");
  wrap.innerHTML = "";
  const byDate = {};
  data.sets.forEach(s => { (byDate[s.date] = byDate[s.date] || []).push(s); });
  const dates = Object.keys(byDate).sort().reverse();
  if (dates.length === 0) {
    wrap.innerHTML = `<div class="history-empty">まだ記録がありません。<br>「記録」タブから始めましょう！</div>`;
    return;
  }
  dates.forEach(date => {
    const sets = byDate[date];
    const vol = sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
    const card = document.createElement("div");
    card.className = "card day-card";
    const head = document.createElement("div");
    head.className = "day-head";
    head.innerHTML = `<span class="day-date"></span><span class="day-head-r"><span class="day-vol"></span><button class="btn-ghost day-add">＋追加</button></span>`;
    head.querySelector(".day-date").textContent = fmtDateLong(date);
    head.querySelector(".day-vol").textContent = `${sets.length}セット・${fmtNum(vol)}kg`;
    head.querySelector(".day-add").addEventListener("click", () => openSetEditor({ mode: "add", date }));
    card.appendChild(head);
    // セッション時間表示
    const tss = sets.map(s => s.ts).filter(Number.isFinite);
    const sess = data.sessions[date];
    if (tss.length && sess && sess.end) {
      const startTs = Math.min(...tss);
      const dur = sessionDurText(startTs, date, sess);
      const nextDay = sess.endDate && sess.endDate > date ? "翌" : "";
      const tdiv = document.createElement("div");
      tdiv.className = "day-time";
      tdiv.textContent = `🕐 ${fmtClock(startTs)} → ${nextDay}${sess.end}` + (dur ? `・${dur}` : "");
      card.appendChild(tdiv);
    }
    // 種目ごと
    const byEx = {};
    sets.forEach(s => { (byEx[s.exId] = byEx[s.exId] || []).push(s); });
    Object.entries(byEx).forEach(([exId, exSets]) => {
      const ex = data.exercises.find(e => e.id === exId);
      const div = document.createElement("div");
      div.className = "day-ex";
      const nm = document.createElement(ex ? "button" : "div");
      nm.className = "day-ex-name" + (ex ? " day-ex-link" : "");
      nm.textContent = ex ? ex.name + " ›" : "（削除済み種目）";
      if (ex) nm.addEventListener("click", () => openExDetail(ex.id));
      div.appendChild(nm);
      const setsDiv = document.createElement("div");
      setsDiv.className = "day-ex-sets";
      exSets.forEach(s => {
        const pill = document.createElement("span");
        pill.className = "hist-set";
        const label = document.createElement("button");
        label.className = "hist-set-edit";
        label.textContent = `${fmtWeight(s.weight)}×${s.reps}`;
        label.setAttribute("aria-label", "編集");
        label.addEventListener("click", () => openSetEditor({ mode: "edit", date, setId: s.id }));
        const del = document.createElement("button");
        del.textContent = "✕";
        del.setAttribute("aria-label", "削除");
        del.addEventListener("click", () => {
          if (!confirm(`${fmtWeight(s.weight)}×${s.reps} を削除しますか？`)) return;
          data.sets = data.sets.filter(x => x.id !== s.id);
          saveData(); renderHistory(); renderTodayStats(); renderTodaySets();
        });
        pill.appendChild(label); pill.appendChild(del);
        setsDiv.appendChild(pill);
      });
      div.appendChild(setsDiv);
      card.appendChild(div);
    });
    wrap.appendChild(card);
  });
}

/* ---------- 過去記録の追加・編集 ---------- */
let editSetState = null; // {mode:"add"|"edit", date, setId}
function openSetEditor(opts) {
  editSetState = opts;
  $("editSetTitle").textContent = opts.mode === "add" ? "セットを追加" : "セットを編集";
  const dateFixed = !!opts.date;
  $("editSetDate").textContent = dateFixed ? fmtDateLong(opts.date) : "";
  $("editSetDateLabel").hidden = dateFixed;
  if (!dateFixed) $("editSetDateInput").value = todayStr();
  const sel = $("editSetEx");
  sel.innerHTML = "";
  data.exercises.forEach(e => {
    const o = document.createElement("option");
    o.value = e.id;
    o.textContent = `${e.name}（${e.part}）`;
    sel.appendChild(o);
  });
  if (opts.mode === "edit") {
    const s = data.sets.find(x => x.id === opts.setId);
    if (!s) return;
    sel.value = s.exId;
    $("editSetWeight").value = s.weight;
    $("editSetReps").value = s.reps;
  } else {
    $("editSetWeight").value = 20;
    $("editSetReps").value = 10;
  }
  $("editSetBackdrop").hidden = false;
}
$("editSetCancel").addEventListener("click", () => { $("editSetBackdrop").hidden = true; });
$("editSetBackdrop").addEventListener("click", e => { if (e.target === $("editSetBackdrop")) $("editSetBackdrop").hidden = true; });
$("editSetSave").addEventListener("click", () => {
  if (!editSetState) return;
  const exId = $("editSetEx").value;
  if (!exId) { toast("種目を選んでください"); return; }
  const weight = Math.max(0, parseFloat($("editSetWeight").value) || 0);
  const reps = Math.max(1, Math.round(parseFloat($("editSetReps").value) || 1));
  if (editSetState.mode === "edit") {
    const s = data.sets.find(x => x.id === editSetState.setId);
    if (s) { s.exId = exId; s.weight = weight; s.reps = reps; }
  } else {
    const date = editSetState.date || $("editSetDateInput").value;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { toast("日付を選んでください"); return; }
    // 過去日は正午のタイムスタンプ、今日は現在時刻
    const [y, m, d] = date.split("-").map(Number);
    const ts = date === todayStr() ? Date.now() : new Date(y, m - 1, d, 12, 0).getTime();
    data.sets.push({ id: uid(), exId, date, ts, weight, reps });
  }
  saveData();
  $("editSetBackdrop").hidden = true;
  renderHistory();
  renderTodayStats();
  renderTodaySets();
  toast(editSetState.mode === "add" ? "追加しました" : "更新しました");
});

$("btnAddPast").addEventListener("click", () => openSetEditor({ mode: "add", date: null }));

/* データ管理 */
$("btnExport").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `kintore_backup_${todayStr().replace(/-/g, "")}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast("エクスポートしました");
});
$("btnImport").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const d = JSON.parse(reader.result);
      if (!d || !Array.isArray(d.exercises) || !Array.isArray(d.sets)) throw new Error("bad format");
      if (!d.exercises.every(isValidExercise) || !d.sets.every(isValidSet)) throw new Error("bad element");
      if (!confirm(`インポートすると現在のデータは上書きされます。\n(種目${d.exercises.length}件・セット${d.sets.length}件)\nよろしいですか？`)) return;
      d.settings = sanitizeSettings(d.settings);
      d.removedDefaults = Array.isArray(d.removedDefaults) ? d.removedDefaults : [];
      d.sessions = sanitizeSessions(d.sessions);
      data = d;
      saveData();
      selectedExId = null;
      $("setInputCard").hidden = true;
      initUI();
      toast("インポートしました");
    } catch (err) {
      toast("ファイルを読み込めませんでした");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});
$("btnWipe").addEventListener("click", () => {
  if (!confirm("全データを削除しますか？この操作は取り消せません。")) return;
  if (!confirm("本当に削除しますか？")) return;
  localStorage.removeItem(STORAGE_KEY);
  data = loadData();
  selectedExId = null;
  $("setInputCard").hidden = true;
  initUI();
  toast("削除しました");
});

/* ---------- グラフタブ ---------- */
const METRIC_INFO = {
  max:    { label: "最大重量", unit: "kg", fn: sets => Math.max(...sets.map(s => s.weight)) },
  volume: { label: "ボリューム", unit: "kg", fn: sets => sets.reduce((sum, s) => sum + s.weight * s.reps, 0) },
  e1rm:   { label: "推定1RM", unit: "kg", fn: sets => Math.max(...sets.map(s => s.weight * (1 + s.reps / 30))) },
  reps:   { label: "回数", unit: "回", fn: sets => sets.reduce((sum, s) => sum + s.reps, 0) },
};

function populateChartSelect() {
  const sel = $("chartExercise");
  const prev = sel.value;
  sel.innerHTML = "";
  const withData = data.exercises.filter(e => data.sets.some(s => s.exId === e.id));
  const list = withData.length ? withData : data.exercises;
  list.forEach(e => {
    const o = document.createElement("option");
    o.value = e.id; o.textContent = e.name;
    sel.appendChild(o);
  });
  if (prev && list.some(e => e.id === prev)) sel.value = prev;
  else if (selectedExId && list.some(e => e.id === selectedExId)) sel.value = selectedExId;
}
$("chartExercise").addEventListener("change", renderChart);
document.querySelectorAll("#metricSeg .seg-btn").forEach(b => {
  b.addEventListener("click", () => {
    chartMetric = b.dataset.metric;
    document.querySelectorAll("#metricSeg .seg-btn").forEach(x => x.classList.toggle("active", x === b));
    renderChart();
  });
});
document.querySelectorAll("#rangeChips .chip").forEach(b => {
  b.addEventListener("click", () => {
    chartRange = parseInt(b.dataset.range, 10);
    document.querySelectorAll("#rangeChips .chip").forEach(x => x.classList.toggle("active", x === b));
    renderChart();
  });
});

function niceTicks(min, max, count = 4) {
  if (min === max) { min = Math.max(0, min - 1); max = max + 1; }
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  let step = mag;
  for (const m of [1, 2, 2.5, 5, 10]) { if (step0 <= m * mag) { step = m * mag; break; } }
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step * 0.001; v += step) ticks.push(Math.round(v * 100) / 100);
  return { lo, hi, ticks };
}

let chartPoints = []; // ツールチップ用 [{x,y,date,value}]

function renderChart() {
  const svg = $("chartSvg");
  const wrap = $("chartWrap");
  const tooltip = $("chartTooltip");
  tooltip.hidden = true;
  svg.innerHTML = "";
  chartPoints = [];

  const exId = $("chartExercise").value;
  const info = METRIC_INFO[chartMetric];
  const ex = data.exercises.find(e => e.id === exId);

  // 日別集計
  const byDate = {};
  data.sets.filter(s => s.exId === exId).forEach(s => { (byDate[s.date] = byDate[s.date] || []).push(s); });
  let entries = Object.entries(byDate)
    .map(([date, sets]) => ({ date, value: info.fn(sets) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (chartRange > 0) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - chartRange);
    const cutStr = todayStr(cutoff);
    entries = entries.filter(e => e.date >= cutStr);
  }

  // 統計タイル
  const allEntries = Object.entries(byDate).map(([date, sets]) => ({ date, value: info.fn(sets) }));
  if (allEntries.length) {
    const best = Math.max(...allEntries.map(e => e.value));
    const last = allEntries.sort((a, b) => a.date.localeCompare(b.date))[allEntries.length - 1];
    $("chartBest").textContent = `${fmtNum(best)}${info.unit}`;
    $("chartLast").textContent = `${fmtNum(last.value)}${info.unit}`;
    $("chartDays").textContent = `${allEntries.length}日`;
  } else {
    $("chartBest").textContent = "–";
    $("chartLast").textContent = "–";
    $("chartDays").textContent = "–";
  }

  $("chartEmpty").hidden = entries.length > 0;
  if (entries.length === 0) return;

  const W = wrap.clientWidth, H = wrap.clientHeight;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const padL = 44, padR = 14, padT = 14, padB = 26;
  const iw = W - padL - padR, ih = H - padT - padB;

  const css = getComputedStyle(document.documentElement);
  const cGrid = css.getPropertyValue("--grid").trim();
  const cBase = css.getPropertyValue("--baseline").trim();
  const cMuted = css.getPropertyValue("--text-muted").trim();
  const cSeries = css.getPropertyValue("--series-1").trim();
  const cSurface = css.getPropertyValue("--surface-1").trim();

  const vals = entries.map(e => e.value);
  const yMinRaw = Math.min(...vals), yMaxRaw = Math.max(...vals);
  // 0起点は棒グラフの掟。折れ線は変化を見せるため下限を少し下げる
  const padVal = (yMaxRaw - yMinRaw) * 0.15 || yMaxRaw * 0.1 || 1;
  const { lo, hi, ticks } = niceTicks(Math.max(0, yMinRaw - padVal), yMaxRaw + padVal);
  const yScale = v => padT + ih - ((v - lo) / (hi - lo || 1)) * ih;

  const tMin = new Date(entries[0].date).getTime();
  const tMax = new Date(entries[entries.length - 1].date).getTime();
  const xScale = t => tMax === tMin ? padL + iw / 2 : padL + ((t - tMin) / (tMax - tMin)) * iw;

  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    return e;
  };

  // 横グリッド + Y軸ラベル（控えめに）
  ticks.forEach(t => {
    const y = yScale(t);
    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y, y2: y, stroke: cGrid, "stroke-width": 1 }));
    const txt = el("text", { x: padL - 7, y: y + 4, "text-anchor": "end", "font-size": 10, fill: cMuted });
    txt.textContent = fmtNum(t);
    svg.appendChild(txt);
  });
  // ベースライン
  svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: padT + ih, y2: padT + ih, stroke: cBase, "stroke-width": 1 }));

  // X軸ラベル（最大4つ）
  const labelCount = Math.min(4, entries.length);
  const labelIdx = new Set();
  for (let i = 0; i < labelCount; i++) labelIdx.add(Math.round(i * (entries.length - 1) / Math.max(1, labelCount - 1)));
  entries.forEach((e, i) => {
    if (!labelIdx.has(i)) return;
    const x = xScale(new Date(e.date).getTime());
    const txt = el("text", { x, y: H - 8, "text-anchor": "middle", "font-size": 10, fill: cMuted });
    txt.textContent = fmtDateShort(e.date);
    svg.appendChild(txt);
  });

  // データポイント座標
  chartPoints = entries.map(e => ({
    x: xScale(new Date(e.date).getTime()),
    y: yScale(e.value),
    date: e.date,
    value: e.value,
  }));

  // エリア（うっすら）+ ライン 2px
  if (chartPoints.length > 1) {
    const lineD = chartPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const areaD = `${lineD} L${chartPoints[chartPoints.length - 1].x},${padT + ih} L${chartPoints[0].x},${padT + ih} Z`;
    const area = el("path", { d: areaD, fill: cSeries, opacity: 0.08 });
    svg.appendChild(area);
    svg.appendChild(el("path", { d: lineD, fill: "none", stroke: cSeries, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }));
  }
  // ドット（点数が少ないときは常時表示、多いときはホバーのみ）
  const showDots = chartPoints.length <= 20;
  if (showDots) {
    chartPoints.forEach(p => {
      svg.appendChild(el("circle", { cx: p.x, cy: p.y, r: 4, fill: cSeries, stroke: cSurface, "stroke-width": 2 }));
    });
  }

  // クロスヘア用要素
  const cross = el("line", { x1: 0, x2: 0, y1: padT, y2: padT + ih, stroke: cBase, "stroke-width": 1, "stroke-dasharray": "3 3", visibility: "hidden" });
  const hoverDot = el("circle", { r: 6, fill: cSeries, stroke: cSurface, "stroke-width": 2, visibility: "hidden" });
  svg.appendChild(cross);
  svg.appendChild(hoverDot);

  function onMove(clientX) {
    const rect = svg.getBoundingClientRect();
    const mx = (clientX - rect.left) * (W / rect.width);
    let nearest = chartPoints[0], bd = Infinity;
    chartPoints.forEach(p => { const d = Math.abs(p.x - mx); if (d < bd) { bd = d; nearest = p; } });
    cross.setAttribute("x1", nearest.x); cross.setAttribute("x2", nearest.x);
    cross.setAttribute("visibility", "visible");
    hoverDot.setAttribute("cx", nearest.x); hoverDot.setAttribute("cy", nearest.y);
    hoverDot.setAttribute("visibility", "visible");
    tooltip.innerHTML = `<div class="tt-date"></div><div class="tt-val"></div>`;
    tooltip.querySelector(".tt-date").textContent = fmtDateLong(nearest.date);
    tooltip.querySelector(".tt-val").textContent = `${info.label} ${fmtNum(nearest.value)}${info.unit}`;
    tooltip.hidden = false;
    const scaleBack = rect.width / W;
    let tx = nearest.x * scaleBack + 12;
    const ttW = tooltip.offsetWidth;
    if (tx + ttW > rect.width - 4) tx = nearest.x * scaleBack - ttW - 12;
    tooltip.style.left = `${tx}px`;
    tooltip.style.top = `${Math.max(2, nearest.y * (rect.height / H) - 44)}px`;
  }
  svg.onpointermove = e => onMove(e.clientX);
  svg.onpointerdown = e => onMove(e.clientX);
  svg.onpointerleave = () => {
    cross.setAttribute("visibility", "hidden");
    hoverDot.setAttribute("visibility", "hidden");
    tooltip.hidden = true;
  };
}
window.addEventListener("resize", () => { if (activePage === "chart") renderChart(); });

/* ---------- タイマー ---------- */
const RING_C = 2 * Math.PI * 104; // = 653.45
let timerTotal = 90;      // 設定秒数
let timerRemain = 90;     // 残り秒数
let timerEnd = null;      // 実行中: 終了時刻(ms)
let timerInterval = null;

function fmtTime(sec) {
  sec = Math.max(0, Math.ceil(sec));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}
function updateTimerUI() {
  $("timerDisplay").textContent = fmtTime(timerRemain);
  const frac = timerTotal > 0 ? timerRemain / timerTotal : 0;
  $("ringFg").style.strokeDashoffset = RING_C * (1 - Math.max(0, Math.min(1, frac)));
  $("btnTimerStart").textContent = timerEnd ? "一時停止" : (timerRemain < timerTotal && timerRemain > 0 ? "再開" : "スタート");
  $("timerSub").textContent = timerEnd ? "休憩中…" : "休憩タイマー";
  $("btnQuickRest").textContent = timerEnd ? `⏸ 休憩中 ${fmtTime(timerRemain)}` : `▶ 休憩タイマー ${fmtTime(timerTotal)}`;
  updateTimerPill();
}
function updateTimerPill() {
  const show = timerEnd !== null && activePage !== "timer";
  $("timerPill").hidden = !show;
  if (show) $("timerPillTime").textContent = fmtTime(timerRemain);
}
function startTimer(sec) {
  if (sec !== undefined) { timerTotal = sec; timerRemain = sec; }
  if (timerRemain <= 0) timerRemain = timerTotal;
  timerEnd = Date.now() + timerRemain * 1000;
  clearInterval(timerInterval);
  timerInterval = setInterval(tick, 250);
  ensureAudio();
  ensureNotifyPermission();
  updateTimerUI();
}
function pauseTimer() {
  if (!timerEnd) return;
  timerRemain = Math.max(0, (timerEnd - Date.now()) / 1000);
  timerEnd = null;
  clearInterval(timerInterval);
  updateTimerUI();
}
function resetTimer() {
  timerEnd = null;
  clearInterval(timerInterval);
  timerRemain = timerTotal;
  updateTimerUI();
}
function tick() {
  if (!timerEnd) return;
  timerRemain = Math.max(0, (timerEnd - Date.now()) / 1000);
  if (timerRemain <= 0) {
    timerEnd = null;
    clearInterval(timerInterval);
    timerRemain = 0;
    timerDone();
  }
  updateTimerUI();
}
function timerDone() {
  if (data.settings.sound) beep();
  if (navigator.vibrate) navigator.vibrate([300, 120, 300, 120, 500]);
  toast("休憩終了！次のセット 💪");
  sendRestNotification();
  timerRemain = timerTotal;
  updateTimerUI();
}

/* ---------- 通知 ---------- */
function notifySupported() { return "Notification" in window; }
function ensureNotifyPermission() {
  if (!data.settings.notify || !notifySupported()) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => { /* 無視 */ });
  }
}
function sendRestNotification() {
  if (!data.settings.notify || !notifySupported() || Notification.permission !== "granted") return;
  const opts = {
    body: "休憩終了！次のセットを始めよう 💪",
    tag: "kintore-rest",
    renotify: true,
    vibrate: [300, 120, 300],
    icon: "icon-192.png",
    badge: "icon-192.png",
  };
  if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg && reg.showNotification) reg.showNotification("筋トレログ", opts);
      else new Notification("筋トレログ", opts);
    }).catch(() => { try { new Notification("筋トレログ", opts); } catch (e) { /* 非対応 */ } });
  } else {
    try { new Notification("筋トレログ", opts); } catch (e) { /* 非対応 */ }
  }
}
/* バックグラウンドから戻ったとき即座に追いつく */
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && timerEnd) tick();
});

/* サウンド (WebAudio) */
let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* 非対応 */ }
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}
function beep() {
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime;
  [0, 0.35, 0.7].forEach((dt, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = i === 2 ? 1320 : 880;
    gain.gain.setValueAtTime(0.001, t0 + dt);
    gain.gain.exponentialRampToValueAtTime(0.35, t0 + dt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dt + 0.28);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0 + dt);
    osc.stop(t0 + dt + 0.3);
  });
}

$("btnTimerStart").addEventListener("click", () => {
  if (timerEnd) pauseTimer();
  else startTimer();
});
$("btnQuickRest").addEventListener("click", () => {
  if (timerEnd) pauseTimer();       // 実行中なら一時停止
  else startTimer(timerTotal);      // 設定時間でそのままスタート
});
$("btnRestMinus").addEventListener("click", () => adjustTimer(-10));
$("btnRestPlus").addEventListener("click", () => adjustTimer(10));
$("btnTimerReset").addEventListener("click", resetTimer);
$("btnMinus10").addEventListener("click", () => adjustTimer(-10));
$("btnPlus10").addEventListener("click", () => adjustTimer(10));
function adjustTimer(dsec) {
  if (timerEnd) {
    // 実行中: 残り時間だけをその場で調整
    timerEnd += dsec * 1000;
    if (timerEnd < Date.now()) timerEnd = Date.now() + 1000;
    timerRemain = Math.max(0, (timerEnd - Date.now()) / 1000);
  } else {
    // 停止中: デフォルトの休憩時間を10秒単位で変更して保存
    timerTotal = Math.max(10, timerTotal + dsec);
    timerRemain = timerTotal;
    data.settings.timerSec = timerTotal;
    saveData();
  }
  updatePresetChips();
  updateTimerUI();
}
function updatePresetChips() {
  document.querySelectorAll("#timerPresets .chip").forEach(b => {
    b.classList.toggle("active", parseInt(b.dataset.sec, 10) === timerTotal);
  });
}
document.querySelectorAll("#timerPresets .chip").forEach(b => {
  b.addEventListener("click", () => {
    timerTotal = parseInt(b.dataset.sec, 10);
    data.settings.timerSec = timerTotal;
    saveData();
    updatePresetChips();
    if (timerEnd) startTimer(timerTotal);
    else { timerRemain = timerTotal; updateTimerUI(); }
  });
});
$("soundToggle").addEventListener("change", e => {
  data.settings.sound = e.target.checked;
  saveData();
  if (e.target.checked) ensureAudio();
});
$("notifyToggle").addEventListener("change", e => {
  data.settings.notify = e.target.checked;
  saveData();
  if (e.target.checked) {
    if (!notifySupported()) {
      toast("この環境は通知に対応していません");
    } else if (Notification.permission === "denied") {
      toast("ブラウザ設定で通知が拒否されています");
    } else {
      ensureNotifyPermission();
    }
  }
});
$("timerPill").addEventListener("click", () => showPage("timer"));

/* ---------- おまかせスロット ---------- */
const REEL_PARTS = [["胸", "肩", "三頭"], ["背中", "二頭", "前腕"], ["前もも", "もも裏", "お尻", "ふくらはぎ", "腹筋"]];
const SLOT_MODES = [
  { label: "全身", parts: null },
  { label: "胸", parts: ["胸"] },
  { label: "背中", parts: ["背中"] },
  { label: "肩", parts: ["肩"] },
  { label: "腕", parts: ["二頭", "三頭", "前腕"] },
  { label: "脚", parts: ["前もも", "もも裏", "お尻", "ふくらはぎ"] },
  { label: "腹筋", parts: ["腹筋"] },
];
const REEL_H = 92;
const slotState = { reels: [], running: false, hasSpun: false, stoppedCount: 0, raf: null, lastT: 0, autoTimers: [] };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let slotMode = "全身"; // "全身" または部位名

function buildPools() {
  if (slotMode !== "全身") {
    const mode = SLOT_MODES.find(m => m.label === slotMode);
    const pool = mode && mode.parts ? data.exercises.filter(e => mode.parts.includes(e.part)) : [];
    const p = pool.length ? pool : data.exercises;
    return [p, p, p];
  }
  return REEL_PARTS.map(parts => {
    const pool = data.exercises.filter(e => parts.includes(e.part));
    return pool.length ? pool : data.exercises;
  });
}
function renderSlotModeChips() {
  const wrap = $("slotModeChips");
  wrap.innerHTML = "";
  const avail = SLOT_MODES.filter(m => !m.parts || data.exercises.some(e => m.parts.includes(e.part)));
  if (!avail.some(m => m.label === slotMode)) slotMode = "全身";
  avail.forEach(m => {
    const b = document.createElement("button");
    b.className = "chip" + (m.label === slotMode ? " active" : "");
    b.textContent = m.label;
    b.addEventListener("click", () => {
      if (slotState.running) return; // 回転中は変更不可
      slotMode = m.label;
      data.settings.slotMode = m.label;
      saveData();
      renderSlotModeChips();
      updateReelTags();
      $("slotResult").hidden = true;
      $("slotLamp").classList.remove("lit");
      slotState.hasSpun = false;
      slotInitStrips();
      $("slotHint").textContent = m.label === "全身"
        ? "迷った日はスロットにおまかせ！レバーを引いて3種目を決めよう"
        : `今日は${m.label}の日！レバーを引いて${m.label}の3種目を決めよう`;
    });
    wrap.appendChild(b);
  });
}
function updateReelTags() {
  const tags = document.querySelectorAll("#reelTags span");
  const labels = slotMode === "全身" ? ["押す系", "引く系", "脚・体幹"] : ["1種目め", "2種目め", "3種目め"];
  tags.forEach((t, i) => { t.textContent = labels[i] || ""; });
}
function choosePicks(pools) {
  const picked = [];
  pools.forEach(pool => {
    let cand = pool.filter(e => !picked.includes(e));
    if (cand.length === 0) cand = data.exercises.filter(e => !picked.includes(e));
    if (cand.length === 0) cand = pool;
    picked.push(cand[Math.floor(Math.random() * cand.length)]);
  });
  return picked;
}
function renderStrip(el, cycle) {
  el.innerHTML = cycle.map(ex => `<div class="reel-item">${exIconSvg(ex)}<span></span></div>`).join("").repeat(3);
  el.querySelectorAll(".reel-item span").forEach((s, idx) => {
    s.textContent = cycle[idx % cycle.length].name;
  });
}
function slotInitStrips() {
  buildPools().forEach((pool, i) => {
    const el = $("reelStrip" + i);
    if (pool.length) { renderStrip(el, shuffle(pool)); }
    else { el.innerHTML = ""; }
    el.style.transform = "translateY(0)";
  });
}
/* 種目データが変わったらスロットを初期状態に戻す */
function slotReset() {
  cancelAnimationFrame(slotState.raf);
  slotState.autoTimers.forEach(clearTimeout);
  slotState.autoTimers = [];
  slotState.reels = [];
  slotState.running = false;
  slotState.hasSpun = false;
  slotState.stoppedCount = 0;
  $("slotResult").hidden = true;
  $("slotLamp").classList.remove("lit");
  $("btnLever").disabled = false;
  document.querySelectorAll(".stop-btn").forEach(b => { b.disabled = true; });
  document.querySelectorAll(".reel-strip").forEach(el => el.classList.remove("blur"));
}
function slotSpin() {
  if (slotState.running) return;
  if (data.exercises.length < 3) { toast("種目が3つ以上必要です"); return; }
  ensureAudio();
  leverSound();
  $("slotResult").hidden = true;
  $("slotLamp").classList.remove("lit");
  const pools = buildPools();
  const picks = choosePicks(pools);
  slotState.running = true;
  slotState.hasSpun = true;
  slotState.stoppedCount = 0;
  slotState.reels = pools.map((pool, i) => {
    let cycle = shuffle(pool);
    if (!cycle.some(e => e.id === picks[i].id)) cycle.push(picks[i]);
    while (cycle.length < 4) cycle = cycle.concat(cycle);
    const el = $("reelStrip" + i);
    renderStrip(el, cycle);
    el.classList.add("blur");
    return { cycle, pos: 0, speed: 700 + i * 70, mode: "spin", target: picks[i], landed: null, el };
  });
  document.querySelectorAll(".stop-btn").forEach(b => { b.disabled = false; });
  $("btnLever").disabled = true;
  $("slotHint").textContent = "STOPボタンでリールを止めよう！";
  slotState.autoTimers.forEach(clearTimeout);
  slotState.autoTimers = [0, 1, 2].map(i => setTimeout(() => stopReel(i), 4200 + i * 900));
  slotState.lastT = performance.now();
  cancelAnimationFrame(slotState.raf);
  slotState.raf = requestAnimationFrame(slotTick);
}
function stopReel(i) {
  const r = slotState.reels[i];
  if (!r || r.mode !== "spin") return;
  clearTimeout(slotState.autoTimers[i]);
  const btn = document.querySelector(`.stop-btn[data-reel="${i}"]`);
  if (btn) btn.disabled = true;
  const len = r.cycle.length;
  let k = Math.ceil(r.pos / REEL_H) + 2;
  for (let j = k; j < k + len; j++) {
    if (r.cycle[j % len].id === r.target.id) { k = j; break; }
  }
  r.landed = r.cycle[k % len];
  r.mode = "stopping";
  r.p0 = r.pos;
  r.targetPos = k * REEL_H;
  r.t0 = performance.now();
  r.dur = Math.min(900, 400 + (r.targetPos - r.p0) * 0.6);
}
function slotTick(now) {
  const dt = Math.min(0.05, (now - slotState.lastT) / 1000);
  slotState.lastT = now;
  let anyActive = false;
  slotState.reels.forEach(r => {
    const cycleH = r.cycle.length * REEL_H;
    if (r.mode === "spin") {
      r.pos += r.speed * dt;
      anyActive = true;
    } else if (r.mode === "stopping") {
      const t = Math.min(1, (now - r.t0) / r.dur);
      const ease = 1 - Math.pow(1 - t, 3);
      r.pos = r.p0 + (r.targetPos - r.p0) * ease;
      if (t >= 1) {
        r.pos = r.targetPos;
        r.mode = "stopped";
        r.el.classList.remove("blur");
        stopSound();
        if (navigator.vibrate) navigator.vibrate(40);
        slotState.stoppedCount++;
        if (slotState.stoppedCount === 3) slotFinish();
      } else {
        anyActive = true;
      }
    }
    r.el.style.transform = `translateY(${-(r.pos % cycleH)}px)`;
  });
  if (anyActive) slotState.raf = requestAnimationFrame(slotTick);
}
function slotFinish() {
  slotState.running = false;
  $("btnLever").disabled = false;
  document.querySelectorAll(".stop-btn").forEach(b => { b.disabled = true; });
  $("slotLamp").classList.add("lit");
  $("slotHint").textContent = "メニュー決定！今日もGOGO！";
  winSound();
  if (navigator.vibrate) navigator.vibrate([80, 60, 80, 60, 220]);
  renderSlotResult(slotState.reels.map(r => r.landed || r.target));
}
function renderSlotResult(picks) {
  const list = $("slotResultList");
  list.innerHTML = "";
  picks.forEach(ex => {
    const last = [...data.sets].reverse().find(s => s.exId === ex.id);
    const row = document.createElement("div");
    row.className = "slot-result-row";
    row.innerHTML = `<span class="sr-ico">${exIconSvg(ex)}</span><span class="sr-txt"><span class="sr-name"></span><span class="sr-prev"></span></span><button class="sr-go">記録へ</button>`;
    row.querySelector(".sr-name").textContent = ex.name;
    row.querySelector(".sr-prev").textContent = last ? `前回: ${fmtWeight(last.weight)}×${last.reps}回` : "はじめての種目！";
    row.querySelector(".sr-go").addEventListener("click", () => { selectExercise(ex.id); showPage("log"); });
    list.appendChild(row);
  });
  $("slotResult").hidden = false;
}

/* スロット効果音 */
function toneAt(freq, delay, dur = 0.08, type = "square", vol = 0.2) {
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(g).connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}
function leverSound() { if (data.settings.sound) toneAt(180, 0, 0.09, "square", 0.15); }
function stopSound() { if (data.settings.sound) toneAt(660, 0, 0.05, "square", 0.15); }
function winSound() { if (data.settings.sound) [523, 659, 784, 1047].forEach((f, i) => toneAt(f, i * 0.12, 0.14, "sine", 0.25)); }

$("btnLever").addEventListener("click", slotSpin);
$("btnRespin").addEventListener("click", slotSpin);
document.querySelectorAll(".stop-btn").forEach(b => {
  b.addEventListener("click", () => stopReel(parseInt(b.dataset.reel, 10)));
});
$("goSlot").addEventListener("click", () => showPage("slot"));

/* ---------- トースト ---------- */
let toastTimeout = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => { t.hidden = true; }, 300);
  }, 2200);
}

/* ---------- 初期化 ---------- */
function initUI() {
  const now = new Date();
  $("headerDate").textContent = `${now.getMonth() + 1}月${now.getDate()}日(${"日月火水木金土"[now.getDay()]})`;
  $("autoTimerToggle").checked = data.settings.autoTimer;
  $("soundToggle").checked = data.settings.sound;
  $("notifyToggle").checked = data.settings.notify;
  // iOSの通常Safari等、通知非対応環境ではヒントを表示
  $("notifyHint").hidden = notifySupported();
  timerTotal = data.settings.timerSec || 90;
  timerRemain = timerTotal;
  updatePresetChips();
  slotMode = data.settings.slotMode || "全身";
  renderTodayStats();
  renderTodaySets();
  renderHistory();
  updateTimerUI();
  slotReset();
  renderSlotModeChips();
  updateReelTags();
  slotInitStrips();
}
/* デモモード (?demo=1): サンプル記録をメモリ上だけに読み込む。保存はしない */
function loadDemoData() {
  const byName = n => data.exercises.find(e => e.name === n);
  const plan = [
    { name: "ベンチプレス", base: 52.5, reps: [10, 8, 8], step: 2.5 },
    { name: "ラットプルダウン", base: 45, reps: [12, 10, 10], step: 2.5 },
    { name: "スクワット", base: 70, reps: [10, 8, 6], step: 5 },
    { name: "ショルダープレス", base: 25, reps: [12, 10, 10], step: 2.5 },
    { name: "ダンベルカール", base: 12, reps: [12, 12, 10], step: 1 },
  ];
  const today = new Date();
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let w = 7; w >= 0; w--) {
    for (const dow of [0, 3, 5]) {
      const d = new Date(today);
      d.setDate(d.getDate() - (w * 7 + dow));
      if (d > today) continue;
      const ds = todayStr(d);
      const picks = plan.filter(() => rnd() > 0.35).slice(0, 3);
      (picks.length ? picks : [plan[0]]).forEach(p => {
        const ex = byName(p.name);
        if (!ex) return;
        const w8 = p.base + Math.round((7 - w) * 0.6) * p.step;
        p.reps.forEach((r, i) => {
          const ts = new Date(d); ts.setHours(19, 10 + i * 4, 0);
          data.sets.push({ id: uid(), exId: ex.id, date: ds, ts: ts.getTime(), weight: w8, reps: r });
        });
      });
      data.sessions[ds] = { end: "20:25", endDate: ds };
    }
  }
}
{
  const q = new URLSearchParams(location.search);
  if (q.get("demo") === "1") {
    loadDemoData();
    saveData = function () { /* デモ中は保存しない */ };
    initUI();
  }
  const t = q.get("tab");
  if (t && Object.prototype.hasOwnProperty.call(pages, t)) showPage(t);
  const dn = q.get("detail");
  if (dn) {
    const ex = data.exercises.find(e => e.name === dn);
    if (ex) { selectExercise(ex.id); openExDetail(ex.id); }
  }
  if (q.get("picker") === "1") $("btnOpenPicker").click();
}

/* Service Worker */
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* 登録失敗は無視 */ });
  });
}
