import "../css/reset.css";
import "../css/styles.css";
import { atomicToDoManager } from "./atomic-to-do.js";
import { parentToDoManager } from "./parent-to-do.js"
import { projectManager } from "./project.js";

// Run on page load

(() => {
    // Starting Examples
    parentToDoManager.addParentToDoToManagerArray("Work", "Weekly status update", "Draft and send the weekly status email to the team.", "2026-03-08", "completed");
    parentToDoManager.addParentToDoToManagerArray("Work", "Refactor to-do modules", "Clean up manager naming and fix validation guards.", "2026-03-10", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Relationship", "Plan a date night", "Pick an idea, confirm availability, and book if needed.", "2026-03-09", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Relationship", "Have the hard talk", "Bring up expectations and listen without defending.", "2026-03-11", "completed");
    parentToDoManager.addParentToDoToManagerArray("Home", "Grocery run", "Buy staples for the week + ingredients for 2 easy meals.", "2026-03-07", "completed");
    parentToDoManager.addParentToDoToManagerArray("Home", "Clean kitchen reset", "Counters, dishes, take out trash, wipe stove, sweep floor.", "2026-03-06", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Education", "Read chapter 4", "Read chapter 4 and write 5 bullet-point takeaways.", "2026-03-08", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Education", "Study session", "45 minutes: review notes + do 10 practice questions.", "2026-03-07", "incomplete");
    parentToDoManager.displayParentToDosInManagerArray();


    // Tests
    parentToDoManager.changeParentDescriptionInManagerArray(0, "Read chapter 4 and don't take notes");
    parentToDoManager.changeParentDueDateInManagerArray(1, "2026-12-09");
    parentToDoManager.changeParentProjectNameInManagerArray(2, "Undefined");
    parentToDoManager.changeParentStatusInManagerArray(3);
    parentToDoManager.changeParentTitleInManagerArray(4, "Undefined task")
    parentToDoManager.deleteParentToDoFromManagerArray(5);
    parentToDoManager.displayParentToDosInManagerArray();

})()
