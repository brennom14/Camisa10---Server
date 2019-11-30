const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')

const ObservadorSchema = new Schema({
    status: { type: Boolean, default:true,enum:{values:[true,false],message:'O valor deve ser boolean'}},
    adm: { type: Boolean, default:false,enum:{values:[true,false],message:'O valor deve ser boolean'}},
    nome: {
      type: String,
      required: [true, "O Nome é uma informação obrigatoria"],
      match: [/^[a-zA-Z0-9 ]+$/, 'O nome só pode conter letras e números']
  },
  email: {
      type: String,
      required: [true, "O email é uma informação obrigatoria"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'email com formado incompleto. Um email deve'+
      'contar com o apelido seguido do @, o provedor de hospedagem e a '+
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
dataNascimento: {
  type: Date,
  required: [true, "A data de nascimento é uma informação obrigatória"],
},
sexo: {
  type: String,
},
cpf: {
  type: String,
  unique:true,
},
cidade: {
  type: String,
},
obsDesde: {
  type: Date,
},
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Atleta",
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: "Atleta",
  }],
},{versionKey: false},{timestamps: true});
   ObservadorSchema.pre('findOneAndUpdate', function(next) {
    
  });

module.exports = model("Observador", ObservadorSchema);
