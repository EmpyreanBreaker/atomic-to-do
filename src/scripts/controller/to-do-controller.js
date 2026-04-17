import { bindProjectSelection, renderSidebarProjectList } from "./aside-presenter";
import { renderToDosByProjectName } from "./main-presenter";

const initializeAppControllers = ({ getBuildHierarchy, getParentCounts, renderToDosByProjectName }) => {
  initializeAsideController({ getBuildHierarchy, getParentCounts });
  initializeMainController({ getBuildHierarchy });
};

// Aside controller responsibilities:
// 1. Receive aside dependencies from index.js.
// 2. Use closure so helper functions can access those dependencies
//    without needing them passed repeatedly.
// 3. Handle aside-specific orchestration:
//    - build sidebar data
//    - refresh sidebar UI
//    - bind sidebar events
//    - activate presenter functions especially the listener through call on first init in index.js
// 4. Keep initialization readable by placing larger logic in helpers.
// 5. Return controller helpers only if another module truly needs them.
const initializeAsideController = ({ getBuildHierarchy, getParentCounts }) => {
  // Feed our helper functions with closure
  // Generate cleaner data structure for sidebar presenter and refresh sidebar with that data
  // Refresh sidebar starts as an IIFE when the project first runs but is returned so we can call it as needed
  const refreshSidebar = (() => {
    const sidebarProjectsResult = buildSidebarProjectData(getBuildHierarchy, getParentCounts);

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

// Helper function
const buildSidebarProjectData = (getBuildHierarchy, getParentCounts) => {
  const hierarchyResult = getBuildHierarchy();
  const parentCountsResult = getParentCounts();

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
  }

  return {
    success: true,
    sidebarProjects: sidebarProjects,
  };
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
