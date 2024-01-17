const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/ArreglosCiberseguridad', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());



app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${27017}`);
});

const Usuario = require('./models/Usuario');

app.post('/registro', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/inicio-sesion', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ username, password });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});
