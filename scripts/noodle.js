// カウンターを取得
const counter = document.querySelector(".counter__noodle");

// カウントダウンの時間（秒）
let timeBase = 180;
let timeLeft = timeBase;

// ボタンを取得
const startButton230 = document.getElementById("startClock230");
const startButton300 = document.getElementById("startClock300");
const startButton330 = document.getElementById("startClock330");
// サウンドを取得
const clickSound = document.getElementById("clickSound");

// プログレスバーの要素を取得
const progressRing = document.querySelector(".progress-ring__circle__noodle");
const radius = progressRing.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// プログレスバーの初期設定
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = 0;

function setProgress(percent) {
  const offset = (percent / 100) * circumference;
  progressRing.style.strokeDashoffset = offset;
}

function countDown() {
  const countdown = setInterval(() => {
    if (timeLeft <= 0) {
      setProgress(100);
      clearInterval(countdown);
    } else {
      timeLeft = timeLeft - 0.01;

      const displayCount = timeLeft > 0 ? Math.ceil(timeLeft) : 0;
      counter.textContent = displayCount.toString();
      if (displayCount < 11 && displayCount > 0) {
        clickSound.play();
      } else if (displayCount === 0) {
        startButton230.disabled = false;
        startButton300.disabled = false;
        startButton330.disabled = false;
      }

      // プログレスバーの更新
      const progress = ((timeBase - timeLeft) / timeBase) * 100;
      setProgress(progress);
    }
  }, 10);
}

// ボタンのクリックイベントリスナー
startButton230.addEventListener("click", () => {
  startButton230.disabled = true;
  startButton300.disabled = true;
  startButton330.disabled = true;
  startButton230.classList.add("isActive");
  startButton300.classList.remove("isActive");
  startButton330.classList.remove("isActive");
  timeBase = 150;
  timeLeft = timeBase;
  counter.textContent = timeBase.toString();
  clearInterval();
  // カウントダウン開始
  countDown();
});
startButton300.addEventListener("click", () => {
  startButton230.disabled = true;
  startButton300.disabled = true;
  startButton330.disabled = true;
  startButton230.classList.remove("isActive");
  startButton300.classList.add("isActive");
  startButton330.classList.remove("isActive");
  timebase = 180;
  timeLeft = timeBase;
  counter.textContent = timeBase.toString();
  clearInterval();
  // カウントダウン開始
  countDown();
});
startButton330.addEventListener("click", () => {
  startButton230.disabled = true;
  startButton300.disabled = true;
  startButton330.disabled = true;
  startButton230.classList.remove("isActive");
  startButton300.classList.remove("isActive");
  startButton330.classList.add("isActive");
  timeBase = 210;
  timeLeft = timeBase;
  counter.textContent = timeBase.toString();
  clearInterval();
  // カウントダウン開始
  countDown();
});
