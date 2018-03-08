'use strict';
// Nesse arquivo nós listamos todos as extensões do angular necessárias para funcionamento
angular.module('SOL', ['angular-jwt', 'ngRoute', 'controllers', 'services', 'routes', 'angularUtils.directives.dirPagination','angularMoment','ngMask','ui.bootstrap','angular-flot'])

  .run(function($location) {
    if(window.localStorage.getItem('ngStorage-token') == null) {
      $location.path('/login');
    } else {
      document.getElementById('menu').style.visibility = "visible";
      document.getElementById('wrapper').style.backgroundColor="#f8f8f8";

    }
  })




/*

ngRoute - Lib necessária para configuração das rotas.
controllers - Nesse arquivo teremos as funções que controlam as views do sistema.
services - Nesse arquivo teremos as conexões com a API do sistema
routes -  Esse arquivo serve para configuração das rotas. Utilizaremos as rotas feitas pelo angular, toda manipulação de caminho é feita no front-end
          Dessa forma o backend fica somente responsavel por execultar tarefas de CRUD
*/
