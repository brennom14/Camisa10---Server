const notificacoes = require("../models/Notificacao");


function menf(params) { return "Contação com o id: " + params + " não existente!" }

async function list(params) {
  if (params) {
    return await notificacoes.find(params).populate('atleta')
  }
  return await notificacoes.find({ status: true }, '-status').populate('user comercio')
}

module.exports = {
  async store(req, res) {
    try {

      const notificacao = await notificacoes.create(req.body);
      console.log(notificacao);

      return res.send(await notificacoes.findOne({ _id: notificacao._id }).populate('atleta'))

    } catch (erro) {
      return res.json(erro.message);
    }
  },
  async list(req, res) { return res.json(await list(req.body.campos)) },


  async index(req, res) { return res.json(await notificacoes.find({ atleta: req.params.id, lidaPeloJogador: false })) },

  async notificacaolida(req, res) {
    try {
      const _id = req.params.id;
      /*
      if (await valida(_id,true)){return res.json(await notificacoes.findOneAndUpdate({_id},req.body,{new:true}))}
      return res.json(menf(_id))*/
      await notificacoes.findOneAndUpdate({ _id }, { lidaPeloJogador: true })
      return res.json("ok")
    } catch (error) { return res.json(error.message); }
  },


  async update(req, res) {
    try {
      const _id = req.params.id;
      if (await valida(_id, true)) { return res.json(await notificacoes.findOneAndUpdate({ _id }, req.body, { new: true })) }
      return res.json(menf(_id))
    } catch (error) { return res.json(error.message); }
  },
  async destroy(req, res) {
    try {
      const _id = req.params.id;
      if (await valida(_id, true)) {
        await notificacoes.findOneAndUpdate({ _id }, { status: false })
        return res.json({ mensagem: "Exclusão realizada com sucesso!" })
      }
      return res.json(menf(_id))
    } catch (error) { return res.json(error.message); }
  }
};