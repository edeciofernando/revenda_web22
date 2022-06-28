const dbKnex = require("../data/db_config");  // dados de conexão com o banco de dados

module.exports = {

    async index(req, res) {
        try {
            const likes = await dbKnex("likes as l")
                .select("l.id", "l.like", "c.modelo", "u.nome as usuario")
                .innerJoin('carros as c', 'carro_id', 'c.id')
                .innerJoin('usuarios as u', 'l.usuario_id', 'u.id')
            res.status(200).json(likes); // retorna statusCode ok e os dados
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },

    async store(req, res) {
        // faz a desestruturação dos dados recebidos no corpo da requisição
        const { usuario_id, carro_id, like } = req.body;

        // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
        if (!usuario_id || !carro_id) {
            res.status(400).json({ msg: "Enviar usuario, carro e like" });
            return;
        }

        // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
        try {
            // insert, faz a inserção na tabela likes (e retorna o id do registro inserido)
            const novo = await dbKnex("likes").insert({ usuario_id, carro_id, like });
            res.status(201).json({ id: novo[0] }); // statusCode indica Create

            try {
                if (like) {
                    await dbKnex("carros").update({ n_likes: dbKnex.raw("n_likes + 1") }).where({ id: carro_id });
                } else {
                    await dbKnex("carros").update({ n_dislikes: dbKnex.raw("n_dislikes + 1") }).where({ id: carro_id });
                }
            } catch (error) {
                res.status(400).json({ msg: error.message }); // retorna status de erro e msg
            }

        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    }
}