import { toDoRepository } from "../repository/to-do-repository";
import { project } from "../model/project";
import { projectManager } from "../model/project-manager";

const createToDoService = () => {

    const initializeAppData = () => {
        if (!toDoRepository.exists("projects")) {
            console.log("Populating Default Project data Into Storage");

            const defaultProject = project();
            defaultProject.create("All");

            toDoRepository.save("projects", [defaultProject.getData()]);
        }

        // if (!toDoRepository.exists("parents")) {
        //     console.log("Populating Default Parent data Into Storage");
        //     const initialParentData = parentManager.createSnapshot();
        //     toDoRepository.save("parents", initialParentData);
        // }


        // if (!toDoRepository.exists("atomics")) {
        //     console.log("Populating Default Atomic data Into Storage");
        //     const initialAtomicData = atomicManager.createSnapshot();
        //     toDoRepository.save("atomics", initialAtomicData);
        // }

    }

    const loadAppData = () => {
        if (toDoRepository.exists("projects")) {
            const retrievedProjects = toDoRepository.load("projects");
            projectManager.reset();

            retrievedProjects.forEach(project => {
                const status = projectManager.addHydratedProject(project);
                if (!status.success) {
                    console.log(`Stored data conflict - ${status.reason}!`);
                }
            });
        }

        // if (toDoRepository.exists("parents")) {
        //      parentManager.reset();
        //     const retrievedParents = toDoRepository.load("parents");
        //     retrievedParents.forEach(parent => {
        //         parentManager.addHydratedParent(parent);
        //     })
        // }

        // if (toDoRepository.exists("atomics")) {
        //      atomicManager.reset();
        //     const retrievedAtomics = toDoRepository.load("atomics");
        //     retrievedAtomics.forEach(atomic => {
        //         atomicManager.addHydratedAtomic(atomic);
        //     })
        // }
    }

    const createProject = (newProjectName) => {
        const status = projectManager.addProject(newProjectName);
        if (status.success) {
            toDoRepository.save("projects", projectManager.createSnapshot());
        }
        else {
            console.log(`Invalid Addition - ${status.reason}!`);
        }
    }

    return {
        createProject,
        initializeAppData,
        loadAppData,
    }
}
const toDoService = createToDoService();
export { toDoService }



// =================================
// SNAPSHOTS
// =================================
const createToDoProjectManagerArraySnapshot = () => {

}

// =================================
// CREATE
// =================================
// const createToDoProject = (newProjectName) => {
//     // Add the project to the project manager
//     toDoProjectManager.addProjectToManagerArray(newProjectName);
// }

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


// =================================
// EXPORT
// =================================
