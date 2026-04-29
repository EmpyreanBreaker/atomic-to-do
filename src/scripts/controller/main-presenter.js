const projectContainerElement = document.querySelector(".main__project-container");

const clearProjectContainer = () => {
  projectContainerElement.textContent = "";
};

const formatDisplayDate = (dateString) => {
  if (!dateString) {
    return "No due date";
  }

  const [year, month, day] = dateString.split("-");

  if (!year || !month || !day) {
    return dateString;
  }

  return `${month}/${day}/${year}`;
};

const bindAddAtomic = (onAddAtomicRequested) => {
  projectContainerElement.addEventListener("click", (e) => {
    const addAtomicButton = e.target.closest(".main__action-button--add-atomic");

    if (!addAtomicButton) {
      return;
    }

    onAddAtomicRequested({
      parentId: addAtomicButton.dataset.parentId,
      parentTitle: addAtomicButton.dataset.parentTitle,
    });
  });
};

const bindAddParent = (onAddParentRequested) => {
  projectContainerElement.addEventListener("click", (e) => {
    const addParentButton = e.target.closest(".main__action-button--add-parent");

    if (!addParentButton) {
      return;
    }

    onAddParentRequested({
      projectId: addParentButton.dataset.projectId,
      projectName: addParentButton.dataset.projectName,
    });
  });
};

const bindDeleteAtomic = (onAtomicDeleteRequested) => {
  projectContainerElement.addEventListener("click", (e) => {
    const deleteAtomicButton = e.target.closest(".main__action-button--delete-atomic");

    if (!deleteAtomicButton) {
      return;
    }

    onAtomicDeleteRequested({
      atomicId: deleteAtomicButton.dataset.atomicId,
      atomicTask: deleteAtomicButton.dataset.atomicTask,
    });
  });
};

const bindDeleteParent = (onParentDeleteRequested) => {
  projectContainerElement.addEventListener("click", (e) => {
    const deleteParentButton = e.target.closest(".main__action-button--delete-parent");

    if (!deleteParentButton) {
      return;
    }

    onParentDeleteRequested({
      parentId: deleteParentButton.dataset.parentId,
      parentTitle: deleteParentButton.dataset.parentTitle,
    });
  });
};

const bindEditParent = (onParentEditRequested) => {
  projectContainerElement.addEventListener("click", (e) => {
    const editParentButton = e.target.closest(".main__action-button--edit-parent");

    if (!editParentButton) {
      return;
    }

    onParentEditRequested({
      parentId: editParentButton.dataset.parentId,
      parentTitle: editParentButton.dataset.parentTitle,
      parentDescription: editParentButton.dataset.parentDescription,
      parentDueDate: editParentButton.dataset.parentDueDate,
      parentStatus: editParentButton.dataset.parentStatus,
    });
  });
};

const createActionButton = ({ text, className, dataset = {} }) => {
  const button = document.createElement("button");
  button.classList.add("main__action-button", className);
  button.textContent = text;

  Object.entries(dataset).forEach(([key, value]) => {
    button.dataset[key] = value;
  });

  return button;
};

const createStatusCheckbox = ({ id, checked, dataset = {}, className }) => {
  const checkbox = document.createElement("input");
  checkbox.classList.add(className);
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = checked;

  Object.entries(dataset).forEach(([key, value]) => {
    checkbox.dataset[key] = value;
  });

  return checkbox;
};

