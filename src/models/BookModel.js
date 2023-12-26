const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    genero: { type: String, required: true },
    autor: { type: String, required: true }, 
    editora: { type: String, required: true },
    dataPublicacao: { type: Date, default: Date.now },
})

const BookModel = mongoose.model('Books', BookSchema);

class Book {
    constructor(body) {
        this.body = body;
        this.nome = body.nome;
        this.genero = body.genero
        this.autor = body.autor;
        this.editora = body.editora;
        this.errors = [];
        this.books = null;
    }

    async createBook() {
        this.valida();

        const buscaLivro = await BookModel.findOne({ nome: this.nome });
        if (buscaLivro != null) this.errors.push('Já existe um livro com esse nome.');
        if (this.errors.length > 0) return;

        await BookModel.create({ nome: this.nome, genero: this.genero, autor: this.autor, editora: this.editora});
    }

    valida() {
        if (!this.nome || !this.genero || !this.autor || !this.editora) this.errors.push('Todos os campos são obrigatórios.');
        if (this.errors.length > 0) return;
        
    }

    async deleteBook(id) {
        await BookModel.findByIdAndDelete({_id: id});
    }

    static async searchBooks () {
        const books = await BookModel.find();
        return books;
    }
}

module.exports = Book;