const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static('public'));  // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.urlencoded({ extended: true }));

// Si decides usar EJS o cualquier otro motor de plantillas, esto se aplicaría
app.engine('html', require('ejs').renderFile);  
app.set('view engine', 'html');

// Cambia 'views' para que busque en 'public/html' si usas plantillas.
app.set('views', __dirname + '/public/html');  // Configura la ruta de las vistas correctamente

var names = [];

app.route('/')

    .get((req, res) => {
        res.render('index.html', { names: names });  // Express buscará 'index.html' en 'public/html'
    })

    .post((req, res) => {
        var name = req.body.name;
        names.push(name);
        res.render('index.html', { names: names });  // Misma ruta para renderizar
    });

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});
