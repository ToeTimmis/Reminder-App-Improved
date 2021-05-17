"use strict"

const LOCAL_STORAGE_KEY_TIMERS = "Timer.app.timers";

let timers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TIMERS)) || [];

let timerRoot = document.querySelector("#timer-root");
let timerForm = document.querySelector("[timer-form]");
let timerInput = document.querySelector("[timer-input]");


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
        time: time,
    };
}

function TimerList(items){
    let list = document.createElement("ul");
    items.forEach((item) => {
        let timerlistItem = document.createElement("li");
        timerlistItem.innerHTML = item.time;
        timerlistItem.setAttribute("data-id", item.id);
        timerlistItem.classList.add("Timer-list-item");
        timerlistItem.addEventListener("click", RemoveItem);
        list.append(timerlistItem);
    });
    return list;
}

function RemoveItem(event){
    let removeItem = event.target.getAttribute("data-id");
    timers = timers.filter((item) => item.id !== removeItem);
    UpdateTimers();
}

function UpdateTimers(){ 
    SaveList();
    timerRoot.innerHTML = "";
    timerRoot.append(TimerList(timers));
}

function SaveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_TIMERS, JSON.stringify(timers));
}

UpdateTimers();
