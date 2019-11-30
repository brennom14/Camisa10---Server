const Atleta = require("../models/Atleta");
const Observador = require("../models/Observador");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { atletaId } = req.params;
    
    const observador = await Observador.findById(user);
    const atleta = await Atleta.findById(atletaId);

    if (!atleta) {
      return res.status(400).json({ error: "Atleta nao existe" });
    }

    observador.dislikes.push(atleta._id);

    await observador.save();

    return res.json(observador);
  }
};
