import { renderSidebarProjectList } from "./aside-presenter";
import { combinedService } from "../service/combined-service";

const initializeAsideController = () => {
  // Edit the project data into a more manageable format
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

  // USe the project data to create the sidebar
  const initSidebar = () => {
    const sidebarProjectsResult = buildSidebarProjectData();

    if (!sidebarProjectsResult.success) {
      return { success: false, reason: sidebarProjectsResult.reason };
    }

    renderSidebarProjectList(sidebarProjectsResult.sidebarProjects);

    return { success: true };
  };

  const refreshSidebar = () => {
    initSidebar();
  };

  return { initSidebar, refreshSidebar };
};

const asideController = initializeAsideController();
export { asideController };
