
require('dotenv').config()


const express = require('express');

const app = express();

// const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const path = require('path');

const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');


const mdpApi = process.env.PROJECT_API_KEY;

const nameApi = process.env.NAME;

// mongodb + srv://<username>:<password>@cluster0.e9dod.mongodb.net/?retryWrites=true&w=majority

var dataBase = `mongodb+srv://${nameApi}:${mdpApi}@cluster0.e9dod.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dataBase,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // ou bodyParser.json()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// servir le dossier image quand on fait une requete avec /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// pour cette route la on utilise la route stuffRouter
app.use('/api/stuff', stuffRoutes);

// routeur d authentification
app.use('/api/auth', userRoutes);


module.exports = app;

