import {
  bindAddProject,
  bindProjectSelection,
  bindProjectDeletion,
  bindProjectEdit,
} from "./aside-presenter";
import { bindAddParent, bindParentEdit, bindParentDelete } from "./main-presenter";
import { asideController } from "./aside-controller";
import { mainController } from "./main-controller";
import { combinedService } from "../service/combined-service";
import { projectService } from "../service/project-service";
import { parentService } from "../service/parent-service";

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

  const handleAddParentRequest = (projectData) => {
    return mainController.openAddParentForm(projectData, handleAddParentSubmit);
  };

  const handleAddParentSubmit = (newParentData) => {
    const creationResult = parentService.createParent(
      newParentData.projectId,
      newParentData.title,
      newParentData.description,
      newParentData.dueDate,
      newParentData.status,
    );

    if (!creationResult.success) {
      return creationResult;
    }

    return refreshDisplay();
  };

  const handleAddProjectRequest = () => {
    return mainController.openAddProjectForm(handeAddProjectSubmit);
  };

  const handeAddProjectSubmit = (projectName) => {
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

  const handleParentDeleteConfirm = (parentId) => {
    const deletionResult = combinedService.removeParent(parentId);

    if (!deletionResult.success) {
      return deletionResult;
    }

    return refreshDisplay();
  };

  const handleParentDeleteRequest = (parentData) => {
    return mainController.openDeleteParentConfirmation(parentData, handleParentDeleteConfirm);
  };

  const handleParentEditSubmit = (editedParentData) => {
    const titleResult = parentService.changeParentTitle(editedParentData.parentId, editedParentData.title);

    if (!titleResult.success) {
      return titleResult;
    }

    const statusResult = parentService.changeParentStatus(editedParentData.parentId, editedParentData.status);

    if (!statusResult.success) {
      return statusResult;
    }

    const descriptionResult = parentService.changeParentDescription(
      editedParentData.parentId,
      editedParentData.description,
    );

    if (!descriptionResult.success) {
      return descriptionResult;
    }

    const dueDateResult = parentService.changeParentDueDate(
      editedParentData.parentId,
      editedParentData.dueDate,
    );

    if (!dueDateResult.success) {
      return dueDateResult;
    }

    return refreshDisplay();
  };

  const handleParentEditRequest = (parentData) => {
    return mainController.openEditParentForm(parentData, handleParentEditSubmit);
  };

  const handleProjectDeleteConfirm = (projectName) => {
    const deletionResult = combinedService.removeProjectAndChildren(projectName);

    if (!deletionResult.success) {
      return deletionResult;
    }

    if (selectedProjectName === projectName) {
      selectedProjectName = "All";
    }

    return refreshDisplay();
  };

  const handleProjectDeleteRequest = (projectName) => {
    return mainController.openDeleteProjectConfirmation(projectName, handleProjectDeleteConfirm);
  };

  const handleProjectEditRequest = (projectName) => {
    return mainController.openEditProjectForm(projectName, handleProjectRenameSubmit);
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

  const handleProjectSelection = (projectName) => {
    selectedProjectName = projectName;
    return refreshDisplay();
  };

  const bindEvents = () => {
    bindAddParent(handleAddParentRequest);
    bindAddProject(handleAddProjectRequest);
    bindProjectSelection(handleProjectSelection);
    bindParentDelete(handleParentDeleteRequest);
    bindProjectDeletion(handleProjectDeleteRequest);
    bindProjectEdit(handleProjectEditRequest);
    bindParentEdit(handleParentEditRequest);

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
