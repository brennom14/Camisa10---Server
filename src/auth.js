const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(400).send({ Erro: "Token não recebido " })
    }
    const parts = auth.split(' ');
    if (!parts.lenght == 2) {
        return res.status(400).send({ Erro: "Erro no Token" })
    }
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(400).send({ Erro: "Token mal formatado" })
    }

    jwt.verify(token, "hakuna matata", (err, decoded) => {///mud "a"
        if (err) { return res.status(400).send({ Erro: "Token Invalido" }) }
        req.userEmail = decoded.params.email;
        return next()
    })
}