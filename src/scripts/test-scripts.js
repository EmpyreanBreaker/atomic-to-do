// Project Manager
(() => {
    // Should be rejected - Default Project
    projectManager.addProjectToManagerArray("Home");
    projectManager.deleteProjectFromManagerArray("Home");
    projectManager.renameProjectInManagerArray("Home", "Home");
    // Valid Additions
    projectManager.addProjectToManagerArray("Relationship");
    projectManager.addProjectToManagerArray("School");
    projectManager.addProjectToManagerArray("Work");
    projectManager.displayProjectsInManagerArray();
    // Valid Deletions
    projectManager.deleteProjectFromManagerArray("Relationship");
    projectManager.deleteProjectFromManagerArray("Work");
    projectManager.displayProjectsInManagerArray();
    // Invalid Deletions
    projectManager.deleteProjectFromManagerArray("Relationship");
    projectManager.deleteProjectFromManagerArray("Work");
    // Valid Renames
    projectManager.renameProjectInManagerArray("School", "Education");
    projectManager.displayProjectsInManagerArray();
    // Invalid Renames
    projectManager.renameProjectInManagerArray("BadName", "GoodName");
    projectManager.displayProjectsInManagerArray();

    // Atomic To-Do Manager
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