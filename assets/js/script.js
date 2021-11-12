// retrieve any needed paraent elements
var containerEl = document.querySelector(".container");

// textarea base classes 
textAreaClasses = "col-md-10 description";

// get todays date and format it like this: Monday, January 1, 2021
var currentDate = moment().format('dddd[,] MMMM Do[,] YYYY')
var dateParagraphEl = document.querySelector("#currentDay");
dateParagraphEl.textContent = currentDate;

// create blocks 
var timeBlockEl = document.createElement("div");
timeBlockEl.setAttribute("class", "time-block");
containerEl.append(timeBlockEl);

// add hour blocks 9AM - 5PM  (9 blocks)
var startingHour = 9;
var endingHour = 17;
for (var i=startingHour; i<=endingHour; i++) {
   var hourBlock = createHourBlock(i);
   timeBlockEl.append(hourBlock);
}

containerEl.append(timeBlockEl);

// run checkTime for first time
checkTime();

// start the time monitoring - check every minute
var intervalID = setInterval(checkTime, 60000);

function createHourBlock(index) {
    // create div
    var hourBlockEl = document.createElement("section");
    hourBlockEl.setAttribute("class", "time-block");

    var rowDivEl = document.createElement("div");
    rowDivEl.setAttribute("class", "row");

    // create hour div
    var hourDivEl = document.createElement("div");
    hourDivEl.setAttribute("class", "col-md-1 hour");
    //hourDivEl.setAttribute("id", index);
    hourDivEl.textContent = moment(index, "H").format("hA");

    // create textarea for task description
    var textAreaEl = document.createElement("textarea");
    textAreaEl.setAttribute("id", index);

    // create submit button
    var btnEl = document.createElement("button");
    btnEl.setAttribute("type", "button");
    btnEl.setAttribute("class", "col-md-1 saveBtn");
    btnEl.setAttribute("id", "submit");
    faIconEL = document.createElement("i");
    faIconEL.setAttribute("class", "fas fa-save");
    btnEl.append(faIconEL);

    // add hour div, textarea, and button to row div
    rowDivEl.append(hourDivEl);
    rowDivEl.append(textAreaEl);
    rowDivEl.append(btnEl);

    // add everything to the hour section
    hourBlockEl.append(rowDivEl);

    return hourBlockEl;
}

function checkTime() {
    // get current hour
    var currentTime = moment().hour();

    // use the folowing for testing
    //var currentTime = moment().add(3, 'hours').hour();
    //var currentTime = moment().subtract(3, 'hours').hour();
    //console.log(currentTime);

    // update the current color for present hour, if in business hours
    if (currentTime >= startingHour && currentTime <= endingHour) {
        var presentHourBlockEl = document.getElementById(currentTime);
        presentHourBlockEl.setAttribute("class", textAreaClasses + " present");
    }

    // find how many hours have passed since startingHour
    var hoursPassed = currentTime - startingHour;
    for(var i=startingHour; i<currentTime; i++) {
        // update the pasthours with the correct colors
        var passedHourBlockEl = document.getElementById(i);
        passedHourBlockEl.setAttribute("class", textAreaClasses + " past");
    }

    // set the rest to future if in business hours
    for(var i=currentTime+1; i<=endingHour; i++) {
        if (i >= startingHour && i <= endingHour) {
            var futureHourBlockEl = document.getElementById(i);
            futureHourBlockEl.setAttribute("class", textAreaClasses + " future");
        }
    }
 }
