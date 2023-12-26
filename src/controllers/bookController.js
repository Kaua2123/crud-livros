exports.bookIndex = async function(req, res) {
    return res.render('cadastro-livros');
}

exports.postBook = async function(req, res) {
    console.log(req.body);
}