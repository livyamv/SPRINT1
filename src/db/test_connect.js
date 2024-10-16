const connect_database = require("./connect_database");

module.exports = function testConnect() {
  try {
    const query = `SELECT 'Conexão bem-sucedida' AS Mensagem`;
    connect_database.query(query, function (err) {
      if (err) {
        console.log("Conexão não realizada", err);
        return;
      }
      console.log("Conexão realizada com Mysql");
    });
  } catch (error) {
    console.error("Erro a executar a consulta:", error);
  }
};