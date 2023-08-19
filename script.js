const button = document.querySelector(".ripple-btn");
const counter = document.querySelector("#clicks");
const displayTimer = document.querySelector("#timer");
const result = document.querySelector("#result");
const restartButton = document.querySelector("#restartButton");
const mode1Button = document.querySelector("#mode1")
const mode2Button = document.querySelector("#mode2")
const mode3Button = document.querySelector("#mode3")  


let clicks = 0;
let startTime;
let isTimerRunning = false;
let timerId;
let mode1 = false;
let mode2 = false;
let mode3 = false;

button.addEventListener("click", () => {
  if (!isTimerRunning) {
    timer();
    isTimerRunning = true;
  }
  clicks++;
  counter.innerHTML = `Clicks: <b>${clicks}</b>`;
});

//計時器
function timer() {
  if (!isTimerRunning) {  //若計時器沒有正在跑
    startTime = performance.now();  //將startTime變數設定為現在時間
    requestAnimationFrame(updateTimer); 
  }
}

function updateTimer(timestamp) {
  const currentTime = timestamp - startTime;
  const timeInSeconds = (currentTime / 1000).toFixed(3);
  displayTimer.innerHTML = `Timer: <b>${timeInSeconds}</b>`;
  if (mode1) {
    if (parseFloat(timeInSeconds) < 5) {
      //若秒數小於5，計時繼續。
      timerId = requestAnimationFrame(updateTimer);
    } else {
      //到達5秒停止計時器。
      displayTimer.innerHTML = `Timer: <b>5.000</b>`;
      cancelAnimationFrame(timerId);
      isTimerRunning = false;
      button.style.display = "none";
      result.style.display = "block";
      result.innerHTML = `Your CPS: ${clicks/5}`;
      clicks = 0; 
      restartButton.style.display = "block";
    }
  } else if (mode2) {
    if (parseFloat(timeInSeconds) < 10) {
      //若秒數小於10，計時繼續。
      timerId = requestAnimationFrame(updateTimer);
    } else {
      //到達10秒停止計時器。
      displayTimer.innerHTML = `Timer: <b>10.000</b>`;
      cancelAnimationFrame(timerId);
      isTimerRunning = false;
      button.style.display = "none";
      result.style.display = "block";
      result.innerHTML = `Your CPS: ${clicks/10}`;
      clicks = 0; 
      restartButton.style.display = "block";
    }
  } else if (mode3) {
    if (parseFloat(timeInSeconds) < 20) {
      //若秒數小於20，計時繼續。
      timerId = requestAnimationFrame(updateTimer);
    } else {
      //到達20秒停止計時器。
      displayTimer.innerHTML = `Timer: <b>20.000</b>`;
      cancelAnimationFrame(timerId);
      isTimerRunning = false;
      button.style.display = "none";
      result.style.display = "block";
      result.innerHTML = `Your CPS: ${clicks/20}`;
      clicks = 0; 
      restartButton.style.display = "block";
    }
  }
}

//重新開始
function restart() {
  restartButton.style.display = "none";
  result.style.display = "none";
  displayTimer.style.display = "none";
  counter.style.display = "none";
  mode1 = false;
  mode2 = false;
  mode3 = false;
  mode1Button.style.display = "block";
  mode2Button.style.display = "block";
  mode3Button.style.display = "block";
}

//按下模式選擇後
function modeSelect(mode) {
  mode1Button.style.display = "none";
  mode2Button.style.display = "none";
  mode3Button.style.display = "none";
  displayTimer.style.display = "block";
  counter.style.display = "block";
  button.style.display = "block";
  displayTimer.innerHTML = `Timer: <b>0</b>`;
  counter.innerHTML = `Clicks: <b>0</b>`;
  
  if (mode == 'mode1') {
    mode1 = true;
    console.log("mode1");
  } else if (mode == 'mode2') {
    mode2 = true;
    console.log("mode2");
  } else if (mode == 'mode3') {
    mode3 = true;
    console.log("mode3");
  }
}

button.addEventListener("click", drawRipple);

function drawRipple(event) {
  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  const ripples = document.createElement("span");
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";

  this.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 1000);
}