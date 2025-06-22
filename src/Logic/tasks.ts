import Task from "../Model/Task";
import {
  checkDateValidity,
  checkTaskFormInputValidity,
  clearFieldErrorState,
} from "../Utils/HelperFunctions/InputHelperFunctions";
import {
  createTaskRow,
  getNewTask,
  updateTask,
} from "../Utils/HelperFunctions/TasksManager";
import { logoutUser } from "../Utils/HelperFunctions/AuthenticationManager";

let myTasks: Task[] = [];
let titleInput: HTMLInputElement | null = null,
  descriptionInput: HTMLTextAreaElement | null = null,
  dateInput: HTMLInputElement | null = null,
  saveActionInput: HTMLInputElement | null = null,
  taskIdInput: HTMLInputElement | null = null,
  logoutBtn: HTMLButtonElement | null = null;

export function init() {
  /**
   * Check authentication status
   * Initialize input elements when dom content is loaded
   * Listen to description input event
   * Set date input initial value and min value
   */

  titleInput = document.getElementById("title") as HTMLInputElement | null;

  descriptionInput = document.getElementById(
    "description"
  ) as HTMLTextAreaElement | null;

  dateInput = document.getElementById("date") as HTMLInputElement | null;

  saveActionInput = document.getElementById(
    "save_action"
  ) as HTMLInputElement | null;

  taskIdInput = document.getElementById("task_id") as HTMLInputElement | null;
  logoutBtn = document.getElementById("logout_btn") as HTMLButtonElement | null;

  if (descriptionInput !== null) {
    descriptionInput.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      const countLabel = document.getElementById(
        "description_length"
      ) as HTMLElement;
      countLabel.innerHTML = `${target.textLength}/300`;
    });
  }

  // Set current value and min date value to today's date
  const currentDate = new Date().toISOString().substring(0, 10);
  if (dateInput !== null) {
    dateInput.min = currentDate;
    dateInput.value = currentDate;
  }
  // });

  const task_form: HTMLFormElement | null = document.getElementById(
    "task_form"
  ) as HTMLFormElement | null;

  // Watch description input change to keep track of content length

  task_form &&
    task_form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();

      if (
        titleInput &&
        descriptionInput &&
        dateInput &&
        saveActionInput &&
        taskIdInput
      ) {
        if (validateForm(titleInput, descriptionInput, dateInput)) {
          if (saveActionInput.value === "add")
            saveNewTask(
              titleInput.value,
              descriptionInput.value,
              dateInput.value
            );
          else
            updateExistingTask(
              titleInput,
              descriptionInput,
              dateInput,
              taskIdInput
            );

          clearForm(
            titleInput,
            descriptionInput,
            dateInput,
            saveActionInput,
            taskIdInput
          );
        }
      }
    });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }
}

const validateForm = (
  titleInput: HTMLInputElement | null,
  descriptionInput: HTMLTextAreaElement | null,
  dateInput: HTMLInputElement | null
): boolean => {
  let titleValid = false;
  if (titleInput) {
    const titleErrorField: HTMLElement | null =
      document.getElementById("title_error");
    titleValid = checkTaskFormInputValidity(
      titleInput,
      titleErrorField,
      "Title",
      100
    );
    if (titleValid) clearFieldErrorState(titleErrorField, titleInput);
  }

  let descriptionValid = false;
  if (descriptionInput) {
    const descriptionErrorField: HTMLElement | null =
      document.getElementById("description_error");
    descriptionValid = checkTaskFormInputValidity(
      descriptionInput,
      descriptionErrorField,
      "Description",
      300
    );
    if (descriptionValid)
      clearFieldErrorState(descriptionErrorField, descriptionInput);
  }

  let dateValid = false;
  if (dateInput) {
    const dateErrorField: HTMLElement | null =
      document.getElementById("date_error");
    dateValid = checkDateValidity(dateInput, dateErrorField);
    if (dateValid) clearFieldErrorState(dateErrorField, dateInput);
  }

  return titleValid && descriptionValid && dateValid;
};

const saveNewTask = (
  title: string,
  description: string,
  date: string
): void => {
  const task = getNewTask(title, description, date, myTasks);
  myTasks.push(task);
  const tasksList = document.getElementById("tasks__list");
  if (tasksList) {
    tasksList.appendChild(createTaskRow(task, setEditTask));
  }
};

const setEditTask = (taskId: number) => {
  const task = myTasks.find((task) => task.getId() === taskId);
  if (
    task &&
    titleInput &&
    descriptionInput &&
    dateInput &&
    saveActionInput &&
    taskIdInput
  ) {
    titleInput.value = task?.getTitle();
    descriptionInput.value = task?.getDescription();
    dateInput.value = task?.getDate();
    saveActionInput.value = "edit";
    taskIdInput.value = task?.getId().toString();
  }
};

const updateExistingTask = (
  titleInput: HTMLInputElement,
  descriptionInput: HTMLTextAreaElement,
  dateInput: HTMLInputElement,
  taskIdInput: HTMLInputElement
) => {
  const updatedTask: Task | null = updateTask(
    titleInput,
    descriptionInput,
    dateInput,
    taskIdInput,
    myTasks
  );

  // Update task row values
  if (updatedTask) {
    const task_title = document.getElementById(
      `task_${updatedTask.getId()}_title`
    );
    const task_description = document.getElementById(
      `task_${updatedTask.getId()}_description`
    );
    const task_date = document.getElementById(
      `task_${updatedTask.getId()}_date`
    );

    if (task_title) task_title.innerText = titleInput.value;
    if (task_description) task_description.innerText = descriptionInput.value;
    if (task_date) task_date.innerText = dateInput.value;
  } else {
    // In case task id is not found show an error
    const formError = document.getElementById("form__error");
    if (formError) formError.innerText = "Cannot update task";
  }
};

const clearForm = (
  titleInput: HTMLInputElement,
  descriptionInput: HTMLTextAreaElement,
  dateInput: HTMLInputElement,
  saveActionInput: HTMLInputElement,
  taskIdInput: HTMLInputElement
) => {
  titleInput.value = "";
  descriptionInput.value = "";
  dateInput.value = new Date().toISOString().substring(0, 10);
  saveActionInput.value = "add";
  taskIdInput.value = "";
};
