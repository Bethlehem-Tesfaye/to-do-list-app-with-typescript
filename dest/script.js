"use strict";
const list = document.querySelector("ul");
const input = document.querySelector("form input");
const button = document.querySelector("form button");
const tasks = [];
button === null || button === void 0 ? void 0 : button.addEventListener('click', function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null) {
        return;
    }
    const newtask = {
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newtask);
    addTask();
    input.value = "";
    console.log(tasks);
    saveTask();
});
const addTask = function () {
    if (list === null || list === void 0 ? void 0 : list.innerHTML) {
        list.innerHTML = "";
    }
    tasks.forEach((task) => {
        const taskList = document.createElement("li");
        const div = document.createElement("div");
        div.setAttribute("class", "list-container");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        const label = document.createElement("label");
        label.append(checkBox, task.title);
        taskList.append(label);
        list === null || list === void 0 ? void 0 : list.append(taskList);
        checkBox.checked = task.completed;
        checkBox.addEventListener("change", () => {
            task.completed = checkBox.checked;
            console.log(tasks);
            saveTask();
        });
    });
};
const saveTask = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getTask = function () {
    let savedTask = localStorage.getItem("tasks");
    if (savedTask == null) {
        return;
    }
    let saved = JSON.parse(savedTask);
    saved.forEach((task) => {
        tasks.push(task);
    });
};
document.addEventListener("DOMContentLoaded", () => {
    getTask();
    addTask();
});
//# sourceMappingURL=script.js.map