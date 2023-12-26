exports.middlewareGlobal = async function(req, res, next) {

    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.session = req.session.sessao;
    res.locals.books = req.session.books;

    next();
}

exports.isLogged = async function(req, res, next) {

    if (req.session.sessao != 'logado') req.flash('errors', 'Você precisa estar logado!');

    next();
}