const Comercios = require("../models/Comercio");
const User = require("../models/User");

function menf(params) { return "Comercio com o CNPJ: " + params + " não existente!" }
async function list(params) {
  if (params) { return await Comercios.find({ status: true }, params) }
  return await Comercios.find({ status: true }, '-status')
}
async function adm(params) { return await User.findOne({ email: params, adm: true }, '_id') }
async function valida(params, a) {
  const comercio = await Comercios.findOne({ cnpj: params })
  if (comercio) { if (a) { return true } return comercio; }
  if (a) { return false } return menf(params)
}

module.exports = {

  async store(req, res) {
    try {
      if (await adm(req.userEmail)) {
        const comercio = await Comercios.findOne({ cnpj: req.body.cnpj })
        if (comercio) {
          return res.status(400).send({ mensagem: "Empresa ja cadastrada já cadastrado\n " + comercio })
        } return res.send(await Comercios.create(req.body));
      } return res.status(401).send({ erro: "Usuario sem autorização para realizar cadastro" })
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
  async list(req, res) { return res.json(await list(req.body.campos)) },
  async index(req, res) { return res.json(await valida(req.params.cnpj)) },
  async update(req, res) {
    try {
      if (await valida(req.params.cnpj, true)) { return res.json(await Comercios.findOneAndUpdate({ cnpj: req.params.cnpj }, req.body, { new: true })); }
      return res.json(menf(req.params.cnpj))
    } catch (error) { return res.json(error.message); }
  },
  async destroy(req, res) {
    try {
      if (await valida(req.params.cnpj, true)) {
        await Comercios.findOneAndUpdate({ cnpj: req.params.cnpj }, { status: false })
        return res.json({ mensagem: "Exclusão realizada com sucesso!" });
      }
      return res.json(menf(req.params.cnpj))
    } catch (error) { return res.json(error.message); }
  },
};
