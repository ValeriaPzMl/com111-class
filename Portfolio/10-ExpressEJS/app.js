// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración del motor de plantillas EJS y middlewares
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // Manejo de datos de formularios
app.use(express.json()); // Manejo de datos JSON

// Variables para almacenar datos temporales
const posts = [];
let userName = '';

// Rutas

// Ruta raíz para renderizar index.ejs
app.get('/', (req, res) => {
  res.render('index'); // Renderiza index.ejs como la página de inicio
});

// Ruta para manejar el formulario de login (POST)
app.post('/login', (req, res) => {
  console.log("login"); // Esto debería aparecer en la consola
  userName = req.body.name; // Obtiene el nombre del usuario desde el formulario
  res.render('greeting', { name: userName, method: 'POST' });
});

// Ruta para mostrar la página principal del blog
app.get('/home', (req, res) => {
  if (!userName) {
    // Si el usuario no está logueado, redirige al inicio
    res.redirect('/');
  } else {
    res.render('home', { userName, posts });
  }
});

// Ruta para manejar el envío de nuevos posts
app.post('/new-post', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost); // Agrega el nuevo post al array de posts
  res.redirect('/home'); // Redirige de nuevo a /home para ver la lista de publicaciones
});

// Ruta para mostrar un post específico
app.get('/post/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render('post', { post });
  } else {
    res.redirect('/home');
  }
});

// Inicia el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
