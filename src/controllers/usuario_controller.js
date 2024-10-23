const connect_database = require("../db/connect_database");

module.exports = class usuario_controller {
  static async cadastrar_usuario(req, res) {
    const { nome, email, senha, check_senha } = req.body;

    if (!nome || !email || !senha || !check_senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else if (senha !== check_senha) {
      return res
        .status(400)
        .json({ error: "as senhas não coincidem (não estão iguais)" });
    } else {
      const query = `INSERT INTO usuario (senha, email, nome_usuario, check_senha) VALUES( 
                '${senha}', 
                '${email}', 
                '${nome}',
                '${check_senha})`;
      try {
        connect_database.query(query, function (err, results) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({
                  error: "O email já está vinculado a outro usuário x(",
                });
            } else {
              return res
                .status(500)
                .json({ error: "erro interno do servidor :(" });
            }
          } else {
            return res
              .status(201)
              .json({ message: "cadastro realizado com sucesso." });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro interno do servidor" });
      }
    }
  }
  static async login_usuario(req, res){
    const { nome, email, senha} = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }
    let query = `SELECT * FROM usuario WHERE nome=?, email=?, senha=?`
    const values = [nome, email, senha];
    try{
        connect_database.query(query, values, function(err, results){ //"results" é um booleano, então ele retornará "true" ou "false"
           if(err){
            console.error(err);
            console.log(err.code);
            return res.status(500).json({
                error: "erro interno do servidor :("
            });
           } 
           const login_check = results;
           if(login_check){

           }
           
        });
    }
    catch(error){

    }
  }
};


