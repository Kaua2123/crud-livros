const mongoose = require('mongoose');

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
        this.user = null;
    }

    async register () {
        if(this.errors.length > 0) return;
        if(!this.body.nome || !this.body.email || !this.body.password) {
            this.errors.push('Preencha todos os campos.');
            return;
        }
        if(this.errors.length > 0) return;

        
        await UserModel.create({nome: this.nome, email: this.email, password: this.password});
    }
}

module.exports = User;