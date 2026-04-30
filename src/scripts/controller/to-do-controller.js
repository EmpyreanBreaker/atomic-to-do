import { atomicService } from "../service/atomic-service";
import { combinedService } from "../service/combined-service";
import { parentService } from "../service/parent-service";
import { projectService } from "../service/project-service";
import { asideController } from "./aside-controller";
import { bindAddProject, bindDeleteProject, bindEditProject, bindSelectProject } from "./aside-presenter";
import { mainController } from "./main-controller";
import {
  bindAddAtomic,
  bindAddParent,
  bindDeleteAtomic,
  bindDeleteParent,
  bindEditAtomic,
  bindEditParent,
  bindToggleAtomicStatus,
  bindToggleParentStatus,
} from "./main-presenter";

const createToDoController = () => {
  let selectedProjectName = "All";

  const bindEvents = () => {
    bindAddAtomic(handleAddAtomicRequest);
    bindAddParent(handleAddParentRequest);
    bindAddProject(handleAddProjectRequest);
    bindDeleteAtomic(handleDeleteAtomicRequest);
    bindDeleteParent(handleDeleteParentRequest);
    bindDeleteProject(handleDeleteProjectRequest);
    bindEditAtomic(handleEditAtomicRequest);
    bindEditParent(handleEditParentRequest);
    bindEditProject(handleEditProjectRequest);
    bindSelectProject(handleSelectProject);
    bindToggleAtomicStatus(handleToggleAtomicStatus);
    bindToggleParentStatus(handleToggleParentStatus);

    return { success: true };
  };

  const handleAddAtomicRequest = (parentData) => {
    return mainController.openAddAtomicForm(parentData, handleAddAtomicSubmit);
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
    return mainController.openAddProjectForm(handleAddProjectSubmit);
  };

  const handleAddProjectSubmit = (projectName) => {
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

  const handleDeleteAtomicRequest = (atomicData) => {
    return mainController.openDeleteAtomicConfirmation(atomicData, handleDeleteAtomicConfirm);
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

  const handleDeleteProjectConfirm = (projectName) => {
    const deletionResult = combinedService.removeProjectAndChildren(projectName);

    if (!deletionResult.success) {
      return deletionResult;
    }

    if (selectedProjectName === projectName) {
      selectedProjectName = "All";
    }

    return refreshDisplay();
  };

  const handleDeleteProjectRequest = (projectName) => {
    return mainController.openDeleteProjectConfirmation(projectName, handleDeleteProjectConfirm);
  };

  const handleEditAtomicRequest = (atomicData) => {
    return mainController.openEditAtomicForm(atomicData, handleEditAtomicSubmit);
  };

  const handleEditParentRequest = (parentData) => {
    return mainController.openEditParentForm(parentData, handleEditParentSubmit);
  };

  const handleEditAtomicSubmit = (editedAtomicData) => {
    const taskResult = atomicService.changeAtomicTask(editedAtomicData.atomicId, editedAtomicData.task);

    if (!taskResult.success) {
      return taskResult;
    }

    const statusResult = atomicService.changeAtomicStatus(editedAtomicData.atomicId, editedAtomicData.status);

    if (!statusResult.success) {
      return statusResult;
    }

    const dueDateResult = atomicService.changeAtomicDueDate(
      editedAtomicData.atomicId,
      editedAtomicData.dueDate,
    );

    if (!dueDateResult.success) {
      return dueDateResult;
    }

    return refreshDisplay();
  };

  const handleEditParentSubmit = (editedParentData) => {
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

    const statusResult = parentService.changeParentStatus(editedParentData.parentId, editedParentData.status);

    if (!statusResult.success) {
      return statusResult;
    }

    const titleResult = parentService.changeParentTitle(editedParentData.parentId, editedParentData.title);

    if (!titleResult.success) {
      return titleResult;
    }

    return refreshDisplay();
  };

  const handleEditProjectRequest = (projectName) => {
    return mainController.openEditProjectForm(projectName, handleEditProjectSubmit);
  };

  const handleEditProjectSubmit = (currentProjectName, newProjectName) => {
    const renameResult = projectService.changeProjectName(currentProjectName, newProjectName);

    if (!renameResult.success) {
      return renameResult;
    }

    if (selectedProjectName === currentProjectName) {
      selectedProjectName = renameResult.name;
    }

    return refreshDisplay();
  };

  const handleSelectProject = (projectName) => {
    selectedProjectName = projectName;
    return refreshDisplay();
  };

  const handleToggleAtomicStatus = (atomicStatusData) => {
    const statusResult = atomicService.changeAtomicStatus(atomicStatusData.atomicId, atomicStatusData.status);

    if (!statusResult.success) {
      return statusResult;
    }

    return refreshDisplay();
  };

  const handleToggleParentStatus = (parentStatusData) => {
    const statusResult = parentService.changeParentStatus(parentStatusData.parentId, parentStatusData.status);

    if (!statusResult.success) {
      return statusResult;
    }

    return refreshDisplay();
  };

  const init = () => {
    initStorage();
    loadStorage();
    initDisplay();
    bindEvents();

    return { success: true };
  };

  const initDisplay = () => {
    return refreshDisplay();
  };

  const initStorage = () => {
    return combinedService.initializeAppData();
  };

  const loadStorage = () => {
    return combinedService.loadAppData();
  };

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

  return {
    init,
    initDisplay,
    initStorage,
    loadStorage,
  };
};

const toDoController = createToDoController();

export { toDoController };
