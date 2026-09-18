const API_URL = "https://student-task-manager-uwsb.onrender.com/api/tasks";

export async function getTasks() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}


export async function createTask(taskData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
}

export async function toggleTaskComplete(taskId) {
    const response = await fetch(`${API_URL}/${taskId}/complete`, {
        method: "PATCH"
    });

    if (!response.ok) {
        throw new Error("Failed to update task status");
    }

    return response.json();
}


export async function deleteTask(taskId) {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
}


export async function updateTask(taskId, taskData) {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
}