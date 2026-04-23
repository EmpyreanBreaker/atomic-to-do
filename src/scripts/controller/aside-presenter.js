const projectListElement = document.querySelector(".sidebar__project-list");

const renderSidebarProjectList = (sidebarProjects) => {
  projectListElement.textContent = "";

  for (const projectData of sidebarProjects) {
    const projectItem = document.createElement("li");
    projectItem.classList.add("sidebar__project-item");

    const projectRow = document.createElement("div");
    projectRow.classList.add("sidebar__project-row");

    const projectButton = document.createElement("button");
    projectButton.classList.add("sidebar__project-button");
    projectButton.dataset.id = projectData.projectId;
    projectButton.dataset.name = projectData.projectName;
    projectButton.textContent = projectData.projectName;

    const projectCount = document.createElement("span");
    projectCount.classList.add("sidebar__project-count");
    projectCount.textContent = `(${projectData.parentCount})`;

    projectRow.append(projectButton, projectCount);
    projectItem.appendChild(projectRow);
    projectListElement.appendChild(projectItem);
  }

  return { success: true };
};

const bindProjectSelection = (onProjectSelected) => {
  projectListElement.addEventListener("click", (e) => {
    const projectButton = e.target.closest(".sidebar__project-button");

    if (!projectButton) {
      return;
    }

    console.log(projectButton.dataset.name);
    onProjectSelected(projectButton.dataset.name);
  });
};

export { renderSidebarProjectList, bindProjectSelection };
