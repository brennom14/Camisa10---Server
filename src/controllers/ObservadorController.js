const Observador = require("../models/Observador");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function token(params) { return jwt.sign({ params }, "hakuna matata", { expiresIn: 9000000000 }) }

module.exports = {
    async store(req, res) {
        try {
            if (await Observador.findOne({ email: req.body.email })) {

                return res.status(400).send({ erro: "Email já cadastrado" })
            }

            let user = await Observador.create(req.body);


            ({ senha, ...user } = user._doc);

            return res.send({ user, token: token({ email: user.email }) });

        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    async list(req, res) {
        if (req.body.campos)
             res.send(await Observador.find({ status: true }, params))
        res.send( await Observador.find({ status: true }))
    },
};
