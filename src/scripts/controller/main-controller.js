import { combinedService } from "../service/combined-service";
import {
  renderAddParentForm,
  renderAllProjects,
  renderByProjectName,
  renderNewProjectForm,
  renderDeleteParentConfirmation,
  renderDeleteProjectConfirmation,
  renderEditParentForm,
  renderEditProjectForm,
} from "./main-presenter";

const createMainController = () => {
  const buildDisplayHierarchy = () => {
    const hierarchyResult = combinedService.buildAllHierarchy();

    if (!hierarchyResult.success) {
      return {
        success: false,
        reason: "Error - Failed to fetch hierarchy data!",
      };
    }

    const displayHierarchy = new Map();

    for (const [projectId, projectEntry] of hierarchyResult.allHierarchy) {
      const displayProjectName =
        projectEntry.project.name === "All" ? "Unassigned" : projectEntry.project.name;

      displayHierarchy.set(projectId, {
        project: {
          ...projectEntry.project,
          name: displayProjectName,
        },
        parents: projectEntry.parents,
      });
    }

    return {
      success: true,
      allHierarchy: displayHierarchy,
    };
  };

  const buildNonEmptyDisplayHierarchy = () => {
    const hierarchyResult = buildDisplayHierarchy();

    if (!hierarchyResult.success) {
      return hierarchyResult;
    }

    const nonEmptyHierarchy = new Map();

    for (const [projectId, projectEntry] of hierarchyResult.allHierarchy) {
      if (projectEntry.parents.size > 0) {
        nonEmptyHierarchy.set(projectId, projectEntry);
      }
    }

    return {
      success: true,
      allHierarchy: nonEmptyHierarchy,
    };
  };

  const openDeleteProjectConfirmation = (currentProjectName, onDeleteProjectConfirmed) => {
    renderDeleteProjectConfirmation(currentProjectName, onDeleteProjectConfirmed);

    return { success: true };
  };

  const openDeleteParentConfirmation = (parentData, onDeleteParentConfirmed) => {
    renderDeleteParentConfirmation(parentData, onDeleteParentConfirmed);
    return { success: true };
  };

  const openEditParentForm = (parentData, onEditParentSubmitted) => {
    renderEditParentForm(parentData, onEditParentSubmitted);
    return { success: true };
  };

  const openEditProjectForm = (currentProjectName, onRenameProjectSubmitted) => {
    renderEditProjectForm(currentProjectName, onRenameProjectSubmitted);
    return { success: true };
  };

  const openAddParentForm = (projectData, onAddParentSubmitted) => {
    renderAddParentForm(projectData, onAddParentSubmitted);
    return { success: true };
  };

  const openAddProjectForm = (onCreateProjectSubmitted) => {
    renderNewProjectForm(onCreateProjectSubmitted);
    return { success: true };
  };

  const renderAll = () => {
    const hierarchyResult = buildNonEmptyDisplayHierarchy();

    if (!hierarchyResult.success) {
      return hierarchyResult;
    }

    return renderAllProjects(hierarchyResult.allHierarchy);
  };

  const renderProject = (projectName) => {
    if (projectName === "All") {
      return renderAll();
    }

    const hierarchyResult = buildDisplayHierarchy();

    if (!hierarchyResult.success) {
      return hierarchyResult;
    }

    let selectedProject = null;

    for (const [, projectEntry] of hierarchyResult.allHierarchy) {
      if (projectEntry.project.name === projectName) {
        selectedProject = projectEntry;
        break;
      }
    }

    if (!selectedProject) {
      return {
        success: false,
        reason: `Project ${projectName} was not found!`,
      };
    }

    return renderByProjectName(selectedProject);
  };

  return {
    initMain: renderAll,
    openAddParentForm,
    openAddProjectForm,
    openDeleteParentConfirmation,
    openDeleteProjectConfirmation,
    openEditParentForm,
    openEditProjectForm,
    renderAll,
    renderProject,
  };
};

const mainController = createMainController();

export { mainController };
