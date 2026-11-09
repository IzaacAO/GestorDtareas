
class TaskManager {

    constructor() {
        this.tasks = [];
    }
}

const taskManager = new TaskManager();

console.log(taskManager.tasks);


const form = document.getElementById('tareasform');
const errorAlert = document.getElementById('erroralerta');
const taskList = document.getElementById('lista-tareas');
const spotifyEnlace = document.getElementById('spotifyEnlace');
const spotifyBoton = document.getElementById('spotifyBoton');
const spotifyReproductor = document.getElementById('spotifyReproductor');


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

function validFormFieldInput(dato) {
    const errores = [];

    if (dato.titulo.trim() === '') {
        errores.push('El título no puede estar vacío.');
    }
    if (dato.descripcion.trim() === '') {
        errores.push('La descripción no puede estar vacía.');
    }
    if (dato.fecha === '') {
        errores.push('Debes elegir una fecha de entrega.');
    }
    if (dato.estado === '') {
        errores.push('Debes seleccionar un estado.');
    }
    if (dato.prioridad === '') {
        errores.push('Debes seleccionar una prioridad.');
    }

    return errores;
}


function escapeHTML(text) {

    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatFecha(fecha) {

    const [year, month, day] = fecha.split('-');
    return day + '/' + month + '/' + year;
}

function addTarea(data) {

    const [clasePrioridad, textoPrioridad] = prioridadBadges[data.prioridad];
    const [claseEstado, textoEstado] = estadoBadges[data.estado];
    const esCompletada = data.estado === 'completada';

    const card = `
        <div class="card task-card prioridad-${data.prioridad} ${esCompletada ? 'completada' : ''} mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title">${escapeHTML(data.titulo)}</h5>
                    <span class="badge ${clasePrioridad}">${textoPrioridad}</span>
                </div>
                <p class="card-text">${escapeHTML(data.descripcion)}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-body-secondary">Entrega: ${formatFecha(data.fecha)}</small>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge ${claseEstado} estado-badge">${textoEstado}</span>
                    <button type="button" class="btn btn-sm btn-toggle">${esCompletada ? 'Desmarcar' : 'Completar'}</button>
                    <button type="button" class="btn btn-sm btn-eliminar">Eliminar</button>
                </div>
            </div>
        </div>
    `;

    taskList.insertAdjacentHTML('afterbegin', card);
}

function toggleCompletada(card) {

    const badge = card.querySelector('.estado-badge');
    const boton = card.querySelector('.btn-toggle');
    const completada = card.classList.toggle('completada');

    badge.className = 'badge estado-badge ' + (completada ? 'badge-completada' : 'badge-pendiente');
    badge.textContent = completada ? 'Completada' : 'Pendiente';
    boton.textContent = completada ? 'Desmarcar' : 'Completar';
}

taskList.addEventListener('click', function (event) {

    const boton = event.target.closest('.btn-toggle');
    if (boton === null) return;
    toggleCompletada(boton.closest('.task-card'));
});


form.addEventListener('submit', function (event) {

    event.preventDefault();

    const data = {
        titulo: document.querySelector('#titulo').value,
        descripcion: document.querySelector('#descripcion').value,
        fecha: document.querySelector('#fecha').value,
        estado: document.querySelector('#estado').value,
        prioridad: document.querySelector('#prioridad').value
    };

    console.log(data);

    const errores = validFormFieldInput(data);

    if (errores.length > 0) {

        errorAlert.innerHTML = errores.join('<br>');
        errorAlert.classList.remove('d-none');

    } else {

        errorAlert.classList.add('d-none');
        addTarea(data);
        form.reset();
    }
});


spotifyBoton.addEventListener('click', function () {

    const enlace = spotifyEnlace.value;
    const patron = /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/;
    const resultado = enlace.match(patron);

    if (resultado === null) {
        spotifyReproductor.innerHTML = '<div class="alert alert-danger mb-0">Enlace de Spotify no válido.</div>';
        return;
    }

    const tipo = resultado[1];
    const id = resultado[2];
    const alto = tipo === 'track' ? 152 : 352;

    spotifyReproductor.innerHTML = `
        <iframe src="https://open.spotify.com/embed/${tipo}/${id}?utm_source=generator"
                width="100%" height="${alto}" style="border:0; border-radius:12px;"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    `;
});

taskList.addEventListener('click', function (event) {

    const botonEliminar = event.target.closest('.btn-eliminar');

    if (botonEliminar === null) return{}

    const tarjeta = botonEliminar.closest('.task-card');

    tarjeta.remove();
});