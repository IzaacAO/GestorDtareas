const prioridadBadges = {
    alta: ['badge-alta', 'Alta'],
    media: ['badge-media', 'Media'],
    baja: ['badge-baja', 'Baja']
};

const estadoBadges = {
    pendiente: ['badge-pendiente', 'Pendiente'],
    progreso: ['badge-progreso', 'En progreso'],
    completada: ['badge-completada', 'Completada']
};

function escapeHTML(text) {

    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatFecha(fecha) {

    const [year, month, day] = fecha.split('-');
    return day + '/' + month + '/' + year;
}


class TaskManager {

    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, dueDate, priority, status) {
        this.currentId++;

        this.tasks.push({
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status
        });
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('currentId', String(this.currentId));
    }

    load() {
        const guardadoTasks = localStorage.getItem('tasks');
        const guardadoId = localStorage.getItem('currentId');

        if (guardadoTasks !== null) {
            this.tasks = JSON.parse(guardadoTasks);
        }

        if (guardadoId !== null) {
            this.currentId = Number(guardadoId);
        }
    }

    createTaskHtml(task) {
        const prioKey = String(task.priority).toLowerCase();
        const statusKey = String(task.status).toLowerCase();

        const [clasePrioridad, textoPrioridad] = prioridadBadges[prioKey] || ['badge-media', task.priority];
        const [claseEstado, textoEstado] = estadoBadges[statusKey] || ['badge-pendiente', task.status];
        const esCompletada = statusKey === 'completada';

        const card = `
        <div class="card task-card prioridad-${prioKey} ${esCompletada ? 'completada' : ''} mb-3" data-task-id="${task.id}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title">${escapeHTML(task.name)}</h5>
                    <span class="badge ${clasePrioridad}">${textoPrioridad}</span>
                </div>
                <p class="card-text">${escapeHTML(task.description)}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-body-secondary">Entrega: ${formatFecha(task.dueDate)}</small>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge ${claseEstado} estado-badge">${textoEstado}</span>
                    <button type="button" class="btn btn-sm btn-toggle">${esCompletada ? 'Desmarcar' : 'Completar'}</button>
                    <button type="button" class="btn btn-sm btn-eliminar delete-button">Eliminar</button>
                </div>
            </div>
        </div>
    `;

        return card;
    }

    render() {
        const taskList = document.getElementById('lista-tareas');
        taskList.innerHTML = '';

        for (const task of this.tasks) {
            const html = this.createTaskHtml(task);
            taskList.insertAdjacentHTML('afterbegin', html);
        }
    }

    deleteTask(taskId) {
        const newTasks = [];

        for (const task of this.tasks) {
            if (task.id !== Number(taskId)) {
                newTasks.push(task);
            }
        }

        this.tasks = newTasks;
    }

    toggleTask(taskId) {
        for (const task of this.tasks) {
            if (task.id === Number(taskId)) {
                task.status = task.status === 'completada' ? 'pendiente' : 'completada';
            }
        }
    }

}