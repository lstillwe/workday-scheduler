// retrieve any needed paraent elements
var containerEl = document.querySelector(".container");

// get todays date and format it like this: Monday, January 1, 2021

var currentDate = moment().format('dddd[,] MMMM Do[,] YYYY')
console.log(currentDate);
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

function createHourBlock(index) {
    // create div
    var hourBlockEl = document.createElement("section");
    hourBlockEl.setAttribute("class", "time-block");

    var rowDivEl = document.createElement("div");
    rowDivEl.setAttribute("class", "row");

    // create hour div
    var hourDivEl = document.createElement("div");
    hourDivEl.setAttribute("class", "col-md-1 hour");
    hourDivEl.setAttribute("id", index);
    hourDivEl.textContent = moment(index, "H").format("hA");

    // create textarea for task description
    var textAreaEl = document.createElement("textarea");
    textAreaEl.setAttribute("class", "col-md-10 description")

    // create submit button
    var btnEl = document.createElement("button");
    btnEl.setAttribute("type", "button");
    btnEl.setAttribute("class", "col-md-1 saveBtn");
    btnEl.setAttribute("id", "submit");
    faIconEL = document.createElement("i");
    faIconEL.setAttribute("class", "fas fa-save");
    btnEl.append(faIconEL);


    rowDivEl.append(hourDivEl);
    rowDivEl.append(textAreaEl);
    rowDivEl.append(btnEl);

    hourBlockEl.append(rowDivEl);

    return hourBlockEl;
}
