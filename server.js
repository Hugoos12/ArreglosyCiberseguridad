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
