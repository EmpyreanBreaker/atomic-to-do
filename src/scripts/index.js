import "../css/reset.css";
import "../css/styles.css";
import { combinedToDoManager } from "./combined-display.js";
import { atomicToDoManager } from "./atomic-to-do.js";
import { parentToDoManager } from "./parent-to-do.js"
import { projectManager } from "./project.js";

// Run on page load
(() => {
    // =================================
    // NOTES: 
    // WHENEVER YOU MAKE A CHANGE TO A PROJECT
    // RUN THE DEEPCOPY FUNCTION
    // SAVE THE DEEP COPY TO STORAGE
    // LOAD THE DEEP COPY
    // HOME SERVES AS DEFAAULT PROJECT
    // =================================

    // =================================
    // DEFAULT PROJECT SETUP
    // HOME SERVES AS DEFAULT PROJECT
    // =================================
    const init = () => {
        if (!localStorage.getItem("toDoProjects")) {
            console.log("Empty Storage! Populating Default Project Into Storage");
            populateStorageWithDefaultProject();
        }
        if (!localStorage.getItem("parentToDos")) {
            console.log("Empty Storage! Populating Empty Parent To-Do Into Storage");
            populateStorageWithDefaultParent();
        }

        console.log("Storage Not Empty! Hydrating Projects")
        hydateProjectManagerArray();
        console.log("Storage Not Empty! Hydrating Parent To-Dos")
        hydrateParentToDoManagerArray();
    };

    const populateStorageWithDefaultProject = () => {
        const initProjectManagerArray = [{ projectId: crypto.randomUUID(), projectName: "Home" }];
        localStorage.setItem("toDoProjects", JSON.stringify(initProjectManagerArray))
    }

    const populateStorageWithDefaultParent = () => {
        const initParentManagerArray = [];
        localStorage.setItem("parentToDos", JSON.stringify(initParentManagerArray))
    }

    const hydateProjectManagerArray = () => {
        const toDoProjects = JSON.parse(localStorage.getItem("toDoProjects") || "[]");
        projectManager.clearProjectManagerArray();
        toDoProjects.forEach(project => projectManager.addProjectFromLocalStorageToManagerArray(project.projectId, project.projectName));
    }

    const hydrateParentToDoManagerArray = () => {
        const parentToDoProjects = JSON.parse(localStorage.getItem("parentToDos") || "[]");
        parentToDoManager.clearParentToDoManagerArray();
        parentToDoProjects.forEach(parent => parentToDoManager.addParentFromLocalStorageToManagerArray(
            parent.parentToDoProjectId,
            parent.parentToDoId,
            parent.parentToDoTitle,
            parent.parentToDoDescription,
            parent.parentToDoDueDate,
            parent.parentToDoStatus
        ))
    }

    init();

    // =================================
    // PROJECT EXAMPLES & TESTS
    // =================================
    projectManager.addProjectToManagerArray("Home");
    projectManager.addProjectToManagerArray("Education");
    projectManager.addProjectToManagerArray("Career")
    projectManager.addProjectToManagerArray("Relationship");

    console.log("Displaying Project In Project Manager Array")
    console.log("Works for first time empty storage and non-empty storage")
    projectManager.displayProjectsInManagerArray();
    projectManager.changeProjectNameInManagerArray("Education", "Hobbies");
    console.log("Displaying Project In Project Manager Snapshot Array after save to Local Storage")
    projectManager.displayProjectsInManagerArraySnapshot();
    projectManager.changeProjectNameInManagerArray("Hobbies", "Education");
    console.log("Displaying Project In Project Manager Snapshot Array after save to Local Storage")
    projectManager.displayProjectsInManagerArraySnapshot();

    // =================================
    // PARENT TO-DO EXAMPLES & TESTS
    // =================================
    parentToDoManager.addParentToDoToManagerArray(
        "0a42d911-a804-4a76-af55-7d1bb5e29195",
        "27b66ef3-5cd6-41a5-aa91-46bc430f5856",
        "Kitchen reset",
        "Quick reset: dishes, counters, trash, sweep.",
        "2026-03-06",
        "incomplete"
    ); // parentId = 0

    parentToDoManager.addParentToDoToManagerArray(
        "0a42d911-a804-4a76-af55-7d1bb5e29195",
        "675d7895-beeb-45f9-9c2d-f2f5a2dd4ac5",
        "Laundry + sheets",
        "Wash clothes and change bed sheets.",
        "2026-03-07",
        "incomplete"
    ); // parentId = 1

    parentToDoManager.addParentToDoToManagerArray(
        "0deb40a3-8c4a-4f55-b502-a4e70b613473",
        "13162ba9-ab10-4122-86a0-991cda89ccab",
        "Weekly status update",
        "Draft and send the weekly status email to the team.",
        "2026-03-08",
        "incomplete"
    ); // parentId = 2

    parentToDoManager.addParentToDoToManagerArray(
        "0deb40a3-8c4a-4f55-b502-a4e70b613473",
        "c6f7c6fa-e406-472a-b564-21f489b9a748",
        "Refactor to-do managers",
        "Switch child linking from category to parentId and clean up naming.",
        "2026-03-10",
        "incomplete"
    ); // parentId = 3

    parentToDoManager.addParentToDoToManagerArray(
        "cc80a8a3-42d0-428c-acfc-0399da6fb76c",
        "70f66914-8765-46d7-92e0-758cbddc9a1c",
        "Plan date night",
        "Pick an idea, confirm availability, book if needed.",
        "2026-03-09",
        "incomplete"
    ); // parentId = 4

    parentToDoManager.addParentToDoToManagerArray(
        "cc80a8a3-42d0-428c-acfc-0399da6fb76c",
        "905e3c1b-f1d2-46cd-801e-787815798988",
        "Weekly check-in",
        "Short conversation about needs, plans, and how things feel.",
        "2026-03-11",
        "incomplete"
    ); // parentId = 5

    parentToDoManager.addParentToDoToManagerArray(
        "4e7d2ac0-3c80-4aa0-aa99-31b490878e81",
        "d17043cc-f02b-4ba8-828e-b67b48b095e9",
        "Read chapter 4",
        "Read the chapter and capture key points.",
        "2026-03-08",
        "incomplete"
    ); // parentId = 6

    parentToDoManager.addParentToDoToManagerArray(
        "4e7d2ac0-3c80-4aa0-aa99-31b490878e81",
        "00c10c16-4245-4862-a813-9b87a17de9be",
        "Practice problems set",
        "Do a focused set of practice questions and review mistakes.",
        "2026-03-09",
        "incomplete"
    ); // parentId = 7

    console.log("Displaying Parent To-Dos In Parent Manager Array")
    console.log("Works for first time empty storage and non-empty storage")
    parentToDoManager.displayParentToDosInManagerArray();

    console.log("Displaying Parent To-Dos In Parent Manager Snapshot Array after save to Local Storage")
    parentToDoManager.displayParentToDosInManagerArraySnapshot();

})()
