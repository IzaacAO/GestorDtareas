TaskPlanner - Planificador de Tareas

Aplicación web para planificar tareas: permite registrarlas con título, descripción, fecha de entrega, estado y prioridad, marcarlas como completadas y eliminarlas. Las tareas se conservan en el navegador gracias a localStorage.

Demo / Deploy
Aplicación publicada: https://izaacao.github.io/GestorDtareas/
Tecnologías y Herramientas
Frontend: HTML5, CSS3, Bootstrap 5, JavaScript (clases, arrays, manipulación del DOM, eventos y localStorage).
Backend (Próximos Sprints): Java, Spring Boot, C# .NET, Base de datos SQL.
Control de Versiones: Git y GitHub.
Diseño y Gestión: Figma, Trello.
Enlaces del Proyecto

Puedes consultar la planificación y el diseño visual de la aplicación en los siguientes enlaces:

Tablero de Trello - Gestión del Sprint
Diseño y Wireframe en Figma
Estado del Desarrollo
Sprint 1 - Interfaz y base del proyecto
Planificación del proyecto, creación del repositorio y estructuración del tablero en Trello.
Diseño de wireframes en Figma.
Maquetación de la interfaz base con Bootstrap (tema oscuro).
Formulario de registro de tareas con validación de campos.
Lista de tareas dinámica con prioridad y estado.
Reproductor de música de Spotify integrado.
Sprint 2 - JavaScript y gestión de tareas (Actual)
Tarea 4: creación de la clase TaskManager, que administra el registro de tareas.
Tarea 5: método addTask() con identificador único (currentId) y conexión del formulario con TaskManager.
Tarea 6: método deleteTask(), botón "Eliminar" en cada tarjeta y persistencia con localStorage (save(), load() y render()), de modo que las tareas, incluidas las eliminadas, se mantienen al recargar la página.
Además: el botón "Completar" cambia el estado de la tarea y también se guarda.
Estructura del proyecto
GestorDtareas/
├── index.html      # Estructura de la página
├── stilo.css       # Estilos
├── TaskManager.js  # Clase TaskManager (addTask, deleteTask, save, load, render)
├── app.js          # Formulario, validación, eventos y reproductor de Spotify
└── README.md
Cómo ejecutarlo
Clona el repositorio: git clone https://github.com/IzaacAO/GestorDtareas.git
Abre index.html en el navegador (o usa la extensión Live Server de VS Code).
<p align="center">Desarrollado con 💜 por <b>Isaac Alarcón Ospina</b></p>
