'use strict';

const addTaskHandler = (evt) => {
    const priority = Number(elements.prioritySelect.value);
    const name = elements.nameInput.value;
    const dueDate = elements.dueDateInput.value;
    if (name) {
        createTask(name, priority, dueDate);
        reloadTaskList();
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

    saveTask(task_id, nameEl.value, Number(priorityEl.value), dueDateEl.value);
    reloadTaskList();

}

const removeTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = taskEl.getAttribute('data-task-id');

    deleteTask(task_id);
    taskEl.remove();
}

const toggleTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.toggle('completed')

    const task_id = taskEl.getAttribute('data-task-id');
    toggleTask(task_id);
    reloadTaskList();
}

const deleteCompletedHandler = () => {
    deleteCompletedTasks();
    reloadTaskList();
}

const loginHandler = (evt) => {
    elements.loginButton.disabled = true;
    let loginData = new FormData(elements.loginForm);
    loginData = JSON.stringify(Object.fromEntries(loginData));
    auth.login(loginData, updateAuthBlock);
}

const signUpHandler = (evt) => {
    elements.signUpButton.disabled = true;
    let loginData = new FormData(elements.loginForm);
    loginData = JSON.stringify(Object.fromEntries(loginData));
    auth.signUp(loginData, updateAuthBlock);
}

const logoutHandler = (evt) => {
    auth.logout();
}

const syncHandler = (evt) => {
    const syncButton = elements.syncButton;
    syncButton.disabled = true;
    const buttonName = syncButton.textContent;
    syncButton.textContent = 'Syncing...'

    syncTasks().then(() => {
        storeTasks();
        reloadTaskList();
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
        elements.syncButton.disabled = false;
    }
    );
}