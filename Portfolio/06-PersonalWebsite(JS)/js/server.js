
  function addScheduleEntry() {
    // Obtener los valores del formulario
    let event = document.querySelector('input[name="event"]').value;
    let startTime = document.querySelector('input[name="start"]').value;
    let endTime = document.querySelector('input[name="end"]').value;
    let activity = document.querySelector('input[name="activity"]').value;
    let place = document.querySelector('input[name="place"]').value;
    let type = document.querySelector('select[name="type"]').value;
    let notes = document.querySelector('textarea[name="notes"]').value;
    let freeTime = document.querySelector('input[name="free"]').checked ? "Free" : "Busy";
    let flagColor = document.querySelector('input[name="flag"]').value;

    // Crear una nueva fila en la tabla
    let table = document.querySelector("#scheduleTable tbody");
    let newRow = table.insertRow();

    var tableTitle = document.querySelector("#scheduleTitle");
    tableTitle.innerHTML = "Schedule for Event: " + event;

    // Crear celdas para cada columna
    let eventCell = newRow.insertCell(0);
    let startCell = newRow.insertCell(1);
    let endCell = newRow.insertCell(2);
    let activityCell = newRow.insertCell(3);
    let placeCell = newRow.insertCell(4);
    let typeCell = newRow.insertCell(5);
    let notesCell = newRow.insertCell(6);
    let flagCell = newRow.insertCell(7);
    let freeTimeCell = newRow.insertCell(8);

    // Insertar los valores en las celdas
    eventCell.innerHTML = event;
    startCell.innerHTML = startTime;
    endCell.innerHTML = endTime;
    activityCell.innerHTML = activity;
    placeCell.innerHTML = place;
    typeCell.innerHTML = type;
    notesCell.innerHTML = notes;
    flagCell.innerHTML = `<div style="background-color:${flagColor}; width: 20px; height: 20px;"></div>`;
    freeTimeCell.innerHTML = freeTime;

    // Limpiar el formulario
    document.querySelector('form').reset();

    document.principal="si este";
  }


