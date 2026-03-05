import "../css/reset.css";
import "../css/styles.css";
import { atomicToDoManager } from "./atomic-to-do.js";
import { projectManager } from "./project.js";

// Run on page load

(() => {
    // Starting Examples
    atomicToDoManager.addAtomicToDoToManagerArray("School", "Read chapter 3 and take notes", "2026-03-06", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("School", "Submit assignment draft", "2026-03-08", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Home", "Meal prep for the week", "2026-03-05", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Home", "Fix the loose cabinet handle", "2026-03-09", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Work", "Review Maximo SR workflow notes and summarize", "2026-03-05", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Relationshiip", "Plan a date idea and send a message", "2026-03-07", "incomplete");
    atomicToDoManager.displayAtomicToDosInManagerArray();

    // Test Rename
    atomicToDoManager.changeAtomicDescriptionInManagerArray(0, "Read chapter 4 and don't take notes");
    atomicToDoManager.changeAtomicDueDateInManagerArray(1, "2026-12-09");
    atomicToDoManager.changeAtomicStatusInManagerArray(2);
    atomicToDoManager.deleteAtomicToDoFromManagerArray(3);
    atomicToDoManager.displayAtomicToDosInManagerArray()
})()
