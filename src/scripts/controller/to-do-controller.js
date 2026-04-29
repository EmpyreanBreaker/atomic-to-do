import {
  bindAddProject,
  bindProjectSelection,
  bindProjectDeletion,
  bindProjectEdit,
} from "./aside-presenter";
import {
  bindAddAtomic,
  bindAddParent,
  bindAtomicDelete,
  bindParentDelete,
  bindParentEdit,
} from "./main-presenter";
import { asideController } from "./aside-controller";
import { mainController } from "./main-controller";
import { combinedService } from "../service/combined-service";
import { projectService } from "../service/project-service";
import { parentService } from "../service/parent-service";
import { atomicService } from "../service/atomic-service";

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

  const handleAddAtomicRequest = (parentData) => {
    return mainController.openAddAtomicForm(parentData, handleAddAtomicSubmit);
  };

  const handleAddParentRequest = (projectData) => {
    return mainController.openAddParentForm(projectData, handleAddParentSubmit);
  };

  const handleAddProjectRequest = () => {
    return mainController.openAddProjectForm(handeAddProjectSubmit);
  };

  const handleAddAtomicSubmit = (newAtomicData) => {
    const creationResult = atomicService.createAtomic(
      newAtomicData.parentId,
      newAtomicData.task,
      newAtomicData.dueDate,
      newAtomicData.status,
    );

    if (!creationResult.success) {
      return creationResult;
    }

    return refreshDisplay();
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

  const handleDeleteAtomicConfirm = (atomicId) => {
    const deletionResult = atomicService.removeAtomic(atomicId);

    if (!deletionResult.success) {
      return deletionResult;
    }

    return refreshDisplay();
  };

  const handleDeleteParentConfirm = (parentId) => {
    const deletionResult = combinedService.removeParent(parentId);

    if (!deletionResult.success) {
      return deletionResult;
    }

    return refreshDisplay();
  };

  const handleDeleteParentRequest = (parentData) => {
    return mainController.openDeleteParentConfirmation(parentData, handleDeleteParentConfirm);
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

  const handleAtomicDeleteRequest = (atomicData) => {
    return mainController.openDeleteAtomicConfirmation(atomicData, handleDeleteAtomicConfirm);
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
    bindAtomicDelete(handleAtomicDeleteRequest);
    bindAddAtomic(handleAddAtomicRequest);
    bindAddParent(handleAddParentRequest);
    bindAddProject(handleAddProjectRequest);
    bindProjectSelection(handleProjectSelection);
    bindParentDelete(handleDeleteParentRequest);
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
