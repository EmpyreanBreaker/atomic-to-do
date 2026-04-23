import { renderAllProjects, renderByProjectName } from "./main-presenter";
import { combinedService } from "../service/combined-service";

const initializeMainController = () => {
  const buildMainProjectData = () => {
    // Edit the project data into a more manageable format
    const hierarchyResult = combinedService.buildAllHierarchy();
    const parentCountsResult = combinedService.getParentCounts();

    if (!hierarchyResult.success) {
      return {
        success: false,
        reason: "Error - Failed to fetch hierarchy data!",
      };
    }

    if (!parentCountsResult.success) {
      return {
        success: false,
        reason: parentCountsResult.reason,
      };
    }

    const allHierarchy = hierarchyResult.allHierarchy;
    const projectCounts = parentCountsResult.projectCounts;
    const keysToRemove = [];

    // Clean up the data
    // Rename All to Unassigned
    // Identify projects with 0 children
    for (const [outerKey, outerValue] of allHierarchy) {
      if (outerValue.project.name === "All") {
        outerValue.project.name = "Unassigned";
      }

      if (outerValue.parents.size === 0) {
        keysToRemove.push(outerKey);
      }
    }

    // Delete projects with 0 children from the display map
    // Storage and sidebar displays are unaffected
    for (const key of keysToRemove) {
      allHierarchy.delete(key);
    }

    return {
      success: true,
      allHierarchy: allHierarchy,
    };
  };

  const initMain = () => {
    const allHierarchyResult = buildMainProjectData();

    if (!allHierarchyResult.success) {
      return { success: false, reason: allHierarchyResult.reason };
    }

    renderAllProjects(allHierarchyResult.allHierarchy);
  };

  const buildByProjectName = (projectName) => {
    if (projectName === "All") {
      initMain();
      return { success: true };
    }

    renderByProjectName(projectName);

    return { success: true };
  };

  return { initMain, buildByProjectName };
};

const mainController = initializeMainController();
export { mainController };
