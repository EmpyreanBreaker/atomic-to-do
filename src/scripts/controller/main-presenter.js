const projectContainerElement = document.querySelector(".main__project-container");

const renderToDosByProjectName = (allHierarchy, projectName) => {
  if (projectName === "All") {
    renderAllProjects(allHierarchy);
    return { success: true };
  }
  mainElement.textContent = "";
  mainElement.textContent = `Selected Project: ${projectName}`;
};

const renderAllProjects = (allHierarchy) => {
  for (const [, outerValue] of allHierarchy) {
    const project = outerValue.project;

    const projectCard = document.createElement("div");
    projectCard.classList.add("main__project-card");

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("main__project-header");

    const projectName = document.createElement("p");
    projectName.classList.add("main__project-name");
    projectName.textContent = `PROJECT: ${project.name}`;

    projectHeader.append(projectName);

    const projectParents = document.createElement("div");
    projectParents.classList.add("main__project-parents");

    for (const [, innerValue] of outerValue.parents) {
      const parent = innerValue.parent;

      const parentCard = document.createElement("div");
      parentCard.classList.add("main__parent-card");

      const parentHeader = document.createElement("div");
      parentHeader.classList.add("main__parent-header");

      const parentTitle = document.createElement("p");
      parentTitle.classList.add("main__parent-title");
      parentTitle.textContent = `PARENT: ${parent.title}`;

      const parentStatus = document.createElement("span");
      parentStatus.classList.add("main__parent-status");
      parentStatus.textContent = `[${parent.status}]`;

      const parentDescription = document.createElement("p");
      parentDescription.classList.add("main__parent-description");
      parentDescription.textContent = `Description: ${parent.description}`;

      const parentDueDate = document.createElement("p");
      parentDueDate.classList.add("main__parent-due-date");
      parentDueDate.textContent = `Due Date: ${parent.dueDate}`;

      parentHeader.append(parentTitle, parentStatus);
      parentCard.append(parentHeader, parentDescription, parentDueDate);
      projectParents.append(parentCard);
    }

    projectCard.append(projectHeader, projectParents);
    projectContainerElement.append(projectCard);
  }
};
export { renderToDosByProjectName, renderAllProjects };
