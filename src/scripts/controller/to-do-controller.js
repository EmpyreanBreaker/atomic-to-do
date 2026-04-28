import { bindProjectCreation, bindProjectSelection, bindProjectEdit } from "./aside-presenter";
import { asideController } from "./aside-controller";
import { mainController } from "./main-controller";
import { combinedService } from "../service/combined-service";
import { projectService } from "../service/project-service";

const createToDoController = () => {
  let selectedProjectName = "All";

  const refreshDisplay = () => {
    const sidebarResult = asideController.refreshSidebar();

    if (!sidebarResult.success) {
      return sidebarResult;
    }

    const mainResult =
      selectedProjectName === "All"
        ? mainController.renderAll()
        : mainController.renderProject(selectedProjectName);

    if (!mainResult.success) {
      selectedProjectName = "All";
      return mainController.renderAll();
    }

    return { success: true };
  };

  const handleProjectSelection = (projectName) => {
    selectedProjectName = projectName;
    return refreshDisplay();
  };

  const handleCreateProjectSubmit = (projectName) => {
    const creationResult = projectService.createProject(projectName);

    if (!creationResult.success) {
      return creationResult;
    }

    selectedProjectName = creationResult.projectData.name;
    const refreshResult = refreshDisplay();

    if (!refreshResult.success) {
      return refreshResult;
    }

    return {
      success: true,
      projectData: creationResult.projectData,
    };
  };

  const handleCreateProjectRequest = () => {
    return mainController.openNewProjectForm(handleCreateProjectSubmit);
  };

  const handleProjectRenameSubmit = (currentProjectName, newProjectName) => {
    const renameResult = projectService.changeProjectName(currentProjectName, newProjectName);

    if (!renameResult.success) {
      return renameResult;
    }

    if (selectedProjectName === currentProjectName) {
      selectedProjectName = renameResult.name;
    }

    return refreshDisplay();
  };

  const handleProjectEditRequest = (projectName) => {
    return mainController.openEditProjectForm(projectName, handleProjectRenameSubmit);
  };

  const bindEvents = () => {
    bindProjectSelection(handleProjectSelection);
    bindProjectCreation(handleCreateProjectRequest);
    bindProjectEdit(handleProjectEditRequest);

    return { success: true };
  };

  const initStorage = () => {
    return combinedService.initializeAppData();
  };

  const loadStorage = () => {
    return combinedService.loadAppData();
  };

  const initDisplay = () => {
    return refreshDisplay();
  };

  const init = () => {
    initStorage();
    loadStorage();
    initDisplay();
    bindEvents();

    return { success: true };
  };

  return {
    init,
    initDisplay,
    initStorage,
    loadStorage,
  };
};

const toDoController = createToDoController();

export { toDoController };
