const BookModel = require('../models/BookModel');

exports.bookIndex = async function(req, res) {
    return res.render('cadastro-livros');
}

exports.postBook = async function(req, res) {
    try {
        const book = new BookModel(req.body);
        await book.createBook();
        req.session.books = book;
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
    } catch (error) {
        res.render('404');
        console.log(error);
    }
    
}

exports.deleteBook = async function(req, res) {
    try {
        const book = new BookModel(req.body);
        console.log(req.params)
        book.deleteBook(req.params.id);
        req.flash('success', 'Livro deletado.');
        req.session.save(() => {
            res.redirect('/');
        })
        return;
    } catch (error) {
        res.render('404');
        console.log(error);
    }


}