const UserModel = require('../models/UserModel');

exports.indexCadastro = async function(req, res) {
    return res.render('cadastro')
}

exports.postUser = async function(req, res) {
    try {
        const user = new UserModel(req.body);
        await user.register();

        if(user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(() => {
                res.redirect('/user/cadastro')
            })
            return;
        }
       req.flash('success', 'Você foi cadastrado com sucesso!')
        req.session.save(() => {
             res.redirect('/user/cadastro')
        })
       
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }

}

exports.indexLogin = async function(req, res) {
    return res.render('login')
}