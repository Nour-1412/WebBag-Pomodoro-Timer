const timerEl = document.getElementById("timer");
const modeLabel = document.getElementById("modeLabel");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const sessionsCount =
document.getElementById("sessionsCount");

const alarm =
document.getElementById("alarmSound");

let studyTime = 25 * 60;
let breakTime = 5 * 60;

let currentTime = studyTime;

let timerInterval = null;

let isStudy = true;

let sessions = 0;

function updateTimer(){

const minutes =
Math.floor(currentTime / 60);

const seconds =
currentTime % 60;

timerEl.textContent =
`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

function startTimer(){

if(timerInterval) return;

timerInterval =
setInterval(()=>{

currentTime--;

updateTimer();

if(currentTime <= 0){

alarm.play();

clearInterval(timerInterval);

timerInterval = null;

if(isStudy){

sessions++;

sessionsCount.textContent =
sessions;

isStudy = false;

modeLabel.textContent =
"استراحة";

currentTime =
breakTime;

}
else{

isStudy = true;

modeLabel.textContent =
"جلسة دراسة";

currentTime =
studyTime;

}

updateTimer();

}

},1000);

}

function pauseTimer(){

clearInterval(timerInterval);

timerInterval = null;

}

function resetTimer(){

pauseTimer();

isStudy = true;

currentTime = studyTime;

modeLabel.textContent =
"جلسة دراسة";

updateTimer();

}

startBtn.addEventListener(
"click",
startTimer
);

pauseBtn.addEventListener(
"click",
pauseTimer
);

resetBtn.addEventListener(
"click",
resetTimer
);

updateTimer();
