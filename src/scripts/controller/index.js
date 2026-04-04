import "../../css/reset.css";
import "../../css/styles.css";
import { parentService } from "../service/parent-service";
import { projectService } from "../service/project-service";

// Run on page load
(() => {
  // =================================
  // PROJECT READ & LOAD STORAGE
  // =================================
  projectService.initializeProjectAppData();
  projectService.loadProjectAppData();
  // =================================
  // PROJECT EXAMPLES & TESTS
  // =================================
  projectService.createProject("Home");
  projectService.createProject("Career");
  // projectService.createProject("Work");
  projectService.createProject("Relationship");
  //projectService.changeProjectName("Work", "Career");
  projectService.createProject("Education");
  projectService.testProjectDisplay();

  // =================================
  // PARENT READ & LOAD STORAGE
  // =================================
  parentService.initializeParentAppData();
  parentService.loadParentAppData();
  // =================================
  // PARENT EXAMPLES & TESTS
  // =================================
  // Creation handled in service due
  // Otherwise creation causes duplicate data
  // Because each run makes a new parentId due to crypto.randomUID()
  // This will not be a problem with UI creation since creation will be temporary
  parentService.testParentDisplay();
  // Original: Wipe counters, sweep floor, and take out trash
  // parentService.changeParentDescription("8b7116db-a247-4c78-a3af-6e686486c5f4", "Wipe counters, sweep and mop floors, then take out trash");
  // Original: 2026-04-07
  // parentService.changeParentDueDate("7ea95ec6-b125-4b47-b0ec-fd55b360309a", "2027-05-08");
  // Original: bf913988-69e8-4a6b-9625-544141de2a83
  // parentService.changeParentProjectId("7ea95ec6-b125-4b47-b0ec-fd55b360309a", "858577d7-8efb-4302-9149-1b0708d7163c");
  // Changed back
  // parentService.changeParentProjectId("7ea95ec6-b125-4b47-b0ec-fd55b360309a", "bf913988-69e8-4a6b-9625-544141de2a83");
  // Original: incomplete
  // parentService.changeParentStatus("8b7116db-a247-4c78-a3af-6e686486c5f4");
  // Original: Clean kitchen
  // parentService.changeParentTitle("8b7116db-a247-4c78-a3af-6e686486c5f4", "Thoroughly clean the kitchen");
  parentService.testParentDisplay();
})();