const createAtomicRow = (atomic) => {
  const atomicCard = document.createElement("div");
  atomicCard.classList.add("main__atomic-card");
  atomicCard.dataset.atomicId = atomic.id;

  const atomicInfoRow = document.createElement("div");
  atomicInfoRow.classList.add("main__atomic-info-row");

  const atomicStatus = document.createElement("div");
  atomicStatus.classList.add("main__atomic-status-cell");

  const atomicCheckbox = createStatusCheckbox({
    id: `atomic-status-${atomic.id}`,
    checked: atomic.status === "complete",
    className: "main__atomic-status",
    dataset: {
      entityType: "atomic",
      entityId: atomic.id,
      field: "status",
    },
  });

  const atomicTask = document.createElement("p");
  atomicTask.classList.add("main__atomic-task");
  atomicTask.textContent = atomic.task || "Untitled atomic task";

  const atomicDueDate = document.createElement("p");
  atomicDueDate.classList.add("main__atomic-due-date");
  atomicDueDate.textContent = formatDisplayDate(atomic.dueDate);

  const atomicActions = document.createElement("div");
  atomicActions.classList.add("main__atomic-actions");

  const editAtomicButton = createActionButton({
    text: "Edit Atomic",
    className: "main__action-button--edit-atomic",
    dataset: {
      atomicId: atomic.id,
      atomicTask: atomic.task,
    },
  });

  const deleteAtomicButton = createActionButton({
    text: "Delete Atomic",
    className: "main__action-button--delete-atomic",
    dataset: {
      atomicId: atomic.id,
      atomicTask: atomic.task,
    },
  });

  atomicStatus.append(atomicCheckbox);
  atomicActions.append(editAtomicButton, deleteAtomicButton);
  atomicInfoRow.append(atomicStatus, atomicTask, atomicDueDate, atomicActions);
  atomicCard.append(atomicInfoRow);

  return atomicCard;
};

const createParentCard = (parentEntry) => {
  const parent = parentEntry.parent;

  const parentCard = document.createElement("div");
  parentCard.classList.add("main__parent-card");
  parentCard.dataset.parentId = parent.id;

  const parentInfoRow = document.createElement("div");
  parentInfoRow.classList.add("main__parent-info-row");

  const parentStatus = document.createElement("div");
  parentStatus.classList.add("main__parent-status-cell");

  const parentCheckbox = createStatusCheckbox({
    id: `parent-status-${parent.id}`,
    checked: parent.status === "complete",
    className: "main__parent-status",
    dataset: {
      entityType: "parent",
      entityId: parent.id,
      field: "status",
    },
  });

  const parentTitle = document.createElement("p");
  parentTitle.classList.add("main__parent-title");
  parentTitle.textContent = parent.title || "Untitled parent";

  const parentDueDate = document.createElement("p");
  parentDueDate.classList.add("main__parent-due-date");
  parentDueDate.textContent = formatDisplayDate(parent.dueDate);

  const parentActions = document.createElement("div");
  parentActions.classList.add("main__parent-actions");

  const editParentButton = createActionButton({
    text: "Edit Parent",
    className: "main__action-button--edit-parent",
    dataset: {
      parentId: parent.id,
      parentTitle: parent.title || "",
      parentDescription: parent.description || "",
      parentDueDate: parent.dueDate || "",
      parentStatus: parent.status || "incomplete",
    },
  });

  const deleteParentButton = createActionButton({
    text: "Delete Parent",
    className: "main__action-button--delete-parent",
    dataset: {
      parentId: parent.id,
      parentTitle: parent.title,
    },
  });

  parentStatus.append(parentCheckbox);
  parentActions.append(editParentButton, deleteParentButton);
  parentInfoRow.append(parentStatus, parentTitle, parentDueDate, parentActions);

  const parentDescription = document.createElement("p");
  parentDescription.classList.add("main__parent-description");
  parentDescription.textContent = parent.description || "No description";

  const atomicList = document.createElement("div");
  atomicList.classList.add("main__atomic-list");

  for (const atomic of parentEntry.atomics) {
    atomicList.append(createAtomicRow(atomic));
  }

  const parentFooter = document.createElement("div");
  parentFooter.classList.add("main__parent-footer");

  const addAtomicButton = createActionButton({
    text: "+ Add Atomic",
    className: "main__action-button--add-atomic",
    dataset: {
      parentId: parent.id,
      parentTitle: parent.title,
    },
  });

  parentFooter.append(addAtomicButton);

  parentCard.append(parentInfoRow, parentDescription, atomicList, parentFooter);

  return parentCard;
};

