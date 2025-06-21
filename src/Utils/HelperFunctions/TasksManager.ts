import Task from "../../Model/Task";

export const createTaskRow = (
  task: Task,
  setEditTask: (id: number) => void
): HTMLElement => {
  // Create the container row
  const row = document.createElement("div");
  row.className = "task_row"; // style this in CSS
  row.id = `task_${task.getId()}`;

  // Create child elements
  const titleEl = document.createElement("span");
  titleEl.textContent = task.getTitle();
  titleEl.className = "task_title";
  titleEl.id = `task_${task.getId()}_title`;

  const descEl = document.createElement("span");
  descEl.textContent = task.getDescription();
  descEl.className = "task_desc";
  descEl.id = `task_${task.getId()}_description`;

  const dateEl = document.createElement("span");
  dateEl.textContent = task.getDate();
  dateEl.className = "task_date";
  dateEl.id = `task_${task.getId()}_date`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit_button";

  // Attach event listener to the edit button
  editButton.addEventListener("click", () => {
    setEditTask(task.getId());
  });

  // Append all to the row
  row.appendChild(titleEl);
  row.appendChild(descEl);
  row.appendChild(dateEl);
  row.appendChild(editButton);

  return row;
};

export const getNewTask = (
  title: string,
  description: string,
  date: string,
  tasks: Task[]
): Task => {
  const last_task_id = tasks.length > 0 ? tasks[tasks.length - 1].getId() : 0;
  return new Task(last_task_id + 1, title, description, date);
};

export const updateTask = (
  titleInput: HTMLInputElement,
  descriptionInput: HTMLTextAreaElement,
  dateInput: HTMLInputElement,
  taskIdInput: HTMLInputElement,
  tasks: Task[]
): Task | null => {
  const rawTaskId = taskIdInput.value;
  if (!isNaN(parseInt(rawTaskId, 10))) {
    const taskId = parseInt(rawTaskId, 10);
    const task = tasks.find((task) => task.getId() === taskId);
    if (task) {
      task.setTitle(titleInput.value);
      task.setDescription(descriptionInput.value);
      task.setDate(dateInput.value);
      return task;
    }
  }

  return null;
};
