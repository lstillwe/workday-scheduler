// function to create the main content in the time block container
var createHourBlock = function(index, task) {
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
    if (task) {
        textAreaEl.value = task.text;
    }

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

// called every minute to check the current time and 
// update the hour block colors
var checkTime = function() {
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

 // retrieve any saved tasks in local storage
 var getTasks = function() {
    
    var tasks = JSON.parse(localStorage.getItem("tasks"));

    return tasks;
 }

 // save current task to local storage
 var saveTask = function(event) {

    // retrieve currently saved tasks, if any
    var savedTasks = getTasks();
    if (!savedTasks) {
        savedTasks = [];
    }

    // this element's parent
    var parentEl = event.currentTarget.parentElement;
    // now find textarea associated with this parent
    var textareaEl = parentEl.querySelector('textarea');
    newTask = textareaEl.value.trim();

    // see if this element has currently saved task
    var item = savedTasks.find(x => x.hour == textareaEl.id);
    // if already saved task - just update it with text
    if (item) {
        item.text = newTask;
    }
    // otherwise add this task to the arrray and save
     else {
        // add this task to the arrray and save
        taskObj = {
            "hour": parseInt(textareaEl.id),
            "text": newTask
        }
        savedTasks.push(taskObj);
    }

    // save modified tasklist to local storage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}


// *************** MAIN *************** //

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
var startupTasks = getTasks();
var task = null;
for (var i=startingHour; i<=endingHour; i++) {
    // find saved task description for this item, if anny
    if (startupTasks) {
        task = startupTasks.find(x => x.hour == i);
    }
   var hourBlock = createHourBlock(i, task);
   timeBlockEl.append(hourBlock);
}

containerEl.append(timeBlockEl);

// run checkTime for first time
checkTime();

// add lsitener for for submit buttons

$(".saveBtn").on("click", saveTask);

// start the time monitoring - check every minute
var intervalID = setInterval(checkTime, 60000);