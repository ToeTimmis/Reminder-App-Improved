"use strict"

const LOCAL_STORAGE_KEY_TIMERS = "Timer.app.timers";

let timers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TIMERS)) || [];

let timerRoot = document.querySelector("#timer-root");
let timerForm = document.querySelector("[timer-form]");
let timerInput = document.querySelector("[timer-input]");

let timerSound = new Audio("Js/Alarm.mp3");


timerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (timerInput.value == "" || timerInput.value <= 0){
        return;
    }
    timers.push(CreateTimer(timerInput.value));
    timerInput.value = "";
    UpdateTimers();
});

function CreateTimer(time){
    return{
        id: Date.now().toString(),
        time: time * 60,
    };
}

function TimerList(items){
    let list = document.createElement("ul");
    items.forEach((item) => {
        let timerlistItem = document.createElement("li");
        timerlistItem.innerHTML = parseInt(item.time/60) + ":" + item.time % 60;
        timerlistItem.setAttribute("data-id", item.id);
        timerlistItem.classList.add("Timer-list-item");
        timerlistItem.addEventListener("click", RemoveTimer);
        list.append(timerlistItem);
    });
    return list;
}

function RemoveTimer(event){
    let removeTimer = event.target.getAttribute("data-id");
    timers = timers.filter((item) => item.id !== removeTimer);
    UpdateTimers();
}

function UpdateTimers(){
    SaveTimers();
    timerRoot.innerHTML = "";
    timerRoot.append(TimerList(timers));
}

function SaveTimers(){
    localStorage.setItem(LOCAL_STORAGE_KEY_TIMERS, JSON.stringify(timers));
}

function TimerTickDown(timers){
    timers.forEach((item) => {
        item.time -= 1;
        if (item.time <= 0){
            timerSound.play();
        }
        UpdateTimers();
    });
}

TimerTickDown(timers);
setInterval("TimerTickDown(timers)", 1000);

UpdateTimers();
