// Projects
(() => {
    // Should be rejected - Default Project
    projectManager.addProjectToManagerArray("Home");
    projectManager.deleteProjectFromManagerArray("Home");
    projectManager.renameProjectInManagerArray("Home", "Home");
    // Valid Additions
    projectManager.addProjectToManagerArray("Relationship");
    projectManager.addProjectToManagerArray("School");
    projectManager.addProjectToManagerArray("Work");
    projectManager.displayProjectsInManagerArray();
    // Valid Deletions
    projectManager.deleteProjectFromManagerArray("Relationship");
    projectManager.deleteProjectFromManagerArray("Work");
    projectManager.displayProjectsInManagerArray();
    // Invalid Deletions
    projectManager.deleteProjectFromManagerArray("Relationship");
    projectManager.deleteProjectFromManagerArray("Work");
    // Valid Renames
    projectManager.renameProjectInManagerArray("School", "Education");
    projectManager.displayProjectsInManagerArray();
    // Invalid Renames
    projectManager.renameProjectInManagerArray("BadName", "GoodName");
    projectManager.displayProjectsInManagerArray();
})()