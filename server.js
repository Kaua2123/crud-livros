require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const routes = require('./routes');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose'); //para modelagem 
 
//arquivos estáticos (Ejs)
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(routes);
app.use(flash());

//conectando mongoose ao mongoDB, passando a chave de conexão fornecida
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));

//conexão ao mongoDB
const sessionOptions = session({
  secret: 'blablablablbalbalb',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);

//view, ejs
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});