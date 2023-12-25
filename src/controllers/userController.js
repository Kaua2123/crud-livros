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
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}

exports.indexLogin = async function(req, res) {
    return res.render('login')
}

exports.loginUser = async function(req, res) {
    try {
        const user = new UserModel(req.body);
        await user.login();

        if(user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(() => {
                res.redirect('/user/login')
            })
            return;
        }

        req.flash('success', 'Você entrou na sua conta.')
        req.session.save(() => {
            res.redirect('/user/login')
        })

        return;
    } catch (e) {
        console.log(e);
    }
}