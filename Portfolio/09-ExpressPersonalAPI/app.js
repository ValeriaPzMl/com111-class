const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración del motor de plantillas EJS y middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let names = []; // Lista para almacenar los nombres de los usuarios saludados
let tasks = []; // Lista para almacenar las tareas

// Rutas

// Ruta raíz para renderizar index.ejs
app.get('/', (req, res) => {
  res.render('index', { names, tasks });
});

// Ruta para manejar el formulario de saludo en /greet
app.get('/greet', (req, res) => {
  const name = req.query.name;
  if (name) {
    names.push(name);
  }
  res.redirect('/');
});

// Ruta para saludar individualmente a un usuario con su nombre en /wazzup/:index
app.get('/wazzup/:index', (req, res, next) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < names.length) {
    res.render('wazzup', { name: names[index] });
  } else {
    const error = new Error('El nombre no existe en la lista');
    next(error);
  }
});

// Ruta para manejar el formulario de tareas en /task (POST)
app.post('/task', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/');
});

// Ruta para eliminar una tarea en /task/delete/:index
app.get('/task/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

// Endpoint para obtener todas las tareas en JSON (accesible solo desde Postman)
app.get('/task', (req, res) => {
  res.json(tasks);
});

// Endpoint para agregar un nombre usando el método PUT (accesible solo desde Postman)
app.put('/greet/:name', (req, res) => {
  const name = req.params.name;
  if (name) {
    names.push(name);
  }
  res.json(names);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Error: ${err.message}`);
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
