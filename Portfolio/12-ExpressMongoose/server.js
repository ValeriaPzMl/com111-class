const express = require("express");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const app = express();
require("dotenv").config(); // Cargar variables de entorno

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Construir URL de conexión a MongoDB Atlas (sin `+srv`)
const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/${process.env.DB}?authSource=admin&replicaSet=atlas-shard-0&ssl=true`;

// Conectar a MongoDB Atlas
async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error al conectar a MongoDB Atlas:", err);
  }
}

connectToMongoDB();

// Definir esquemas y modelos
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date, // Tipo `Date` para almacenar fechas
  nationality: String,
  url: String,
  team: teamSchema,
});

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Función para convertir fecha al formato `YYYY-MM-DD`
function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}

// Función para cargar y limpiar los datos del CSV
async function loadCSVtoMongoDB() {
  const results = [];

  fs.createReadStream(path.join(__dirname, "public", "data", "f1_2023.csv"))
    .pipe(csv())
    .on("data", (row) => {
      // Limpiar las claves de cada fila
      const cleanedRow = {};
      for (const key in row) {
        const cleanedKey = key.trim().replace(/[^\x20-\x7E]/g, ""); // Limpia espacios y caracteres especiales
        cleanedRow[cleanedKey] = row[key];
      }

      // Convertir `dob` al formato compatible
      if (cleanedRow.dob) {
        cleanedRow.dob = parseDate(cleanedRow.dob);
      }

      results.push(cleanedRow);
    })
    .on("end", async () => {
      try {
        await Driver.insertMany(results); // Inserta todos los datos limpios a MongoDB
        console.log("Datos cargados a MongoDB correctamente");
      } catch (error) {
        console.error("Error al cargar datos a MongoDB:", error);
      }
    });
}

// Llamar a la función para cargar los datos del CSV en MongoDB
loadCSVtoMongoDB();

// Configuración de rutas
app.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.render("index", { drivers });
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).send("Error al obtener datos");
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