const createProjectCard = (projectEntry) => {
  const projectCard = document.createElement("div");
  projectCard.classList.add("main__project-card");
  projectCard.dataset.projectId = projectEntry.project.id;

  const projectHeader = document.createElement("div");
  projectHeader.classList.add("main__project-header");

  const projectName = document.createElement("h2");
  projectName.classList.add("main__project-name");
  projectName.textContent = `PROJECT: ${projectEntry.project.name}`;

  projectHeader.append(projectName);

  const projectParents = document.createElement("div");
  projectParents.classList.add("main__project-parents");

  for (const [, parentEntry] of projectEntry.parents) {
    projectParents.append(createParentCard(parentEntry));
  }

  const projectFooter = document.createElement("div");
  projectFooter.classList.add("main__project-footer");

  const addParentButton = createActionButton({
    text: "+ Add Parent",
    className: "main__action-button--add-parent",
    dataset: {
      projectId: projectEntry.project.id,
      projectName: projectEntry.project.name,
    },
  });

  projectFooter.append(addParentButton);
  projectCard.append(projectHeader, projectParents, projectFooter);

  return projectCard;
};

const renderAddAtomicForm = (parentData, onAddAtomicSubmitted) => {
  const existingDialog = document.querySelector(".dialog--add-atomic");

  if (existingDialog) {
    existingDialog.showModal();
    return;
  }

  const addAtomicDialog = document.createElement("dialog");
  addAtomicDialog.classList.add("dialog", "dialog--add-atomic");

  const addAtomicForm = document.createElement("form");
  addAtomicForm.classList.add("dialog__form");

  const addAtomicTitle = document.createElement("h2");
  addAtomicTitle.classList.add("dialog__title");
  addAtomicTitle.textContent = `Add Atomic to ${parentData.parentTitle}`;

  const taskGroup = document.createElement("div");
  taskGroup.classList.add("dialog__field-group");

  const taskLabel = document.createElement("label");
  taskLabel.classList.add("dialog__field-label");
  taskLabel.textContent = "Task:";
  taskLabel.setAttribute("for", "add-atomic-task-input");

  const taskInput = document.createElement("input");
  taskInput.classList.add("dialog__field-input");
  taskInput.type = "text";
  taskInput.id = "add-atomic-task-input";
  taskInput.required = true;

  taskGroup.append(taskLabel, taskInput);

  const statusGroup = document.createElement("div");
  statusGroup.classList.add("dialog__field-group");

  const statusLabel = document.createElement("label");
  statusLabel.classList.add("dialog__field-label");
  statusLabel.textContent = "Complete:";
  statusLabel.setAttribute("for", "add-atomic-status-input");

  const statusInput = document.createElement("input");
  statusInput.type = "checkbox";
  statusInput.id = "add-atomic-status-input";
  statusInput.checked = false;

  statusGroup.append(statusLabel, statusInput);

  const dueDateGroup = document.createElement("div");
  dueDateGroup.classList.add("dialog__field-group");

  const dueDateLabel = document.createElement("label");
  dueDateLabel.classList.add("dialog__field-label");
  dueDateLabel.textContent = "Due Date:";
  dueDateLabel.setAttribute("for", "add-atomic-due-date-input");

  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("dialog__field-input");
  dueDateInput.type = "date";
  dueDateInput.id = "add-atomic-due-date-input";
  dueDateInput.required = true;

  dueDateGroup.append(dueDateLabel, dueDateInput);

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("dialog__button-group");

  const createButton = document.createElement("button");
  createButton.classList.add("dialog__button");
  createButton.type = "submit";
  createButton.textContent = "Add Atomic";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  addAtomicForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newAtomicData = {
      parentId: parentData.parentId,
      task: taskInput.value.trim(),
      status: statusInput.checked ? "complete" : "incomplete",
      dueDate: dueDateInput.value,
    };

    if (newAtomicData.task === "") {
      alert("Atomic task cannot be blank.");
      return;
    }

    if (newAtomicData.dueDate === "") {
      alert("Due date is required.");
      return;
    }

    const creationResult = onAddAtomicSubmitted(newAtomicData);

    if (!creationResult.success) {
      alert(creationResult.reason);
      return;
    }

    addAtomicDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    addAtomicDialog.close();
  });

  buttonGroup.append(createButton, cancelButton);
  addAtomicForm.append(addAtomicTitle, taskGroup, statusGroup, dueDateGroup, buttonGroup);

  addAtomicDialog.append(addAtomicForm);
  document.body.append(addAtomicDialog);

  addAtomicDialog.addEventListener("close", () => {
    addAtomicDialog.remove();
  });

  addAtomicDialog.showModal();
  taskInput.focus();
};

