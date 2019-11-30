const { Schema, model } = require("mongoose");

const NotificacoesSchema = new Schema({
  status: { type: Boolean, default:true},
  atleta: {
    type: Schema.Types.ObjectId,
    ref:'Atleta',
    required: true,
  },
  obs: {
    type: Schema.Types.ObjectId,
    ref: 'Observador',
    required: true,
  },
  mensagem: {
    type: String,
    required: true
  },
  lidaPeloJogador:{type: Boolean, default:false},
  lidaPeloObs:{type: Boolean, default:false},
},{versionKey: false},{timestamps: true});

 /* NotificacoesSchema.pre('save', function(next){
    
  })

  NotificacoesSchema.pre('findOneAndUpdate', function(next) {
   
  });*/
module.exports = model("Notificacoes", NotificacoesSchema);
