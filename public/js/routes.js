angular.module('routes', [])




  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", { //Endereço a ser digitado
        templateUrl: "/views/home.html", // view a ser utilizada
        controller: "" // Controlador a ser utilizado
      })
      .when("/usuario", { //Endereço a ser digitado
        templateUrl: "/views/usuario.html", // view a ser utilizada
        controller: "mainCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroUsuario", { //Endereço a ser digitado
        templateUrl: "/views/cadastroUsuario.html", // view a ser utilizada
        controller: "signupCtrl" // Controlador a ser utilizado
      })
      .when("/unidade", { //Endereço a ser digitado
        templateUrl: "/views/unidade.html", // view a ser utilizada
        controller: "unidadeMedidaCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroUnidade", { //Endereço a ser digitado
        templateUrl: "/views/cadastroUnidade.html", // view a ser utilizada
        controller: "unidadeMedidaCtrl" // Controlador a ser utilizado
      })
      .when("/status", { //Endereço a ser digitado
        templateUrl: "/views/status.html", // view a ser utilizada
        controller: "statusCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroStatus", { //Endereço a ser digitado
        templateUrl: "/views/cadastroStatus.html", // view a ser utilizada
        controller: "statusCtrl" // Controlador a ser utilizado
      })
      .when("/grupoPecas", { //Endereço a ser digitado
        templateUrl: "/views/grupoPecas.html", // view a ser utilizada
        controller: "grupoPecasCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroGrupoPecas", { //Endereço a ser digitado
        templateUrl: "/views/cadastroGrupoPecas.html", // view a ser utilizada
        controller: "grupoPecasCtrl" // Controlador a ser utilizado
      })
      .when("/categoria", { //Endereço a ser digitado
        templateUrl: "/views/categoria.html", // view a ser utilizada
        controller: "categoriaCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroCategoria", { //Endereço a ser digitado
        templateUrl: "/views/cadastroCategoria.html", // view a ser utilizada
        controller: "categoriaCtrl" // Controlador a ser utilizado
      })
      .when("/transportadora", { //Endereço a ser digitado
        templateUrl: "/views/transportadora.html", // view a ser utilizada
        controller: "transportadoraCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroTransportadora", { //Endereço a ser digitado
        templateUrl: "/views/cadastroTransportadora.html", // view a ser utilizada
        controller: "transportadoraCtrl" // Controlador a ser utilizado
      })
      .when("/produto", { //Endereço a ser digitado
        templateUrl: "/views/produto.html", // view a ser utilizada
        controller: "produtoCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroProduto", { //Endereço a ser digitado
        templateUrl: "/views/cadastroProduto.html", // view a ser utilizada
        controller: "produtoCtrl" // Controlador a ser utilizado
      })
      .when("/fornecedor", { //Endereço a ser digitado
        templateUrl: "/views/fornecedor.html", // view a ser utilizada
        controller: "fornecedorCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroFornecedor", { //Endereço a ser digitado
        templateUrl: "/views/cadastroFornecedor.html", // view a ser utilizada
        controller: "fornecedorCtrl" // Controlador a ser utilizado
      })
      .when("/cliente", { //Endereço a ser digitado
        templateUrl: "/views/cadastroCliente2.html", // view a ser utilizada
        controller: "fornecedorCtrl" // Controlador a ser utilizado
      })
      .when("/cadastroPlanejamento", { //Endereço a ser digitado
        templateUrl: "/views/cadastroPlanejamento.html", // view a ser utilizada
        controller: "planejamentoCtrl" // Controlador a ser utilizado
      })

      .when('/contato/:id', {
        templateUrl: "/views/contato.html",
        controller: "contatoCtrl"
      })



      .when("/login", {
        templateUrl: "/views/login.html"
      })

      .when('/404', {
        templateUrl: '/views/404.html',
      })
      .otherwise('/login');
  })
