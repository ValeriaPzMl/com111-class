const express = require("express");
const https = require("https");
require("dotenv").config(); // Para cargar las variables de entorno

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname);

// Función para enviar datos a Mailchimp
function sendToMailchimp(data, url, options, successCallback, failureCallback) {
    const mailRequest = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const jsonResp = JSON.parse(data);
                if (jsonResp["error_count"] === 0) {
                    successCallback();
                } else {
                    console.error("Mailchimp Error Code:", jsonResp.errors[0]["error_code"]);
                    console.error("Mailchimp Error:", jsonResp.errors[0]["error"]);
                    failureCallback();
                }
            });
        } else {
            failureCallback();
        }
    });

    mailRequest.write(data);
    mailRequest.end();
}

// Ruta principal para mostrar el formulario
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

// Manejo del envío del formulario
app.post("/", (req, res) => {
    const { fName, lName, email } = req.body;

    // Datos para enviar a Mailchimp
    const data = JSON.stringify({
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                },
            },
        ],
    });

    const listId = "1556e62296"; // Reemplázalo por tu lista real
    const apiKey = process.env.MAILCHIMP_API_KEY; // Cargado desde .env
    const url = `https://us2.api.mailchimp.com/3.0/lists/${listId}`;
    const options = {
        method: "POST",
        auth: `user:${apiKey}`,
    };

    const name = "<li>Item 1</li><li>Item 2</li>";

    // Enviar datos a Mailchimp
    sendToMailchimp(
        data,
        url,
        options,
        () => res.render("success.html", { name: name }),
        () => res.render("failure.html", { name: name })
    );
});

// Rutas de redirección
app.get("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.redirect("/");
});

// Servidor en escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