const renderAddParentForm = (projectData, onAddParentSubmitted) => {
  const existingDialog = document.querySelector(".dialog--add-parent");

  if (existingDialog) {
    existingDialog.showModal();
    return;
  }

  const addParentDialog = document.createElement("dialog");
  addParentDialog.classList.add("dialog", "dialog--add-parent");

  const addParentForm = document.createElement("form");
  addParentForm.classList.add("dialog__form");

  const addParentTitle = document.createElement("h2");
  addParentTitle.classList.add("dialog__title");
  addParentTitle.textContent = `Add Parent to ${projectData.projectName}`;

  const titleGroup = document.createElement("div");
  titleGroup.classList.add("dialog__field-group");

  const titleLabel = document.createElement("label");
  titleLabel.classList.add("dialog__field-label");
  titleLabel.textContent = "Title:";
  titleLabel.setAttribute("for", "add-parent-title-input");

  const titleInput = document.createElement("input");
  titleInput.classList.add("dialog__field-input");
  titleInput.type = "text";
  titleInput.id = "add-parent-title-input";
  titleInput.required = true;

  titleGroup.append(titleLabel, titleInput);

  const statusGroup = document.createElement("div");
  statusGroup.classList.add("dialog__field-group");

  const statusLabel = document.createElement("label");
  statusLabel.classList.add("dialog__field-label");
  statusLabel.textContent = "Complete:";
  statusLabel.setAttribute("for", "add-parent-status-input");

  const statusInput = document.createElement("input");
  statusInput.type = "checkbox";
  statusInput.id = "add-parent-status-input";
  statusInput.checked = false;

  statusGroup.append(statusLabel, statusInput);

  const descriptionGroup = document.createElement("div");
  descriptionGroup.classList.add("dialog__field-group");

  const descriptionLabel = document.createElement("label");
  descriptionLabel.classList.add("dialog__field-label");
  descriptionLabel.textContent = "Description:";
  descriptionLabel.setAttribute("for", "add-parent-description-input");

  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("dialog__field-input");
  descriptionInput.id = "add-parent-description-input";

  descriptionGroup.append(descriptionLabel, descriptionInput);

  const dueDateGroup = document.createElement("div");
  dueDateGroup.classList.add("dialog__field-group");

  const dueDateLabel = document.createElement("label");
  dueDateLabel.classList.add("dialog__field-label");
  dueDateLabel.textContent = "Due Date:";
  dueDateLabel.setAttribute("for", "add-parent-due-date-input");

  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("dialog__field-input");
  dueDateInput.type = "date";
  dueDateInput.id = "add-parent-due-date-input";
  dueDateInput.required = true;

  dueDateGroup.append(dueDateLabel, dueDateInput);

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("dialog__button-group");

  const createButton = document.createElement("button");
  createButton.classList.add("dialog__button");
  createButton.type = "submit";
  createButton.textContent = "Add Parent";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  addParentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newParentData = {
      projectId: projectData.projectId,
      title: titleInput.value.trim(),
      status: statusInput.checked ? "complete" : "incomplete",
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value,
    };

    if (newParentData.title === "") {
      alert("Parent title cannot be blank.");
      return;
    }

    if (newParentData.dueDate === "") {
      alert("Due date is required.");
      return;
    }

    const creationResult = onAddParentSubmitted(newParentData);

    if (!creationResult.success) {
      alert(creationResult.reason);
      return;
    }

    addParentDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    addParentDialog.close();
  });

  buttonGroup.append(createButton, cancelButton);
  addParentForm.append(addParentTitle, titleGroup, statusGroup, descriptionGroup, dueDateGroup, buttonGroup);

  addParentDialog.append(addParentForm);
  document.body.append(addParentDialog);

  addParentDialog.addEventListener("close", () => {
    addParentDialog.remove();
  });

  addParentDialog.showModal();
  titleInput.focus();
};

