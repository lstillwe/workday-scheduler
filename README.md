# Work Day Scheduler

A daily planner - intended to allow the user to manage their time effectively

This workday scheduler was developed using HTML, CSS and Javascript.
It also employs Javascript timers, dynamic DOM manipulation, localStorage, event listeners, and time handling (using moment js). It also uses Bootstrap styling/layout.

When the user opens the planner, the current day is displayed at the top of the calendar.
The calender consists of time blocks for standard business hours (currently 9AM to 5PM)

Each time block is color-coded to indicate whether it is in the past, present, or future, and is updated every minute.

The user can click on a time block and enter text to indictate a task(s) for that block of time.
When the user clicks on the button to the right of that time block, the task is saved to local storage - thus surviving refreshes of the website page.

The user can remove a task by deleting the text from a time block and save the edit.


Deployed workday-scheduler in GitHub IO is [HERE](https://lstillwe.github.io/workday-scheduler/)

### Demo GIF:
![image info](./assets/images/05-third-party-apis-homework-demo.gif)
