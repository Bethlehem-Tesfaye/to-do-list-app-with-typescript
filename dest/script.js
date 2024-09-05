"use strict";
const list = document.querySelector("ul");
const input = document.querySelector("form input");
const button = document.querySelector("form button");
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
    updatedCount();
});
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
    updatedCount();
});
const addTask = function () {
    if (list === null || list === void 0 ? void 0 : list.innerHTML) {
        list.innerHTML = "";
    }
    tasks.forEach((task, index) => {
        const taskList = document.createElement("li");
        const div = document.createElement("div");
        div.setAttribute("class", "list-container");
        const label = document.createElement("label");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit"
        });
        const divDate = document.createElement("div");
        divDate.setAttribute("class", "divDate");
        divDate.append(formattedDate);
        console.log(task.createdAt.toString());
        if (checkBox.checked) {
            label.setAttribute("class", "completed");
            saveTask();
        }
        else
            label.setAttribute("class", "");
        label.append(checkBox, task.title);
        const div2 = document.createElement("div");
        div2.setAttribute("class", "div2");
        div2.append(label);
        const iconDiv = document.createElement("div");
        iconDiv.setAttribute("class", "icons");
        const deleteImg = document.createElement("img");
        deleteImg.src = "../delete.png";
        deleteImg.addEventListener("click", () => remove(index));
        const editImg = document.createElement("img");
        editImg.src = "../edit.png";
        editImg.addEventListener("click", () => edit(index));
        iconDiv.append(editImg, deleteImg);
        div.append(div2, iconDiv);
        taskList.append(divDate, div);
        list === null || list === void 0 ? void 0 : list.append(taskList);
        checkBox.checked = task.completed;
        checkBox.addEventListener("change", () => {
            task.completed = checkBox.checked;
            console.log(tasks);
            if (checkBox.checked) {
                label.setAttribute("class", "completed");
            }
            else {
                label.setAttribute("class", "");
            }
            saveTask();
            updatedCount();
        });
        if (checkBox.checked) {
            label.setAttribute("class", "completed");
        }
        else
            label.setAttribute("class", "");
    });
};
const remove = function (index) {
    tasks.splice(index, 1);
    addTask();
    saveTask();
    updatedCount();
};
const edit = function (index) {
    if ((input === null || input === void 0 ? void 0 : input.value) == null) {
    }
    else {
        input.value = tasks[index].title;
        tasks.splice(index, 1);
        addTask();
        saveTask();
        updatedCount();
    }
};
const updatedCount = () => {
    let count = document.querySelector(".task-count p");
    let progress = document.querySelector(".progress");
    let message = document.querySelector(".title p");
    let totalTask = tasks.length;
    let completedTask = tasks.filter(task => task.completed).length;
    count.innerHTML = completedTask + " / " + totalTask;
    if (totalTask == 0 && completedTask == 0) {
        progress.style.width = "0%";
    }
    else {
        progress.style.width = completedTask / totalTask * 100 + "%";
    }
    if (totalTask == completedTask && totalTask != 0 && completedTask != 0) {
        message.innerHTML = "You Completed Your Tasks!!";
        confettiEffect();
    }
    else {
        message.innerHTML = "Keep it up";
    }
};
const confettiEffect = () => {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
    };
    function fire(particleRatio, opts) {
        window.confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        }));
    }
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};
//# sourceMappingURL=script.js.map