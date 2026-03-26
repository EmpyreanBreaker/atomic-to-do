import { atomicToDoManager } from "../model/atomic-to-do";
import { parentToDoManager } from "../model/parent-to-do";
import { toDoProjectManager } from "./models/project";

// =================================
// SNAPSHOTS
// =================================
const createToDoProjectManagerArraySnapshot = () => {

}

// =================================
// CREATE
// =================================
const createToDoProject = (newProjectName) => {
    // Add the project to the project manager
    toDoProjectManager.addProjectToManagerArray(newProjectName);
}

// =================================
// READ
// =================================


// =================================
// UPDATE
// =================================


// =================================
// DELETE
// =================================
// dbProjectName and dbProjectId are retrieved from the UI attribute and passed in
const deleteToDoProject = (dbProjectName, dbProjectId) => {
}

const deleteToDoProjectAndChildren = () => { }

// =================================
// EXPORT
// =================================
export { createToDoProject }