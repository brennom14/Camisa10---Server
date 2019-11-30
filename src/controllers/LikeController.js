const Atleta = require("../models/Atleta");
const Observador = require("../models/Observador");

module.exports = {
  async store(req, res) {

    const { user } = req.headers;
    const { atletaId } = req.params;

    const observador = await Observador.findById(user);
    const atleta = await Atleta.findById(atletaId);

    if (!atleta) {
      res.status(400).json({ error: "Dev not exists" });
    }

    observador.likes.push(atleta._id);

    await observador.save();

    res.json(observador);
  }
}
