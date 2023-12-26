const BookModel = require('../models/BookModel');

exports.bookIndex = async function(req, res) {
    return res.render('cadastro-livros');
}

exports.postBook = async function(req, res) {
    const book = new BookModel(req.body);
    await book.createBook();

    if(book.errors.length > 0) {
        req.flash('errors', book.errors);
        req.session.save(() => {
            res.redirect('/book/index')
        });
        return;
    }

    req.flash('success', 'Seu livro foi cadastrado com sucesso.');
    req.session.save(() => {
        res.redirect('/book/index')
    });
    return;
}