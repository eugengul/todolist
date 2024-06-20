'use strict';

const syncTasks = (callback) => {
    const tasksToSync = [...tasks.values()];
    tasksToSync.map(task => delete task.id);

    const tasks_json = JSON.stringify(
        {tasks : tasksToSync});

    return fetch("./sync", {
        method: "post",
        body: tasks_json,
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${auth.accessToken}`,
        }
    }).then((response) => response.json())
        .then(response => {
            tasks.clear();
            response.tasks.forEach(task => {
                task.id = task._id;
                tasks.set(task.id, task);
            });
        })
}