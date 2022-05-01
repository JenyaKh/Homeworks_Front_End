const DELETE_BTN_CLASS = 'deleteBtn';
const TASK_ITEM_SELECTOR = '.taskItem';
const HIDDEN_CLASS = 'hidden';
const ERROR_MESSAGE = 'Length must be at least 3 symbols';
const INPUT_ERROR_CLASS = 'invalid';
const TASK_STATE = {
    DONE: 'done',
    NOT_DONE: 'not-done',
}

const taskTemplate = document.getElementById('taskTemplate').innerHTML;
const taskFormEl = document.getElementById('addTaskForm');
const tasksContainerEl = document.getElementById('tasksContainer');
const taskInputEl = document.getElementById('taskInput');
const errorEl = document.getElementById('error');

taskFormEl.addEventListener('submit', onTaskFormSubmit);
tasksContainerEl.addEventListener('click', onTaskContainerClick);
taskInputEl.addEventListener('input', onTextInput);

let tasksList = [
    {
        id: 100,
        title: 'Brush teeth',
        state: TASK_STATE.NOT_DONE,
    },
    {
        id: 200,
        title: 'Do exercises',
        state: TASK_STATE.NOT_DONE,
    },
    {
        id: 300,
        title: 'Breakfast',
        state: TASK_STATE.NOT_DONE,
    },
];

init();

function onTaskFormSubmit(e) {
    e.preventDefault();

    const newTask = getTask();
    const error = checkLength();

    if (!error) {
        addTask(newTask);
        resetForm();
    };

}

function onTextInput() {
    const error = checkLength();
    error ? showError(error) : hideError();
};

function checkLength() {
    return taskInputEl.value.length < 3 ? ERROR_MESSAGE : null;
};

function showError(msg) {   
    errorEl.textContent = msg;
    taskInputEl.classList.add(INPUT_ERROR_CLASS);
    errorEl.classList.remove(HIDDEN_CLASS);
};

function hideError() {
    taskInputEl.classList.remove(INPUT_ERROR_CLASS);
    errorEl.classList.add(HIDDEN_CLASS);
};


function onTaskContainerClick(e) {
    const id = getTaskId(e.target);
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {      
        removeTask(id);
    } else {
        taskStateChange(id);
    }
}

function taskStateChange(id) {
    const index = tasksList.findIndex((obj) => obj.id === id);
    if (tasksList[index].state == TASK_STATE.DONE) {
        tasksList[index].state = TASK_STATE.NOT_DONE;
    } else {
        tasksList[index].state = TASK_STATE.DONE;
    }
    renderList();
}

function init() {
    renderList();
}

function getTask() {
    const task = {};
    task.title = taskInputEl.value;

    return task;
}

function generateTaskHtml(task) {
    return interpolate(taskTemplate, task)
}

function addTask(task) {
    task.id = Date.now();
    task.state = TASK_STATE.NOT_DONE;
    tasksList.push(task);

    renderList();
}

function renderList() {
    tasksContainerEl.innerHTML = tasksList.map(generateTaskHtml).join('\n');
}

function resetForm() {
    taskFormEl.reset();
}

function getTaskId(el) {
    const taskItemEl = el.closest(TASK_ITEM_SELECTOR);

    return +taskItemEl.dataset.taskId;
}

function removeTask(id) {

    tasksList = tasksList.filter((obj) => obj.id !== id);

    renderList();
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }

    return template;
}