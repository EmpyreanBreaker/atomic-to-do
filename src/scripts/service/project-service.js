import { toDoRepository } from "../repository/to-do-repository";
import { project } from "../model/project";
import { projectManager } from "../model/project-manager";

const createProjectService = () => {
  const initializeProjectAppData = () => {
    if (!toDoRepository.exists("projects")) {
      console.log("Populating Default Project data Into Storage");

      const defaultProject = project();
      defaultProject.create("All");

      toDoRepository.save("projects", [defaultProject.getData()]);
    }
  };

  const loadProjectAppData = () => {
    if (toDoRepository.exists("projects")) {
      const retrievedProjects = toDoRepository.load("projects");
      projectManager.reset();

      retrievedProjects.forEach((project) => {
        const hydrated = projectManager.addHydratedProject(project);
        if (!hydrated.success) {
          console.log(`${hydrated.reason}`);
        }
      });
    }
  };

  const changeProjectName = (currName, newName) => {
    const changed = projectManager.changeProjectName(currName, newName);
    if (changed.success) {
      toDoRepository.save("projects", projectManager.createSnapshot());
      return { success: true, name: changed.name };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const createProject = (newName) => {
    const created = projectManager.addProject(newName);
    if (created.success) {
      toDoRepository.save("projects", projectManager.createSnapshot());
      return { success: true, projectData: created.projectData };
    } else {
      console.log(`${created.reason}`);
      return { success: false, reason: created.reason };
    }
  };

  const testProjectDisplay = () => {
    console.table(projectManager.createSnapshot());
  };

  return {
    changeProjectName,
    createProject,
    initializeProjectAppData,
    loadProjectAppData,
    testProjectDisplay,
  };
};
const projectService = createProjectService();
export { projectService };