const renderAllProjects = (allHierarchy) => {
  const projectEntries = [];

  for (const [, projectEntry] of allHierarchy) {
    projectEntries.push(projectEntry);
  }

  return renderProjectEntries(projectEntries);
};

const renderByProjectName = (selectedProject) => {
  return renderProjectEntries([selectedProject]);
};

const renderDeleteAtomicConfirmation = (atomicData, onDeleteAtomicConfirmed) => {
  const deleteAtomicDialog = document.createElement("dialog");
  deleteAtomicDialog.classList.add("dialog", "dialog--delete-atomic");

  const deleteAtomicForm = document.createElement("form");
  deleteAtomicForm.classList.add("dialog__form");

  const deleteAtomicTitle = document.createElement("h2");
  deleteAtomicTitle.classList.add("dialog__title");
  deleteAtomicTitle.textContent = "Delete Atomic";

  const deleteAtomicMessage = document.createElement("p");
  deleteAtomicMessage.classList.add("dialog__message");
  deleteAtomicMessage.textContent = `Are you sure you want to delete "${atomicData.atomicTask}"?`;

  const deleteAtomicButtonGroup = document.createElement("div");
  deleteAtomicButtonGroup.classList.add("dialog__button-group");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("dialog__button");
  confirmButton.type = "submit";
  confirmButton.textContent = "Yes";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "No";

  deleteAtomicForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const deletionResult = onDeleteAtomicConfirmed(atomicData.atomicId);

    if (!deletionResult.success) {
      alert(deletionResult.reason);
      return;
    }

    deleteAtomicDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    deleteAtomicDialog.close();
  });

  deleteAtomicButtonGroup.append(confirmButton, cancelButton);
  deleteAtomicForm.append(deleteAtomicTitle, deleteAtomicMessage, deleteAtomicButtonGroup);

  deleteAtomicDialog.append(deleteAtomicForm);
  document.body.append(deleteAtomicDialog);

  deleteAtomicDialog.addEventListener("close", () => {
    deleteAtomicDialog.remove();
  });

  deleteAtomicDialog.showModal();
};

