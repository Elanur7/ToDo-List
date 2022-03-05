const newTask = document.querySelector(".input-task");
const newTaskAddBtn = document.querySelector(".btn-task-add");
const taskList = document.querySelector(".task-list");

newTaskAddBtn.addEventListener("click", taskAdd);
taskList.addEventListener("click", taskDeleteCompleted);
document.addEventListener("DOMContentLoaded", localStorageRead);

function taskDeleteCompleted(e) {
  const selectedElement = e.target;
  if (selectedElement.classList.contains("task-btn-completed")) {
    selectedElement.parentElement.classList.toggle("task-completed");
  }
  if (selectedElement.classList.contains("task-btn-delete")) {
    selectedElement.parentElement.classList.toggle("lost");

    const deleteTask = selectedElement.parentElement.children[0].innerText;
    localStorageDelete(deleteTask);

    selectedElement.parentElement.addEventListener(
      "transitionend",
      function () {
        selectedElement.parentElement.remove();
      }
    );
  }
}

function taskAdd(e) {
  e.preventDefault();

  if (newTask.value.length > 0) {
    taskItemCreate(newTask.value);

    localStorageSave(newTask.value);
    newTask.value = "";
  } else {
    alert("Boş görev tanımı olamaz.");
  }
}

function localStorageSave(newTask) {
  let tasks = localStorageArray();

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function localStorageRead() {
  let tasks = localStorageArray();

  tasks.forEach(function (task) {
    taskItemCreate(task);
  });
}

function taskItemCreate(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-item");

  const taskLi = document.createElement("li");
  taskLi.classList.add("task-description");
  taskLi.innerText = task;
  taskDiv.appendChild(taskLi);

  const taskCompletedBtn = document.createElement("button");
  taskCompletedBtn.classList.add("task-btn");
  taskCompletedBtn.classList.add("task-btn-completed");
  taskCompletedBtn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';
  taskDiv.appendChild(taskCompletedBtn);

  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.classList.add("task-btn");
  taskDeleteBtn.classList.add("task-btn-delete");
  taskDeleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  taskDiv.appendChild(taskDeleteBtn);

  taskList.appendChild(taskDiv);
}

function localStorageArray() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return tasks;
}

function localStorageDelete(task) {
  let tasks = localStorageArray();

  const deleteElementIndex = tasks.indexOf(task);
  tasks.splice(deleteElementIndex, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
