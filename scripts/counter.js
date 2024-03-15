// カウントダウンの時間（秒）を取得
const timeBaseElm = document.getElementById("timeBase");

// カウントダウンの時間（秒）のバリデーション
function getValidTime(time) {
  const minValue = 5;
  const maxValue = 99;
  const givenTime = Math.floor(time);
  let validTime = 10;

  if (givenTime < minValue) {
    validTime = minValue;
  } else if (givenTime > maxValue) {
    validTime = maxValue;
  } else {
    validTime = givenTime;
  }
  timeBaseElm.value = validTime;
  return validTime;
}

// カウンターを取得
const counter = document.querySelector(".counter");

let timeBase = getValidTime(timeBaseElm.value);

// カウントダウンの時間（秒）
//const timeBase = 10;
let timeLeft = timeBase;

// ボタンを取得
const startButton = document.getElementById("startClock");
// サウンドを取得
const clickSound = document.getElementById("clickSound");

// プログレスバーの要素を取得
const progressRing = document.querySelector(".progress-ring__circle");
const radius = progressRing.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// プログレスバーの初期設定
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = `${circumference}`;
//progressRing.style.strokeDashoffset = 0;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  //const offset = (percent / 100) * circumference;
  progressRing.style.strokeDashoffset = offset;
}

// ボタンのクリックイベントリスナー
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  timeBaseElm.disabled = true;
  timeBase = getValidTime(timeBaseElm.value);
  timeLeft = getValidTime(timeBaseElm.value);
  //counter.textContent = timeBase.toString().padStart(2, "0");
  counter.textContent = timeBase.toString();
  clearInterval();
  // カウントダウン開始
  const countdown = setInterval(() => {
    if (timeLeft <= 0) {
      setProgress(100);
      clearInterval(countdown);
    } else {
      timeLeft = timeLeft - 0.01;

      const displayCount = timeLeft > 0 ? Math.ceil(timeLeft) : 0;
      //counter.textContent = displayCount.toString().padStart(2, "0");
      counter.textContent = displayCount.toString();
      if (displayCount < 4 && displayCount > 0) {
        clickSound.play();
      } else if (displayCount === 0) {
        startButton.disabled = false;
        timeBaseElm.disabled = false;
      }

      // プログレスバーの更新
      const progress = ((timeBase - timeLeft) / timeBase) * 100;
      setProgress(progress);
    }
  }, 10);
});
// カウントダウンの初期表示
timeBaseElm.addEventListener("change", () => {
  const validTime = getValidTime(timeBaseElm.value);
  counter.textContent = validTime.toString();
  timeLeft = validTime;
});
