const express = require('express');
const route = express.Router();

const { isLogged } = require('./src/middlewares/middlewares');

//controllers
const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/userController');
const bookController = require('./src/controllers/bookController');

// Rotas da home
route.get('/', homeController.index);

// Usuário
route.get('/user/cadastro', userController.indexCadastro);
route.post('/user/cadastro/post', userController.postUser);
route.get('/user/login', userController.indexLogin);
route.post('/user/login/post', userController.loginUser);
route.get('/user/login/logout', userController.logoutUser);

// Livros
route.get('/book/index', bookController.bookIndex);
route.post('/book/index/post', isLogged, bookController.postBook);
route.post('/book/delete/:id', isLogged, bookController.deleteBook);


module.exports = route;
