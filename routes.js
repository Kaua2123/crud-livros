const express = require('express');
const route = express.Router();

const { isLogged } = require('./src/middlewares/middlewares');

//controllers
const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/userController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de usuário
route.get('/user/cadastro', userController.indexCadastro);
route.post('/user/cadastro/post', userController.postUser);
route.get('/user/login', userController.indexLogin);
route.post('/user/login/post', userController.loginUser);
route.get('/user/login/logout', userController.logoutUser);


module.exports = route;
