const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true}
});

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(body) {
        this.body = body;
        this.nome = body.nome;
        this.email = body.email;
        this.password = body.password;
        this.errors = [];
        this.success = [];
        this.user = null;
    }

    async register () {
        if(this.body.nome === "" && this.body.email === "" && this.body.password === "") {
            this.errors.push('Preencha todos os campos.');
            return;
        }
        if(this.errors.length > 0) return;

        if(!validator.isEmail(this.email)) {
            this.errors.push('Preencha um email válido.');
            return;
        }
        if(this.errors.length > 0) return;

        const hashPassword = bcrypt.hashSync(this.password, 8)
    
        await UserModel.create({nome: this.nome, email: this.email, password: hashPassword});
        this.success.push('Você foi cadastrado com sucesso!');
    }
}

module.exports = User;