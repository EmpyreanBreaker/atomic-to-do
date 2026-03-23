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
            console.log("Empty Storage! Populating Storage");
            populateStorageWithDefaultProject();
        }

        console.log("Storage Not Empty! Loading From Storage")
        hydateProjectManagerArray();
    };

    const populateStorageWithDefaultProject = () => {
        const initProjectManagerArray = [{ projectId: crypto.randomUUID(), projectName: "Home" }];
        localStorage.setItem("toDoProjects", JSON.stringify(initProjectManagerArray))
    }

    const hydateProjectManagerArray = () => {
        const toDoProjects = JSON.parse(localStorage.getItem("toDoProjects") || "[]");
        toDoProjects.forEach(project => projectManager.addProjectFromLocalStorageToManagerArray(project.projectId, project.projectName));
    }

    init();

    // =================================
    // DEFAULT PROJECT TESTS
    // =================================
    projectManager.addProjectToManagerArray("Home");
    projectManager.addProjectToManagerArray("Education");
    projectManager.addProjectToManagerArray("Career")
    projectManager.addProjectToManagerArray("Relationship");

    console.log("Displaying Project In Project Manager Array")
    console.log("Works for first time empty storage and non-empty storage")
    projectManager.displayProjectsInManagerArray();
    projectManager.changeProjectNameInManagerArray("Education", "BLEB");
    console.log("Displaying Project In Project Manager Snapshot Array after save to Local Storage")
    projectManager.displayProjectsInManagerArrayDeepCopy();

})()
