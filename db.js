//Biblioteca para facilitar uso do Mysql
const mysqlModel = require('mysql-model');
//  Add no module.exports cada objeto com as tabelas q eles manipulam
//  Obj: connection.extend({
//     tableName: "tab1,tab2"
//  }) //QuestaoResolvida
//
//


// Conexão com o banco de dados
const connection = mysqlModel.createConnection({
  host: 'rtzsaka6vivj2zp1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
  user: 'xeu48ud78tim1j0r',
  password:'e33y0q89bo4us7s4',
  connectionLimit: 1,
  database: 'ciyjrvz0tocudnkz'
});



// Chave privada utilizada para criptografia do usuário.
// Criar outras entidades para o acesso ao banco.
module.exports = {

  //Cadastro

  Categoria: connection.extend({
  	tableName: "categoria"
  }),
  Transportadora: connection.extend({
  	tableName: "transportadora"
  }),
  Produto: connection.extend({
  	tableName: "produto"
  }),
  Fornecedor: connection.extend({
  	tableName: "fornecedor"
  }),



  ContatoClientes: connection.extend({
    tableName: "contatoClientes"
  }),


  //Consultas



  //Relatórios


  //Registro Operacional



  //Planejamento



  //Passagem de Turno



  //Parametrização


  Usuario: connection.extend({
    tableName: "usuario"
  }),
  GrupoPeca: connection.extend({                // Verificar, o banco ainda não possui a tabela
    tableName: "grupoPeca"
  }),
  UnidadeMedida: connection.extend({
    tableName: "unidadeMed"
  }),
  Status: connection.extend({                   // Verificar, o banco ainda não possui a tabela
    tableName: "statusUsuario"
  }),




  secret: 'gtHnbE34.(fmj35_gh97_mBvTIn' //Colocar chave para ser utilizada na criptografia
};
