"use strict";

const LOCAL_STORAGE_KEY_REMINDERS = "app.reminders.advanced";

let reminders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_REMINDERS)) || [];

let reminderRoot = document.querySelector("#reminder-root");
let reminderForm = document.querySelector("[data-reminder-form]");
let reminderInput = document.querySelector("[data-reminder-input]");
let dateInput = document.querySelector("[date-input]");
let timeInput = document.querySelector("[time-input]");

let reminderSound = new Audio("Js/Alarm.mp3");

reminderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (reminderInput.value.trim() === ""){
        return;
    }
    reminders.push(CreateReminder(reminderInput.value.trim(), dateInput.value, timeInput.value));
    UpdateReminders();
    reminderInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
});

function CreateReminder(name, date, time) {
    return {
      id: Date.now().toString(),
      name: name,
      date: date,
      time: time,
      bold: false,
    };
  }

function Reminderlist(items){
    let list = document.createElement("ul");
    items.forEach((item) => {
        let reminderlistItem = document.createElement("li");
        if (item.bold == true){
            reminderlistItem.innerHTML = item.name.bold() + " " + item.date.bold() + " " + item.time.bold();
        }
        else {
            reminderlistItem.innerHTML = item.name + " " + item.date + " " + item.time;
        }
        reminderlistItem.setAttribute("data-id", item.id);
        reminderlistItem.classList.add("reminder-list-item");
        reminderlistItem.addEventListener("click", RemoveReminder);
        list.append(reminderlistItem);
    });
    return list;
}

function RemoveReminder(event){
    let removeItem = event.target.getAttribute("data-id");
    reminders = reminders.filter((item) => item.id !== removeItem);
    UpdateReminders();
}

function UpdateReminders(){ 
    SaveReminders();
    reminderRoot.innerHTML = "";
    reminderRoot.append(Reminderlist(reminders));
}

function SaveReminders(){
    localStorage.setItem(LOCAL_STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
}

function ClockTime(item){
    let currentTime = new Date();
    let currentYear = currentTime.getFullYear();
    let currentMonth = currentTime.getMonth() + 1;
    let currentDay = currentTime.getDate();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    let currentSecond = currentTime.getSeconds();
    
    
    currentHour = (currentHour < 10 ? "0" : "") + currentHour;
    currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
    currentSecond = (currentSecond < 10 ? "0" : "") + currentSecond;
    currentMonth = (currentMonth < 10 ? "0" : "") + currentMonth;
    currentDay = (currentDay < 10 ? "0" : "") + currentDay;

    let currentTimeDetector = currentHour.toString() + ":" + currentMinute.toString();
    let currentDateDetector = currentYear.toString() + "-" + currentMonth.toString() + "-" + currentDay.toString();
    
    for (let i = 0; i < item.length; i++){
        if(currentDateDetector == item[i].date || item[i].date == ""){
            if(currentTimeDetector == item[i].time){
                reminderSound.play();
                item[i].bold = true;
                UpdateReminders();
            }
        }
    }
    

    let timeDisplayed = currentHour + ":" + currentMinute + ":" + currentSecond;
    let dateDisplayed = currentYear + "-" + currentMonth + "-" + currentDay;
    document.querySelector("#clock").firstChild.nodeValue = timeDisplayed + " " + dateDisplayed;
}

ClockTime(reminders);
setInterval("ClockTime(reminders)", 1000);

UpdateReminders();