const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')

const AtletaSchema = new Schema({
  status: { type: Boolean, default: true, enum: { values: [true, false], message: 'O valor deve ser boolean' } },
  adm: { type: Boolean, default: false, enum: { values: [true, false], message: 'O valor deve ser boolean' } },
  nome: {
    type: String,
    required: [true, "O Nome é uma informação obrigatoria"],
    match: [/^[a-zA-Z0-9 ]+$/, 'O nome só pode conter letras e números']
  },
  idade: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "O email é uma informação obrigatoria"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'email com formado incompleto. Um email deve' +
      'contar com o apelido seguido do @, o provedor de hospedagem e a ' +
      'finalidade(com,edu,org,gov). Exemplo apelido@provedor.org']
  },
  senha: {
    type: String,
    required: [true, "A senha é uma informação obrigatoria"],
    select: false,
  },
  celular: {
    type: String,
    required: [true, "O celular é uma informação obrigatoria"],
    unique: true,
    lowercase: true, 
},
sexo: {
  type: String,
},
peso: {
  type: String,
},
posicao: {
  type: String,
},
altura: {
  type: String,
},
lastClube: {
  type: String,
},
dataNascimento: {
  type: Date,
  required: [true, "A data de nascimento é uma informação obrigatória"],
},
peDominante: {
type: String,

},
agenteAtleta:{
type: String,
},

cidade: {
  type: String,
  required: [true, "A cidade é uma informação obrigatória"],
  lowercase: false, 
},
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Observador",
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: "Observador",
  }],
}, { versionKey: false }, { timestamps: true });

AtletaSchema.pre('save', async function (next) {
  this.senha = await bcrypt.hash(this.senha, 6)
  next();
})
AtletaSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  for (let i = 0; i < ((update = Object.keys(this._update)).length - 2); i++) {
    if (this.schema._requiredpaths.indexOf(update[i].toLowerCase()) == -1) {
      next(new Error('Campo "' + update[i] + '" é invalido!'))
    }
  }
  if (this._update.email) { next(new Error('O email não pode ser alterado!')) }
  next();
});

module.exports = model("Atleta", AtletaSchema);
