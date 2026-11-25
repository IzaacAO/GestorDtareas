const taskManager = new TaskManager();

const form = document.getElementById('tareasform');
const errorAlert = document.getElementById('erroralerta');
const taskList = document.getElementById('lista-tareas');
const spotifyEnlace = document.getElementById('spotifyEnlace');
const spotifyBoton = document.getElementById('spotifyBoton');
const spotifyReproductor = document.getElementById('spotifyReproductor');

taskManager.load();
taskManager.render();


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


taskList.addEventListener('click', function (event) {

    const botonToggle = event.target.closest('.btn-toggle');
    if (botonToggle !== null) {
        const tarjeta = botonToggle.closest('.task-card');
        const taskId = Number(tarjeta.dataset.taskId);

        taskManager.toggleTask(taskId);
        taskManager.save();
        taskManager.render();
        return;
    }

    const botonEliminar = event.target.closest('.delete-button');
    if (botonEliminar !== null) {
        const tarjeta = botonEliminar.closest('.task-card');
        const taskId = Number(tarjeta.dataset.taskId);

        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
    }
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

    const errores = validFormFieldInput(data);

    if (errores.length > 0) {

        errorAlert.innerHTML = errores.join('<br>');
        errorAlert.classList.remove('d-none');

    } else {

        errorAlert.classList.add('d-none');
        taskManager.addTask(data.titulo, data.descripcion, data.fecha, data.prioridad, data.estado);
        taskManager.save();
        taskManager.render();
        form.reset();
        console.log(taskManager.tasks);
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