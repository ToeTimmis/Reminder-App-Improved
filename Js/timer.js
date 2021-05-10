"use strict"

const LOCAL_STORAGE_KEY_TIMERS = "app.timers";

let timerForm = document.querySelector("timer-form")
let timerInput = document.querySelector("[timer-input]");


timerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (timerInput.value == "" || timerInput.value <= 0){
        return;
    }
});