const renderDeleteParentConfirmation = (parentData, onDeleteParentConfirmed) => {
  const deleteParentDialog = document.createElement("dialog");
  deleteParentDialog.classList.add("dialog", "dialog--delete-parent");

  const deleteParentForm = document.createElement("form");
  deleteParentForm.classList.add("dialog__form");

  const deleteParentTitle = document.createElement("h2");
  deleteParentTitle.classList.add("dialog__title");
  deleteParentTitle.textContent = "Delete Parent";

  const deleteParentMessage = document.createElement("p");
  deleteParentMessage.classList.add("dialog__message");
  deleteParentMessage.textContent = `Are you sure you want to delete "${parentData.parentTitle}" and all related atomic to-dos?`;

  const deleteParentButtonGroup = document.createElement("div");
  deleteParentButtonGroup.classList.add("dialog__button-group");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("dialog__button");
  confirmButton.type = "submit";
  confirmButton.textContent = "Yes";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "No";

  deleteParentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const deletionResult = onDeleteParentConfirmed(parentData.parentId);

    if (!deletionResult.success) {
      alert(deletionResult.reason);
      return;
    }

    deleteParentDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    deleteParentDialog.close();
  });

  deleteParentButtonGroup.append(confirmButton, cancelButton);
  deleteParentForm.append(deleteParentTitle, deleteParentMessage, deleteParentButtonGroup);

  deleteParentDialog.append(deleteParentForm);
  document.body.append(deleteParentDialog);

  deleteParentDialog.addEventListener("close", () => {
    deleteParentDialog.remove();
  });

  deleteParentDialog.showModal();
};

const renderDeleteProjectConfirmation = (currentProjectName, onDeleteProjectConfirmed) => {
  const deleteProjectDialog = document.createElement("dialog");
  deleteProjectDialog.classList.add("dialog", "dialog--delete-project");

  const deleteProjectForm = document.createElement("form");
  deleteProjectForm.classList.add("dialog__form");

  const deleteProjectTitle = document.createElement("h2");
  deleteProjectTitle.classList.add("dialog__title");
  deleteProjectTitle.textContent = "Delete Project";

  const deleteProjectMessage = document.createElement("p");
  deleteProjectMessage.classList.add("dialog__message");
  deleteProjectMessage.textContent = `Are you sure you want to delete "${currentProjectName}" and all related to-dos?`;

  const deleteProjectButtonGroup = document.createElement("div");
  deleteProjectButtonGroup.classList.add("dialog__button-group");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("dialog__button");
  confirmButton.type = "submit";
  confirmButton.textContent = "Yes";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "No";

  deleteProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const deletionResult = onDeleteProjectConfirmed(currentProjectName);

    if (!deletionResult.success) {
      alert(deletionResult.reason);
      return;
    }

    deleteProjectDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    deleteProjectDialog.close();
  });

  deleteProjectButtonGroup.append(confirmButton, cancelButton);
  deleteProjectForm.append(deleteProjectTitle, deleteProjectMessage, deleteProjectButtonGroup);
  deleteProjectDialog.appendChild(deleteProjectForm);
  document.body.appendChild(deleteProjectDialog);

  deleteProjectDialog.addEventListener("close", () => {
    deleteProjectDialog.remove();
  });

  deleteProjectDialog.showModal();
};

