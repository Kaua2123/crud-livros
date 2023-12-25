const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: false },
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
        this.user = null;
    }

    async register () {
        this.valida();

        const hashPassword = bcrypt.hashSync(this.password, 8)
        
        const buscaEmail = await UserModel.findOne({ email: this.email }); // se já existe um email igual
        if(buscaEmail != null) this.errors.push('Usuário já existe.');
        if(this.errors.length > 0) return;

        this.user = await UserModel.create({ nome: this.nome, email: this.email, password: hashPassword });
    }

    valida () {
        if(!this.email || !this.password) this.errors.push('O email e a senha são obrigatórios.')
        if(this.errors.length > 0) return;

        if(!validator.isEmail(this.email)) this.errors.push('Preencha um email válido.');
        if(this.errors.length > 0) return;
    }

    async login () {
        this.valida();
        
        let user = await UserModel.findOne({ nome: this.nome, email: this.email });

        if(user != null) {
            const comparador = bcrypt.compareSync(this.password, user.password)
            if(!comparador) this.errors.push('Incorreto. Verifique seu email ou senha.') 

            user = await UserModel.findOne({ nome: this.nome, email: this.email, password: user.password })
        }
        else {
            this.errors.push('Usuário não encontrado.')
            return;
        }
    }


}

module.exports = User;