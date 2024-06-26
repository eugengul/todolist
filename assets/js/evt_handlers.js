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