const renderEditParentForm = (parentData, onEditParentSubmitted) => {
  const existingDialog = document.querySelector(".dialog--edit-parent");

  if (existingDialog) {
    existingDialog.showModal();
    return;
  }

  const editParentDialog = document.createElement("dialog");
  editParentDialog.classList.add("dialog", "dialog--edit-parent");

  const editParentForm = document.createElement("form");
  editParentForm.classList.add("dialog__form");

  const editParentTitle = document.createElement("h2");
  editParentTitle.classList.add("dialog__title");
  editParentTitle.textContent = "Edit Parent";

  const titleGroup = document.createElement("div");
  titleGroup.classList.add("dialog__field-group");

  const titleLabel = document.createElement("label");
  titleLabel.classList.add("dialog__field-label");
  titleLabel.textContent = "Title:";
  titleLabel.setAttribute("for", "edit-parent-title-input");

  const titleInput = document.createElement("input");
  titleInput.classList.add("dialog__field-input");
  titleInput.type = "text";
  titleInput.id = "edit-parent-title-input";
  titleInput.value = parentData.parentTitle;
  titleInput.required = true;

  titleGroup.append(titleLabel, titleInput);

  const statusGroup = document.createElement("div");
  statusGroup.classList.add("dialog__field-group");

  const statusLabel = document.createElement("label");
  statusLabel.classList.add("dialog__field-label");
  statusLabel.textContent = "Complete:";
  statusLabel.setAttribute("for", "edit-parent-status-input");

  const statusInput = document.createElement("input");
  statusInput.type = "checkbox";
  statusInput.id = "edit-parent-status-input";
  statusInput.checked = parentData.parentStatus === "complete";

  statusGroup.append(statusLabel, statusInput);

  const descriptionGroup = document.createElement("div");
  descriptionGroup.classList.add("dialog__field-group");

  const descriptionLabel = document.createElement("label");
  descriptionLabel.classList.add("dialog__field-label");
  descriptionLabel.textContent = "Description:";
  descriptionLabel.setAttribute("for", "edit-parent-description-input");

  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("dialog__field-input");
  descriptionInput.id = "edit-parent-description-input";
  descriptionInput.value = parentData.parentDescription;

  descriptionGroup.append(descriptionLabel, descriptionInput);

  const dueDateGroup = document.createElement("div");
  dueDateGroup.classList.add("dialog__field-group");

  const dueDateLabel = document.createElement("label");
  dueDateLabel.classList.add("dialog__field-label");
  dueDateLabel.textContent = "Due Date:";
  dueDateLabel.setAttribute("for", "edit-parent-due-date-input");

  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("dialog__field-input");
  dueDateInput.type = "date";
  dueDateInput.id = "edit-parent-due-date-input";
  dueDateInput.value = parentData.parentDueDate;
  dueDateInput.required = true;

  dueDateGroup.append(dueDateLabel, dueDateInput);

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("dialog__button-group");

  const saveButton = document.createElement("button");
  saveButton.classList.add("dialog__button");
  saveButton.type = "submit";
  saveButton.textContent = "Save Parent";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  editParentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editedParentData = {
      parentId: parentData.parentId,
      title: titleInput.value.trim(),
      status: statusInput.checked ? "complete" : "incomplete",
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value,
    };

    if (editedParentData.title === "") {
      alert("Parent title cannot be blank.");
      return;
    }

    if (editedParentData.dueDate === "") {
      alert("Due date is required.");
      return;
    }

    const editResult = onEditParentSubmitted(editedParentData);

    if (!editResult.success) {
      alert(editResult.reason);
      return;
    }

    editParentDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    editParentDialog.close();
  });

  buttonGroup.append(saveButton, cancelButton);
  editParentForm.append(
    editParentTitle,
    titleGroup,
    statusGroup,
    descriptionGroup,
    dueDateGroup,
    buttonGroup,
  );

  editParentDialog.append(editParentForm);
  document.body.append(editParentDialog);

  editParentDialog.addEventListener("close", () => {
    editParentDialog.remove();
  });

  editParentDialog.showModal();
};

const renderEditProjectForm = (currentProjectName, onRenameProjectSubmitted) => {
  const editProjectDialog = document.createElement("dialog");
  editProjectDialog.classList.add("dialog", "dialog--edit-project");

  const editProjectForm = document.createElement("form");
  editProjectForm.classList.add("dialog__form");

  const editProjectTitle = document.createElement("h2");
  editProjectTitle.classList.add("dialog__title");
  editProjectTitle.textContent = "Rename Project";

  const editProjectInputGroup = document.createElement("div");
  editProjectInputGroup.classList.add("dialog__field-group");

  const editProjectLabel = document.createElement("label");
  editProjectLabel.classList.add("dialog__field-label");
  editProjectLabel.textContent = "New Project Name:";
  editProjectLabel.setAttribute("for", "edit-project-name-input");

  const editProjectInput = document.createElement("input");
  editProjectInput.classList.add("dialog__field-input");
  editProjectInput.type = "text";
  editProjectInput.id = "edit-project-name-input";
  editProjectInput.placeholder = currentProjectName;
  editProjectInput.required = true;

  editProjectInputGroup.append(editProjectLabel, editProjectInput);

  const editProjectButtonGroup = document.createElement("div");
  editProjectButtonGroup.classList.add("dialog__button-group");

  const submitButton = document.createElement("button");
  submitButton.classList.add("dialog__button");
  submitButton.type = "submit";
  submitButton.textContent = "Rename Project";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  editProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProjectName = editProjectInput.value.trim();

    if (newProjectName === "") {
      alert("Project name cannot be blank.");
      return;
    }

    const renameResult = onRenameProjectSubmitted(currentProjectName, newProjectName);

    if (!renameResult.success) {
      alert(renameResult.reason);
      return;
    }

    editProjectDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    editProjectDialog.close();
  });

  editProjectButtonGroup.append(submitButton, cancelButton);
  editProjectForm.append(editProjectTitle, editProjectInputGroup, editProjectButtonGroup);
  editProjectDialog.appendChild(editProjectForm);
  document.body.appendChild(editProjectDialog);

  editProjectDialog.addEventListener("close", () => {
    editProjectDialog.remove();
  });

  editProjectDialog.showModal();
};

