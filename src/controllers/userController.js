const UserModel = require('../models/UserModel');

exports.indexCadastro = async function(req, res) {
    return res.render('cadastro')
}

exports.postUser = async function(req, res) {
    const user = new UserModel(req.body);
    user.register();

}

exports.indexLogin = async function(req, res) {
    return res.render('login')
}