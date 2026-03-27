// TRY TO BUILD THIS WITHOUT THE MODEL MANAGERS. REMEMBER SERVICE TALKS TO MODELS AND REPO
// REPO DOES NOT INTERACT WITHM MODELS

// =================================
// STORAGE
// =================================
const createToDoRepository = () => {
    const exists = (key) => {
        return localStorage.getItem(key) !== null
    }

    const save = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    const load = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    return {
        exists,
        load,
        save
    }
    // use parents and atomics for the equivalent. I'm tired of long names
}

const toDoRepository = createToDoRepository();
export { toDoRepository }



// const createRepositoryManager = () => {
//     const initStorage = () => {
//         if (!localStorage.getItem("toDoProjects")) {
//             console.log("Empty Storage! Populating Default Project Into Storage");
//             populateStorageWithDefaultProject();
//         }
//         if (!localStorage.getItem("parentToDos")) {
//             console.log("Empty Storage! Populating Empty Parent To-Do Into Storage");
//             populateStorageWithDefaultParent();
//         }
//         if (!localStorage.getItem("atomicToDos")) {
//             console.log("Empty Storage! Populating Empty Atomic To-Do Into Storage");
//             populateStorageWithDefaultAtomic();
//         }

//         console.log("Storage Not Empty! Hydrating Projects")
//         hydateProjectManagerArray();
//         console.log("Storage Not Empty! Hydrating Parent To-Dos")
//         hydrateParentToDoManagerArray();
//         console.log("Storage Not Empty! Hydrating Parent To-Dos")
//         hydrateParentToDoManagerArray();
//         console.log("Storage Not Empty! Hydrating Atomic To-Dos")
//         hydrateAtomicToDoManagerArray();
//     };

//     const populateStorageWithDefaultProject = () => {
//         const initProjectManagerArray = [{ projectId: crypto.randomUUID(), projectName: "All" }];
//         localStorage.setItem("toDoProjects", JSON.stringify(initProjectManagerArray));
//     }

//     const populateStorageWithDefaultParent = () => {
//         const initParentManagerArray = [];
//         localStorage.setItem("parentToDos", JSON.stringify(initParentManagerArray));
//     }

//     const populateStorageWithDefaultAtomic = () => {
//         const initAtomicManagerArray = [];
//         localStorage.setItem("atomicToDos", JSON.stringify(initAtomicManagerArray));
//     }

//     const hydateProjectManagerArray = () => {
//         const toDoProjects = JSON.parse(localStorage.getItem("toDoProjects") || "[]");
//         toDoProjectManager.clearProjectManagerArray();
//         toDoProjects.forEach(project => toDoProjectManager.addProjectFromLocalStorageToManagerArray(project.projectId, project.projectName));
//     }

//     const hydrateParentToDoManagerArray = () => {
//         const parentToDoProjects = JSON.parse(localStorage.getItem("parentToDos") || "[]");
//         parentToDoManager.clearParentToDoManagerArray();
//         parentToDoProjects.forEach(parent => parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
//             parent.parentToDoProjectId,
//             parent.parentToDoId,
//             parent.parentToDoTitle,
//             parent.parentToDoDescription,
//             parent.parentToDoDueDate,
//             parent.parentToDoStatus
//         ))
//     }

//     const hydrateAtomicToDoManagerArray = () => {
//         const atomicToDoProjects = JSON.parse(localStorage.getItem("atomicToDos") || "[]");
//         atomicToDoManager.clearAtomicToDoManagerArray();
//         atomicToDoProjects.forEach(atomic => atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
//             atomic.atomicToDoParentId,
//             atomic.atomicToDoId,
//             atomic.atomicToDoTask,
//             atomic.atomicToDoDueDate,
//             atomic.atomicToDoStatus,
//         ))
//     }

//     return { initStorage }
// }

// const repositoryManager = createRepositoryManager();

// export { repositoryManager }