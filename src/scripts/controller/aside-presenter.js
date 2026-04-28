const projectListElement = document.querySelector(".sidebar__project-list");
const createProjectButtonElement = document.querySelector(".sidebar__create-project-button");

const bindProjectCreation = (onCreateProjectRequested) => {
  createProjectButtonElement.addEventListener("click", () => {
    onCreateProjectRequested();
  });
};

const bindProjectDeletion = (onProjectDeleteRequested) => {
  projectListElement.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".sidebar__project-delete-button");

    if (!deleteButton) {
      return;
    }

    onProjectDeleteRequested(deleteButton.dataset.name);
  });
};

const bindProjectEdit = (onProjectEditRequested) => {
  projectListElement.addEventListener("click", (e) => {
    const editButton = e.target.closest(".sidebar__project-edit-button");

    if (!editButton) {
      return;
    }

    onProjectEditRequested(editButton.dataset.name);
  });
};

const bindProjectSelection = (onProjectSelected) => {
  projectListElement.addEventListener("click", (e) => {
    const projectButton = e.target.closest(".sidebar__project-button");

    if (!projectButton) {
      return;
    }

    onProjectSelected(projectButton.dataset.name);
  });
};

const renderSidebarProjectList = (sidebarProjects) => {
  projectListElement.textContent = "";

  for (const projectData of sidebarProjects) {
    const projectItem = document.createElement("li");
    projectItem.classList.add("sidebar__project-item");

    const projectContent = document.createElement("div");
    projectContent.classList.add("sidebar__project-content");

    const projectMainRow = document.createElement("div");
    projectMainRow.classList.add("sidebar__project-main-row");

    const projectButton = document.createElement("button");
    projectButton.classList.add("sidebar__project-button");
    projectButton.dataset.id = projectData.projectId;
    projectButton.dataset.name = projectData.projectName;
    projectButton.textContent = projectData.projectName;

    const projectCount = document.createElement("span");
    projectCount.classList.add("sidebar__project-count");
    projectCount.textContent = `(${projectData.parentCount})`;

    projectMainRow.append(projectButton, projectCount);
    projectContent.appendChild(projectMainRow);

    if (projectData.projectName !== "All") {
      const projectMetaRow = document.createElement("div");
      projectMetaRow.classList.add("sidebar__project-meta-row");

      const editButton = document.createElement("button");
      editButton.classList.add("sidebar__project-edit-button");
      editButton.dataset.id = projectData.projectId;
      editButton.dataset.name = projectData.projectName;
      editButton.dataset.action = "edit";
      editButton.textContent = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("sidebar__project-delete-button");
      deleteButton.dataset.id = projectData.projectId;
      deleteButton.dataset.name = projectData.projectName;
      deleteButton.dataset.action = "delete";
      deleteButton.textContent = "Delete";

      projectMetaRow.append(editButton, deleteButton);
      projectContent.appendChild(projectMetaRow);
    }

    projectItem.appendChild(projectContent);
    projectListElement.appendChild(projectItem);
  }

  return { success: true };
};

export {
  bindProjectCreation,
  bindProjectDeletion,
  bindProjectEdit,
  bindProjectSelection,
  renderSidebarProjectList,
};
