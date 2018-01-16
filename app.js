//Servidor web


//Express é a framework utilizado para o Back-End.
const express = require('express');
const app = express();

//Usado para manipulação do Body.
const bodyParser = require('body-parser')
const routes = require('./routes');
//Usado para manipulação do Json.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));



//Ferramenta para proteger aplicação.
const helmet = require('helmet');
app.use(helmet());



//Conexao com o banco será feita no arquivo db.js
const dbfun = require('./db.js');
//Variavel para saída do log
const l = require('./Log.js');

var Usuario = require('./Usuario');
app.use('/usuario', Usuario);

// ===========  Separação em modulos  =========== //

// var Parametrizacao = require('./Parametrizacao');
// app.use('/parametrizacao', Parametrizacao)
//
// var Comercial = require('./Comercial');
// app.use('/comercial', Comercial)
//
// var Expedicao = require('./Expedicao');
// app.use('/expedicao', Expedicao)
//
// var Pcp = require('./Pcp');
// app.use('/pcp', Pcp)
//
// var Projetos = require('./Projetos');
// app.use('/projetos', Projetos)
//
// var Qualidade = require('./Qualidade');
// app.use('/qualidade', Qualidade)
//
// var Suprimentos = require('./Suprimentos');
// app.use('/suprimentos', Suprimentos)

// ===========  Separação em modulos  =========== //


//Permite Acesso externo na aplicação
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
  next();
});


//Pasta utilizada para o frontEnd vai ser a pasta WWW
app.use('/', express.static(__dirname + '/public'));


//Exemplo de módulo para cada componente da aplicação
//const Mod1 = require('./Mod1');
//app.use('/mod1', Mod1)






routes(app);
// Quando quiser rodar a aplicação sem especificar a porta use esse comando
// app.listen(process.env.PORT_APP, function() {
//     console.log('Rodando porta' + process.env.PORT_APP);
// });

app.listen(3000, function() {
  console.log('Rodando porta 3000');
});
