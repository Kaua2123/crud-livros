exports.middlewareGlobal = async function(req, res, next) {

    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.session = req.session.sessao;

    next();
}

exports.isLogged = async function(req, res, next) {

    if (req.session.sessao != 'logado') req.flash('errors', 'Você precisa estar logado!');

    next();
}