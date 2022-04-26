const bcrypt = require('bcrypt');
const dbKnex = require("../data/db_config");  // dados de conexão com o banco de dados

const saltRounds = 10;

module.exports = {

    async index(req, res) {
        try {
            // para obter os usuarios pode-se utilizar .select().orderBy() ou apenas .orderBy()
            const usuarios = await dbKnex("usuarios");
            res.status(200).json(usuarios); // retorna statusCode ok e os dados
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },

    async store(req, res) {
        // faz a desestruturação dos dados recebidos no corpo da requisição
        const { nome, email, senha } = req.body;

        // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
        if (!nome || !email || !senha) {
            res.status(400).json({ msg: "Enviar nome, email e senha do usuario" });
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(senha, salt);

        // console.log(salt)
        // console.log(hash)

        // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
        try {
            // insert, faz a inserção na tabela usuarios (e retorna o id do registro inserido)
            const novo = await dbKnex("usuarios").insert({ nome, email, senha: hash });
            res.status(201).json({ id: novo[0] }); // statusCode indica Create
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    },

    async login(req, res) {
        // faz a desestruturação dos dados recebidos no corpo da requisição
        const { email, senha } = req.body;

        // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
        if (!email || !senha) {
            res.status(400).json({ msg: "Enviar email e senha do usuario" });
            return;
        }

        // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
        try {
            // consulta o e-mail no banco de dados
            const dados = await dbKnex("usuarios").where({ email });
            // se não encontrou...
            if (dados.length == 0) {
                res.status(400).json({ msg: "E-mail não cadastrado..." }); // retorna status de erro e msg
                return;
            }

            // se existe, compara a senha informada com a senha cadastrada no banco
            if (bcrypt.compareSync(senha, dados[0].senha)) {
                res.status(200).json({msg: "Ok! Login Realizado com Sucesso"})
            } else {
                res.status(400).json({ msg: "Senha Incorreta..." }); // retorna status de erro e msg
            }
        } catch (error) {
            res.status(400).json({ msg: error.message }); // retorna status de erro e msg
        }
    }

}