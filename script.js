// Variables globales
const tareas = obtenerTareasDesdeLocalStorage();

// Función para agregar una nueva tarea
function agregarTarea() {
  // Obtenemos el valor del campo de texto
  const tarea = document.querySelector("input[name='tarea']").value.trim();
  const fechaRecordatorio = document.querySelector("input[name='fecha']").value;
  const horaRecordatorio = document.querySelector("input[name='hora']").value;

  // Guardar la tarea en localStorage
  guardarTareaEnLocalStorage(tarea, fechaRecordatorio, horaRecordatorio);

  // Actualizamos la lista de tareas
  actualizarListaTareas();

  // Limpiamos el formulario
  document.querySelector("input[name='tarea']").value = "";
  document.querySelector("input[name='fecha']").value = "";
  document.querySelector("input[name='hora']").value = "";
}

// Función para marcar una tarea como completada
function marcarTareaCompletada(tareaIndex) {
  // Marcamos la tarea como completada
  tareas[tareaIndex].completada = true;

  // Actualizamos la lista de tareas
  actualizarListaTareas();
}

// Función para eliminar una tarea
function eliminarTarea(tareaIndex) {
  // Eliminamos la tarea del arreglo
  tareas.splice(tareaIndex, 1);

  // Actualizamos la lista de tareas
  actualizarListaTareas();
}

// Función para actualizar la lista de tareas
function actualizarListaTareas() {
  // Vaciamos la lista
  const listaTareas = document.querySelector(".tareas");
  listaTareas.innerHTML = "";

  // Recorremos el arreglo de tareas
  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];

    // Creamos un elemento <li> para cada tarea
    const li = document.createElement("li");
    li.classList.add("tarea");

    // Agregamos el texto de la tarea al elemento <li>
    const textoTarea = document.createTextNode(tarea.tarea);
    li.appendChild(textoTarea);

    // Si la tarea está marcada como completada, la tachamos
    if (tarea.completada) {
      li.classList.add("tarea-completada");
    }

    // Agregamos un botón para marcar la tarea como completada
    const botonCompletar = document.createElement("button");
    botonCompletar.classList.add("tarea-completar");
    botonCompletar.textContent = "Completar";
    botonCompletar.addEventListener("click", () => marcarTareaCompletada(i));
    li.appendChild(botonCompletar);

    // Agregamos un botón para eliminar la tarea
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("tarea-eliminar");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => eliminarTarea(i));
    li.appendChild(botonEliminar);

    // Agregamos el elemento <li> a la lista
    listaTareas.appendChild(li);

    // Programar la notificación si la fecha y hora aún no ha pasado
    const fechaHoraRecordatorio = new Date(
      `${tarea.fechaRecordatorio}T${tarea.horaRecordatorio}`
    );
    const ahora = new Date();
    if (fechaHoraRecordatorio > ahora && !tarea.completada) {
      programarNotificacion(tarea.tarea, fechaHoraRecordatorio);
    }
  }
}

// Función para guardar una tarea en localStorage
function guardarTareaEnLocalStorage(tarea, fechaRecordatorio, horaRecordatorio) {
  const tareaObj = {
    tarea: tarea,
    fechaRecordatorio: fechaRecordatorio,
    horaRecordatorio: horaRecordatorio,
    completada: false
  };

  // Obtener tareas existentes del localStorage
  const tareasGuardadas = obtenerTareasDesdeLocalStorage();

  // Agregar la nueva tarea a la lista
  tareasGuardadas.push(tareaObj);

  // Guardar la lista actualizada en localStorage
  localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}

// Función para obtener tareas desde localStorage
function obtenerTareasDesdeLocalStorage() {
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
  return tareasGuardadas;
}

// Función para programar una notificación
function programarNotificacion(tarea, fechaHoraRecordatorio) {
  if (
    'Notification' in window &&
    Notification.permission === 'granted' &&
    fechaHoraRecordatorio
  ) {
    const tiempoRestante = fechaHoraRecordatorio - new Date();
    setTimeout(() => {
      new Notification('Recordatorio de Tarea', {
        body: tarea,
        icon: 'icono.png'
      });
    }, tiempoRestante);
  }
}

// Obtener el botón y agregar un listener al evento click
const botonAgregar = document.querySelector("button");
botonAgregar.addEventListener("click", agregarTarea);

// Cargar las tareas al iniciar la aplicación
actualizarListaTareas();
