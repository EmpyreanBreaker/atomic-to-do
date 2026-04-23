import { bindProjectSelection, renderSidebarProjectList } from "./aside-presenter";
import { renderToDosByProjectName } from "./main-presenter";
import { combinedService } from "../service/combined-service";

const initializeAppControllers = () => {
  initializeAsideController();
  initializeMainController();
};

const initializeAsideController = () => {

  const buildSidebarProjectData = () => {
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
    const sidebarProjects = [];

    for (const [, hierarchyEntry] of allHierarchy) {
      const project = hierarchyEntry.project;

      const matchedProjectCount = projectCounts.find((projectCount) => {
        return projectCount.projectName === project.name;
      });

      const parentCount = matchedProjectCount ? matchedProjectCount.parentCount : 0;

      sidebarProjects.push({
        projectId: project.id,
        projectName: project.name,
        parentCount: parentCount,
      });

      sidebarProjects.sort((a, b) => {
        if (a.projectName === "All") return -1;
        if (b.projectName === "All") return 1;

        return a.projectName.localeCompare(b.projectName);
      });
    }

    return {
      success: true,
      sidebarProjects: sidebarProjects,
    };
  };

  const refreshSidebar = (() => {
    const sidebarProjectsResult = buildSidebarProjectData();

    if (!sidebarProjectsResult.success) {
      return { success: false, reason: sidebarProjectsResult.reason };
    }

    renderSidebarProjectList(sidebarProjectsResult.sidebarProjects);

    return { success: true };
  })();

  // Call and activate the listener
  // Pass it an anonymous function which the presenter will use as a callback
  bindProjectSelection((selectedProject) => renderToDosByProjectName(selectedProject));

  return refreshSidebar;
};

const initializeMainController = ({ getBuildHierarchy }) => {
  const initializeMain = ((projectName = "All") => {
    const allHierarchyResult = buildMainProjectData(getBuildHierarchy);

    if (!allHierarchyResult.success) {
      return { success: false, reason: allHierarchyResult.reason };
    }

    renderToDosByProjectName(allHierarchyResult.allHierarchy, projectName);
  })();
};

const buildMainProjectData = (getBuildHierarchy) => {
  const hierarchyResult = getBuildHierarchy();

  if (!hierarchyResult.success) {
    return {
      success: false,
      reason: "Error - Failed to fetch hierarchy data!",
    };
  }

  const allHierarchy = hierarchyResult.allHierarchy;
  for (const [outerKey, outerValue] of allHierarchy) {
    if (outerValue.project.name === "All") {
      outerValue.project.name = "Unassigned";
    }
  }

  return {
    success: true,
    allHierarchy: allHierarchy,
  };
};

export { initializeAppControllers };
