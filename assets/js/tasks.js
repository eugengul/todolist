'use strict';

// load tasks from localStorage
const tasks_json = localStorage.getItem('tasks');
const tasks = new Map(JSON.parse(tasks_json));

class Task {
    constructor(name, priority, dueDate) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

const createTask = (name, priority, dueDate) => {
    const task = new Task(name, priority, dueDate);
    tasks.set(task.id, task);
    storeTasks();
    return task;
}

const deleteTask = (task_id) => {
    tasks.delete(task_id);
    storeTasks();
}

const saveTask = (task_id, name, priority, dueDate) => {
    const task = tasks.get(task_id);
    task.name = name;
    task.priority = priority;
    task.dueDate = dueDate;
    storeTasks();
}

const toggleTask = (task_id) => {
    const task = tasks.get(task_id);
    task.completed = !task.completed;
    storeTasks();
}

const storeTasks = () => {
    const tasks_json = JSON.stringify([...tasks]);
    localStorage.setItem('tasks', tasks_json);
}

const deleteCompletedTasks = () => {
    for (const task of tasks.values()) {
        if (task.completed) tasks.delete(task.id);
    }
    storeTasks();
    reloadTaskList();
}

const compareCompletionPriority = (task1, task2) => {
    let compareResult = task1.completed - task2.completed;
    // compare priority only if completion statuses are the same
    if (compareResult == 0) {
        compareResult = task2.priority - task1.priority;
    }
    return compareResult;
}

const sortTasksByCompletion = () => {
    return new Map([...tasks.entries()].sort(
        (entry1, entry2) => {
            const task1 = entry1[1];
            const task2 = entry2[1];
            return compareCompletionPriority(task1, task2);
        }))
}