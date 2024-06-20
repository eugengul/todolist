'use strict';

import auth from './auth.js';
import dom from './dom.js';
import sync from './sync.js';
import tasks from './tasks.js';

// Tasks
const addTaskHandler = (evt) => {
    const priority = Number(dom.elements.prioritySelect.value);
    const name = dom.elements.nameInput.value;
    const dueDate = dom.elements.dueDateInput.value;
    if (name) {
        tasks.createTask(name, priority, dueDate);
        dom.reloadTaskList();
    } else {
        alert('Der Aufgabenname darf nicht leer sein.');
    }
}

const editTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.add('edit');
}

const saveTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = taskEl.getAttribute('data-task-id');
    const nameEl = taskEl.querySelector('.task-edit input[name=name]');
    const priorityEl = taskEl.querySelector('.task-edit select[name=priority]');
    const dueDateEl = taskEl.querySelector('.task-edit input[name=due-date]');

    tasks.saveTask(task_id, nameEl.value, Number(priorityEl.value), dueDateEl.value);
    dom.reloadTaskList();

}

const removeTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = taskEl.getAttribute('data-task-id');

    tasks.deleteTask(task_id);
    taskEl.remove();
}

const toggleTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.toggle('completed')

    const task_id = taskEl.getAttribute('data-task-id');
    tasks.toggleTask(task_id);
    dom.reloadTaskList();
}

const deleteCompletedHandler = () => {
    tasks.deleteCompletedTasks();
    dom.reloadTaskList();
}

// Auth

const loginHandler = (evt) => {
    dom.elements.loginButton.disabled = true;
    let loginData = new FormData(dom.elements.loginForm);
    loginData = JSON.stringify(Object.fromEntries(loginData));
    auth.login(loginData, dom.updateAuthBlock);
}

const signUpHandler = (evt) => {
    dom.elements.signUpButton.disabled = true;
    let loginData = new FormData(dom.elements.loginForm);
    loginData = JSON.stringify(Object.fromEntries(loginData));
    auth.signUp(loginData, dom.updateAuthBlock);
}

const logoutHandler = (evt) => {
    auth.logout();
}

// Sync

const syncHandler = (evt) => {
    const syncButton = dom.elements.syncButton;
    syncButton.disabled = true;
    const buttonName = syncButton.textContent;
    syncButton.textContent = 'Syncing...'
    syncButton.className = "";
    sync.syncTasks().then(() => {
        tasks.storeTasks();
        dom.reloadTaskList();
        syncButton.classList.add('success');
        setTimeout(() => {
            syncButton.classList.remove('success');
        }, "1000");
    }).catch(err => {
        syncButton.classList.add('error');
        alert(err);
        console.warn(err)
    }
    ).finally(() => {
        syncButton.textContent = buttonName;
        dom.elements.syncButton.disabled = false;
    }
    );
}

const handlers = {
    // Tasks
    addTaskHandler,
    editTaskHandler,
    saveTaskHandler,
    removeTaskHandler,
    toggleTaskHandler,
    deleteCompletedHandler,

    // Auth
    loginHandler,
    signUpHandler,
    logoutHandler,

    // Sync
    syncHandler,
}

export default handlers;