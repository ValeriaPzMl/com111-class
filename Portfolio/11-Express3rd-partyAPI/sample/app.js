// app.js
const express = require('express');
const https = require('https');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Serve the index.html file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Weather API endpoint
app.get('/weather', (req, res) => {
  const city = req.query.city || 'London'; // Default city if none provided
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      const weatherData = JSON.parse(data);

      if (apiRes.statusCode === 200) {
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        res.send(`
          <h1>Clima en ${city}</h1>
          <p>Temperatura: ${temp}°C</p>
          <p>Descripción: ${description}</p>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
          <br><a href="/">Volver al inicio</a>
        `);
      } else {
        // Muestra el mensaje de error de la API en la respuesta
        res.send(`
          <h1>Error</h1>
          <p>${weatherData.message}</p>
          <br><a href="/">Volver al inicio</a>
        `);
      }
    });
  }).on('error', (e) => {
    res.send(`
      <h1>Error</h1>
      <p>Hubo un problema al conectarse al servicio de clima. Intenta de nuevo más tarde.</p>
      <br><a href="/">Volver al inicio</a>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