const renderProjectEntries = (projectEntries) => {
  clearProjectContainer();

  for (const projectEntry of projectEntries) {
    projectContainerElement.append(createProjectCard(projectEntry));
  }

  return { success: true };
};

const renderNewProjectForm = (onCreateButtonSelected) => {
  const existingDialog = document.querySelector(".dialog--new-project");

  if (existingDialog) {
    existingDialog.showModal();
    return;
  }

  const newProjectDialog = document.createElement("dialog");
  newProjectDialog.classList.add("dialog", "dialog--new-project");

  const newProjectForm = document.createElement("form");
  newProjectForm.classList.add("dialog__form");

  const newProjectTitle = document.createElement("h2");
  newProjectTitle.classList.add("dialog__title");
  newProjectTitle.textContent = "Create New Project";

  const newProjectInputGroup = document.createElement("div");
  newProjectInputGroup.classList.add("dialog__field-group");

  const newProjectLabel = document.createElement("label");
  newProjectLabel.classList.add("dialog__field-label");
  newProjectLabel.textContent = "Project Name:";
  newProjectLabel.setAttribute("for", "new-project-name-input");

  const newProjectInput = document.createElement("input");
  newProjectInput.classList.add("dialog__field-input");
  newProjectInput.type = "text";
  newProjectInput.id = "new-project-name-input";
  newProjectInput.required = true;

  const newProjectButtonGroup = document.createElement("div");
  newProjectButtonGroup.classList.add("dialog__button-group");

  const createButton = document.createElement("button");
  createButton.classList.add("dialog__button");
  createButton.type = "submit";
  createButton.textContent = "Add New Project";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = newProjectInput.value.trim();
    const creationResult = onCreateButtonSelected(projectName);

    if (!creationResult.success) {
      alert(creationResult.reason);
      return;
    }

    newProjectDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    newProjectDialog.close();
  });

  newProjectInputGroup.append(newProjectLabel, newProjectInput);
  newProjectButtonGroup.append(createButton, cancelButton);
  newProjectForm.append(newProjectTitle, newProjectInputGroup, newProjectButtonGroup);
  newProjectDialog.append(newProjectForm);
  document.body.append(newProjectDialog);

  newProjectDialog.addEventListener("close", () => {
    newProjectDialog.remove();
  });

  newProjectDialog.showModal();
  newProjectInput.focus();
};

export {
  bindAddAtomic,
  bindAddParent,
  bindDeleteAtomic,
  bindDeleteParent,
  bindEditParent,
  renderAddAtomicForm,
  renderAddParentForm,
  renderAllProjects,
  renderByProjectName,
  renderDeleteAtomicConfirmation,
  renderDeleteParentConfirmation,
  renderDeleteProjectConfirmation,
  renderEditParentForm,
  renderEditProjectForm,
  renderNewProjectForm,
};
