const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    genero: { type: String, required: true },
    autor: { type: String, required: true }, 
    editora: { type: String, required: true },
    dataPublicacao: { type: Date, default: Date.now },
})

const BookModel = mongoose.model('Books', BookSchema);