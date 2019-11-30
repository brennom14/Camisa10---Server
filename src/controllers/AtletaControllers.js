const Users = require("../models/Atleta");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function menf(params) { return "Usuario com o email: " + params + " não existente!" }

async function valida(params, a) {
  const user = await Users.findOne({ email: params })
  if (user) { if (a) { return true } return user; }
  if (a) { return false } return menf(params)
}
function token(params) { return jwt.sign({ params }, "hakuna matata", { expiresIn: 9000000000 }) }

async function list(params) {
  if (params) { return await Users.find({ status: true }, params) }
  return await Users.find({ status: true }, '-status')
}
async function adm(params) { return await Users.findOne({ email: params, adm: true }, '_id') }


module.exports = {
  async store(req, res) {
    try {
      if (await Users.findOne({ email: req.body.email })) {

        return res.status(400).send({ erro: "Email já cadastrado" })
      }

      let user = await Users.create(req.body);


      ({ senha, ...user } = user._doc);

      return res.send({ user, token: token({ email: user.email }) });

    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
  async list(req, res) { return res.json(await list(req.body.campos)) },
  async index(req, res) { return res.json(await valida(req.params.email)); },
  async update(req, res) {
    try {
      if (await valida(req.params.email, true)) { return res.json(await Users.findOneAndUpdate({ email: req.params.email }, req.body, { new: true })) }
      return res.json(menf(req.params.email))
    } catch (error) { return res.json(error.message); }
  },
  async destroy(req, res) {
    try {
      if (await valida(req.params.email, true)) {
        await Users.findOneAndUpdate({ email: req.params.email }, { status: false })
        return res.json({ mensagem: "Exclusão realizada com sucesso!" });
      }
      return res.json(menf(req.params.email))
    } catch (error) { return res.json(error.message); }
  },
  async aut(req, res) {
    let { email, senha } = req.body;
    let user = await Users.findOne({ email }).select('+senha')
    if (!user) return res.status(406).send({ error: "Usuario não cadastrado" })
    if (!await bcrypt.compare(senha, user.senha)) {
      res.status(406).send({ error: "Senha incorreta" })
    } ({ senha, ...user } = user._doc);
    return res.send({ user, token: token({ email: user.email }) });
  }

};
