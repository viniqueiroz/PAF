angular.module('controllers', [])

  // Controller responsavel pela página Home
  // .controller('homeCtrl', ['$rootScope', function($rootScope) {
  //   if(window.localStorage.getItem('ngStorage-token') == null) {
  //     $rootScope.login = true;
  //   } else {
  //     $rootScope.login = false;
  //   }
  // }])

  // Controller responsavel pela página Home
  .controller('modalCtrl', ['$rootScope', '$scope', 'API', function($rootScope, $scope, API) {
    $scope.editData = API.getData();

  }])

  // Controller responsavel pela página de Logout
  .controller('mainCtrl', ['jwtHelper', '$rootScope', '$scope', 'API', function(jwtHelper, $rootScope, $scope, API) {

    $scope.deslogar = function() {

      API.logout();
      window.location.reload();
    }

    // key = window.localStorage.getItem('ngStorage-token')
    // key = key.replace("\"", "").replace("\"", "");
    // keydec = jwtHelper.decodeToken(key);
    //basta chamar keydec.id para usar o id do usuário







     $scope.pushData = function(data) {

       API.pushData(data);
    }


    API.getAllUsers().then(function(data) { /// Passa para a pagina todos os usuarios

      $scope.personalDetails = data;

    });

    $scope.addNew = function(personalDetails) {
      $scope.personalDetails.push({
        'nome': personalDetails.nome,
        // 'lname': personalDetails.lname,
        'email': personalDetails.email,
        // 'tipo': personalDetails.tipoUsuario.descricao,
      });
      $scope.PD = {};
    };

    $scope.removerUsuario = function() { /// Remove o Usuario
      var s = false;
      angular.forEach($scope.personalDetails, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerUsuario(selected).then(function(res) {
            if(res.status) {
              console.log("Usuário removido");
            } else {
              console.log("Erro ao remover Usuário");
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Usuários Removidos");
        window.location.reload();
      }

    };

    // $scope.remover = function() {
    //   var newDataList = [];
    //   $scope.selectedAll = false;
    //   angular.forEach($scope.personalDetails, function(selected) {
    //     if(!selected.selected) {
    //       newDataList.push(selected);
    //     }
    //   });
    //   $scope.personalDetails = newDataList;
    // };

    // Essa função edita o usuario
    $scope.editarUsuario = function(data) {
      // console.log(data)
      if(data.senha==null){
        alert("É necessário preencher a senha")
      }else{
        API.editarUsuario(data).then(function(res) {
          alert(res.message);
          window.location.reload();
        })
      }
    }

    // Essa função pega o usuario no banco que deve ser editado para preencher os campos
    $scope.getUsuario = function(data) {
      // console.log(data)
      API.getUsuario(data).then(function(res) {
        $scope.usuario = res;
      });
    }

    // Essa função pega o usuario no banco que deve ser utilizado no menu principal
    $scope.getUser = function() {
      key = window.localStorage.getItem('ngStorage-token')
      key = key.replace("\"", "").replace("\"", "");
      keydec = jwtHelper.decodeToken(key);
      data = {
        id : keydec.id
      }
      API.getUser(data).then(function(res) {
        $rootScope.user = res;
      });
    }
    $scope.ordenar = function(keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
    };
    $scope.addNew = function(personalDetails) {
      $scope.personalDetails.push({
        'nome': personalDetails.nome,
        // 'lname': personalDetails.lname,
        'email': personalDetails.email,
        // 'tipo': personalDetails.tipoUsuario.descricao,
      });
      $scope.PD = {};
    };

    $scope.remove = function() { /// remove o usuario
      var newDataList = [];
      $scope.selectedAll = false;
      angular.forEach($scope.personalDetails, function(selected) {
        if(!selected.selected) {
          newDataList.push(selected);
        }
      });
      $scope.personalDetails = newDataList;
    };

    $scope.checkAll = function() { /// Percorre todos os usuarios cadastrados
      if(!$scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.personalDetails, function(personalDetails) {
        personalDetails.selected = $scope.selectedAll;
      });
    };

    $scope.edit = function() { /// Edita o usuario
      var newDataList = [];
      $scope.selectedAll = false;
      angular.forEach($scope.personalDetails, function(selected) {
        if(!selected.selected) {
          newDataList.push(selected);
        }
      });
      if(newDataList.length <= 1) {
        alert("Por favor selecione apenas 1 usuário por vez para edição!");
      } else {

      }

    };

  }])


  // Controller responsavel pela página de Grupo de pecas
  .controller('grupoPecasCtrl', ['$rootScope', '$scope', 'API', '$window', function($rootScope, $scope, API, $window) {

    API.getGrupoPeca().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.grupoPecas = data;
      // console.log(data);
    });

    $scope.checkAll = function() { /// Percorre todos os grupos cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.grupoPecas, function(grupoPecas) {
        grupoPecas.selected = $scope.selectedAll;
      });
    };

    $scope.cadastrarGrupoPeca = function() { /// Cadastra um novo grupo
      var grupoPeca = $scope.grupoPeca //Recebe os dados da view
      API.cadastroGrupoPeca(grupoPeca).then(function(res) {
        if(res.status) {
          console.log("Grupo de peça Cadastrado")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Grupo de peças")
        }
      }, function(err) {
        console.log(err)
      })
    }

    $scope.getGrupoP = function(data) { /// Recebe os dados que vão preencher a tela de edição
      // console.log(data)
      API.getGrupoP(data).then(function(res) {
        $scope.grupoPeca = res;
      });
    }

    $scope.editarGrupoPeca = function(data) { /// Edita o grupo
      // console.log(data)
      API.editarGrupoPeca(data).then(function(res) {
        alert(res.message);
        $window.location.reload();
      })
    }

    $scope.removerGrupoPeca = function() { /// Remove o grupo
      var s = false;
      angular.forEach($scope.grupoPecas, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerGrupoPeca(selected).then(function(res) {
            if(res.status) {
              console.log("Grupo de peça removido")
            } else {
              console.log("Erro ao remover Grupo de peças")
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Grupo de Peça Removido");
        $window.location.reload();
      }

    };


  }])









  // Controller responsavel pela página de Unidade de Medida
  .controller('unidadeMedidaCtrl', ['$rootScope', '$scope', 'API', '$location', '$window', function($rootScope, $scope, API, $location, $window) {
    API.getUnidadeMedida().then(function(data) { /// Passa para a pagina todos as unidades de medida
      $scope.unidadesMedida = data;
    });

    // Essa função pega a unidade no banco que deve ser editada para preencher os campos
    $scope.getUnidade = function(data) {
      API.getUnidade(data).then(function(res) {
        $scope.unidade = res;
      });
    }

    // $scope.getUnidade = function(){}
    //   var unidadeMedida = $scope.unidadeMedida //Recebe os dados da unidade
    //   API.getUnidade(unidadeMedida).then(function(data) {
    //     $scope.unidadesMedida = data;
    //     console.log(data);
    //   });
    // }

    $scope.checkAll = function() { /// Percorre todos as unidades cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.unidadesMedida, function(unidadesMedida) {
        unidadesMedida.selected = $scope.selectedAll;
      });
    };

    $scope.cadastroUnidade = function() { /// Cadastra uma unidade
      var unidadeMedida = $scope.unidadeMedida; //Recebe os dados da view
      API.cadastroUnidade(unidadeMedida).then(function(res) {

        if(res.status) {
          console.log(res.message)
          alert(res.message);
          $window.location.reload();



        } else {
          console.log(res.message)
          alert(res.message);
          $window.location.reload();
        }
      });


    }

    // Essa função edita a unidade de medida
    $scope.editarUnidade = function(data) {
      // console.log(data)
      API.editarUnidade(data).then(function(res) {
        alert(res.message);
        $window.location.reload();
      })
    }


    $scope.removerUnidade = function() { /// Remove a unidade
      var s = false;
      angular.forEach($scope.unidadesMedida, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerUnidade(selected).then(function(res) {
            if(res.status) {
              console.log("Unidade de Medida removida")
            } else {
              console.log("Erro ao remover Unidade de Medida")
            }
          })
        }

      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Unidades de Medida Removidas");
        $window.location.reload();
      }

    };


  }])

  // Controller responsavel pela página de Status
  .controller('statusCtrl', ['$rootScope', '$scope', 'API', '$location', '$window', function($rootScope, $scope, API, $location, $window) {

    API.getStatus().then(function(data) { /// Passa para a pagina todos os status
      $scope.listaStatus = data;
      // console.log(data);
    });

    $scope.getStat = function(data) { /// Recebe os dados que vão preencher a tela de edição
      // console.log(data)
      API.getStat(data).then(function(res) {
        $scope.status = res;
      });
    }


    $scope.checkAll = function() { /// Percorre todos os status cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.listaStatus, function(listaStatus) {
        listaStatus.selected = $scope.selectedAll;
      });
    };

    $scope.cadastrarStatus = function() { /// Cadastra um novo status
      var status = $scope.status //Recebe os dados da view
      API.cadastroStatus(status).then(function(res) {
        if(res.status) {
          console.log("Status Cadastrado")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Status")
          alert(res.message);
        }
      }, function(err) {
        console.log(err)
      })
    }


    $scope.editarStatus = function(data) { /// Edita o status
      // console.log(data)
      API.editarStatus(data).then(function(res) {
        alert(res.message);
        window.location.reload();
      })
    }

    $scope.removerStatus = function() { /// Remove o status
      var s = false;
      angular.forEach($scope.listaStatus, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerStatus(selected).then(function(res) {
            if(res.status) {
              console.log("Status removido")
            } else {
              console.log("Erro ao remover Status")
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Status Removidos");
        $window.location.reload();
      }

    };


  }])

  // Controller responsavel pela página de Contato
  .controller('contatoCtrl', ['$rootScope', '$scope', 'API', '$location', '$window','$routeParams', function($rootScope, $scope, API, $location, $window, $routeParams) {

    var id = $routeParams.id
    // routeProvider.when('/contato/:id', {templateUrl: '/views/contato.html' + id});
    // $location.path('contato/' + id);  /// Passa o id do cliente da view de cliente para contato
    API.getContatoName(id).then(function(res) {
      $scope.ct = {
        nomeCliente : res.nome
      }
    });

    $scope.getContato = function(data) { /// Recebe os dados que vão preencher a tela de edição
      API.getContato(data).then(function(res) {
        $scope.contato = res;
      });
    }

    API.getContatos(id).then(function(data) { /// Passa para a pagina todos os contatos de um determinado cliente
      $scope.listaContatos = data;
    });


    $scope.checkAll = function() {  /// Percorre todos os contatos cadastrados de um determinado cliente
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.listaContatos, function(listaContatos) {
        listaContatos.selected = $scope.selectedAll;
      });
    };

    $scope.cadastroContato = function(data) { /// Cadastra um novo contato
      data.id = id;
      API.cadastroContato(data).then(function(res) {
        if(res.status) {
          alert(res.message);
          $window.location.reload();
        } else {
          alert(res.message);
        }
      }, function(err) {
      })
    }

    $scope.editarContato = function(data) { /// Edita o contato
      API.editarContato(data).then(function(res) {
        alert(res.message);
        window.location.reload();
      })
    }

    $scope.removerContato = function() { /// Remove o status
      var s = false;
      angular.forEach($scope.listaContatos, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerContato(selected).then(function(res) {})
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Contato Removido");
        window.location.reload();
      }

    };

  }])


  // Controller responsavel pela página de Cliente - Pessoa Física e Jurídica
  .controller('categoriaCtrl', ['$rootScope', '$scope', 'API', '$location', '$window', function($rootScope, $scope, API, $location, $window) {

    API.getCategorias().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.categorias = data;
      // console.log(data);
    });

    $scope.checkAll = function() { /// Percorre todos os grupos cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.categorias, function(categorias) {
        categorias.selected = $scope.selectedAll;
      });
    };

    $scope.cadastrarCategoria = function() { /// Cadastra um novo grupo
      var categoria = $scope.categoria //Recebe os dados da view
      API.cadastroCategoria(categoria).then(function(res) {
        if(res.status) {
          console.log("Cataegoria Cadastrada")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Categoria")
        }
      }, function(err) {
        console.log(err)
      })
    }

    $scope.getCategoria = function(data) { /// Recebe os dados que vão preencher a tela de edição
      // console.log(data)
      API.getCategoria(data).then(function(res) {
        $scope.categoria = res;
      });
    }

    $scope.editarCategoria = function(data) { /// Edita o grupo
      // console.log(data)
      API.editarCategoria(data).then(function(res) {
        alert(res.message);
        $window.location.reload();
      })
    }

    $scope.removerCategoria = function() { /// Remove o grupo
      var s = false;
      angular.forEach($scope.categorias, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerCategoria(selected).then(function(res) {
            if(res.status) {
              console.log("Categoria removida")
            } else {
              console.log("Erro ao remover Categoria")
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Categoria Removida");
        $window.location.reload();
      }

    };

  }])

  // Controller responsavel pela página de Cliente - Pessoa Física e Jurídica
  .controller('transportadoraCtrl', ['$rootScope', '$scope', 'API', '$location', '$window', function($rootScope, $scope, API, $location, $window) {

    API.getTransportadoras().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.transportadoras = data;
      // console.log(data);
    });

    $scope.checkAll = function() { /// Percorre todos os grupos cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.transportadoras, function(transportadoras) {
        transportadoras.selected = $scope.selectedAll;
      });
    };

    $scope.cadastrarTransportadora = function() { /// Cadastra um novo grupo
      var transportadora = $scope.transportadora //Recebe os dados da view
      API.cadastroTransportadora(transportadora).then(function(res) {
        if(res.status) {
          console.log("Transportadora Cadastrada")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Transportadora")
        }
      }, function(err) {
        console.log(err)
      })
    }

    $scope.getTransportadora = function(data) { /// Recebe os dados que vão preencher a tela de edição
      // console.log(data)
      API.getTransportadora(data).then(function(res) {
        $scope.transportadora = res;
      });
    }

    $scope.editarTransportadora = function(data) { /// Edita o grupo
      console.log(data);
      API.editarTransportadora(data).then(function(res) {
        alert(res.message);
        $window.location.reload();
      })
    }

    $scope.removerTransportadora = function() { /// Remove o grupo
      var s = false;
      angular.forEach($scope.transportadoras, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerTransportadora(selected).then(function(res) {
            if(res.status) {
              console.log("Transportadora removida")
            } else {
              console.log("Erro ao remover Transportadora")
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Transportadora Removida");
        $window.location.reload();
      }

    };

  }])


  // Controller responsavel pela página de Cliente - Pessoa Física e Jurídica
  .controller('produtoCtrl', ['$rootScope', '$scope', 'API', '$location', '$window', function($rootScope, $scope, API, $location, $window) {

    API.getProdutos().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.produtos = data;
      // console.log(data);
    });

    $scope.checkAll = function() { /// Percorre todos os grupos cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.produtos, function(produtos) {
        produtos.selected = $scope.selectedAll;
      });
    };

    $scope.cadastrarProduto = function() { /// Cadastra um novo grupo
      var produto = $scope.produto //Recebe os dados da view
      API.cadastroProduto(produto).then(function(res) {
        if(res.status) {
          console.log("Produto Cadastrado")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Produto")
        }
      }, function(err) {
        console.log(err)
      })
    }

    $scope.getProduto = function(data) { /// Recebe os dados que vão preencher a tela de edição
      // console.log(data)
      API.getProduto(data).then(function(res) {
        $scope.produto = res;
      });
    }

    $scope.editarProduto = function(data) { /// Edita o grupo
        console.log(data);
      API.editarProduto(data).then(function(res) {
        alert(res.message);
        $window.location.reload();
      })
    }

    $scope.removerProduto = function() { /// Remove o grupo
      var s = false;
      angular.forEach($scope.produtos, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerProduto(selected).then(function(res) {
            if(res.status) {
              console.log("Produto removido")
            } else {
              console.log("Erro ao remover Produto")
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Produto Removido");
        $window.location.reload();
      }

    };

  }])

  // Controller responsavel pela página de Cliente - Pessoa Física e Jurídica
  .controller('fornecedorCtrl', ['$rootScope', '$scope', 'API', '$location', '$window', function($rootScope, $scope, API, $location, $window) {

    API.getFornecedores().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.fornecedores = data;
      // console.log(data);
    });

    $scope.checkAll = function() { /// Percorre todos os grupos cadastrados
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.fornecedores, function(fornecedores) {
        fornecedores.selected = $scope.selectedAll;
      });
    };

    $scope.cadastrarFornecedor = function() { /// Cadastra um novo grupo
      var fornecedor = $scope.fornecedor //Recebe os dados da view
      API.cadastroFornecedor(fornecedor).then(function(res) {
        if(res.status) {
          console.log("Fornecedor Cadastrado")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Fornecedor")
        }
      }, function(err) {
        console.log(err)
      })
    }

    $scope.getFornecedor = function(data) { /// Recebe os dados que vão preencher a tela de edição
      // console.log(data)
      API.getFornecedor(data).then(function(res) {
        $scope.fornecedor = res;
      });
    }

    $scope.editarFornecedor = function(data) { /// Edita o grupo
      // console.log(data)
      API.editarFornecedor(data).then(function(res) {
        alert(res.message);
        $window.location.reload();
      })
    }

    $scope.removerFornecedor = function() { /// Remove o grupo
      var s = false;
      angular.forEach($scope.fornecedores, function(selected) {
        if(selected.selected) {
          s = true;
          API.removerFornecedor(selected).then(function(res) {
            if(res.status) {
              console.log("Fornecedor removido")
            } else {
              console.log("Erro ao remover Fornecedor")
            }
          })
        }
      });
      if(!s) {
        alert("Nenhum Item Selecionado")
      } else {
        alert("Fornecedor Removido");
        $window.location.reload();
      }

    };

  }])


  // Controller responsavel pela página de Planejamento
  .controller('planejamentoCtrl', ['jwtHelper','$rootScope', '$scope', 'API', '$window', function(jwtHelper,$rootScope, $scope, API, $window) {


    API.getCategorias().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.categorias = data;
      //console.log(data);
    });

    API.getTransportadoras().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.transportadoras = data;
      //console.log(data);
    });
    API.getFornecedores().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.fornecedores = data;
      //console.log(data);
    });
    API.getProdutos().then(function(data) { /// Passa para a pagina todos os grupos de peças
      $scope.produtos = data;
      //console.log(data);
    });

API.getPlanejamentos().then(function(data){
$scope.planejamentos = data ;

});


    $scope.cadastrarPlanejamento = function() { /// Cadastra um novo grupo
      key = window.localStorage.getItem('ngStorage-token')
      key = key.replace("\"", "").replace("\"", "");
      keydec = jwtHelper.decodeToken(key);
      var planejamento = $scope.planejamento //Recebe os dados da view
      console.log(planejamento);
      planejamento.idStatus=2;
      planejamento.idUnidadeMedida=1;
      planejamento.idUsuario= keydec.id ;

      API.cadastroPlanejamento(planejamento).then(function(res) {
        if(res.status) {
          console.log("Planejameto Cadastrado")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Planejameto")
        }
      }, function(err) {
        console.log(err)
      })
    }



  }])


  // Controller responsavel pela página de Planejamento
  .controller('operacionalCtrl', ['jwtHelper','$rootScope', '$scope', 'API', '$window', function(jwtHelper,$rootScope, $scope, API, $window) {
var keyCtrl = 'operacional';
    $scope.selectedRow = null;  // initialize our variable to null
      $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
         $scope.selectedRow = index;
            }




API.getPlanejamentosByStatus(3).then(function(data){
$scope.planejamentosPendentes = data ;

});

$scope.registrarOperacao = function(data) { /// Cadastra um novo grupo
  API.pushData(keyCtrl,data);
}





    $scope.cadastrarRegistroOperacional = function() { /// Cadastra um novo grupo
      key = window.localStorage.getItem('ngStorage-token')
      key = key.replace("\"", "").replace("\"", "");
      keydec = jwtHelper.decodeToken(key);
      var registroOperacional = $scope.registroOperacional //Recebe os dados da view
      console.log(registroOperacional);
      registroOperacional.idUserInicio= keydec.id ;
      registroOperacional.idPlanejamento= API.getData();
      API.cadastroRegistroOpereacional(registroOperacional).then(function(res) {
        if(res.status) {
          console.log("Registro Operacional Cadastrado")
          alert(res.message);
          $window.location.reload();


        } else {
          console.log("Erro ao adicionar Registro Operacional")
        }
      }, function(err) {
        console.log(err)
      })
    }



  }])

  // Controller responsavel pela página de Planejamento
  .controller('cadastroOperacionalCtrl', ['jwtHelper','$rootScope', '$scope', 'API', '$window','moment', function(jwtHelper,$rootScope, $scope, API, $window,moment) {
    var keyCtrl = 'operacional';

var planId = API.getData(keyCtrl);
API.getPlanejamento(planId).then(function(response){
$scope.planejamentoARegistrar=response;

if(response.idRegistroOperacional){
  API.getRegistroOperacional(response.idRegistroOperacional).then(function(response){
    console.log(response);
    $scope.registroOperacional = response;

    $scope.registroOperacional.dataEntrada = new Date(moment($scope.registroOperacional.dataEntrada).format('YYYY,MM,DD'));



    $scope.registroOperacional.dataSaida =new Date(moment($scope.registroOperacional.dataSaida).format('YYYY,MM,DD'));


  });


};
});

API.getTransportadoras().then(function(response){
$scope.transportadoras=response;

});
API.getStatus().then(function(response){
$scope.allStatus=response;
});

$scope.tempoOp = function() {
        var duracaoH= moment($scope.registroOperacional.horaSaida).diff(moment($scope.registroOperacional.horaEntrada));
        var duracaoD= moment($scope.registroOperacional.dataSaida).diff(moment($scope.registroOperacional.dataEntrada));
        var somaTotal = moment.duration(duracaoH+duracaoD);
          $scope.registroOperacional.tempoOperacao = Math.floor(somaTotal.asHours()) + moment.utc(somaTotal.asMilliseconds()).format(":mm");
                            };

  $scope.pesoEst = function(){

      $scope.registroOperacional.pesoEstimado = parseFloat($scope.registroOperacional.pesoEntrada)+parseFloat($scope.registroOperacional.pesoSaida);
  };


$scope.pesoFinal = 1000 ;



    $scope.cadastrarRegistroOperacional = function() { /// Cadastra um novo grupo
      key = window.localStorage.getItem('ngStorage-token')
      key = key.replace("\"", "").replace("\"", "");
      keydec = jwtHelper.decodeToken(key);
      var registroOperacional = $scope.registroOperacional //Recebe os dados da view
      console.log(registroOperacional);
      registroOperacional.idUserOpInicio= keydec.id ;
      registroOperacional.idPlanejamento= $scope.planejamentoARegistrar.id;
      API.cadastroOperacional(registroOperacional).then(function(res) {
        if(res.status) {
          var planejamentoARegistrar = $scope.planejamentoARegistrar;
          planejamentoARegistrar.idRegistroOperacional = res.operacionalId;
          API.editarPlanejamento(planejamentoARegistrar).then(function(resP){
            console.log("Registro Operacional Cadastrado")
            alert(res.message);
            $window.location.reload();
          });



        } else {
          console.log("Erro ao adicionar Registro Operacional")
        }
      }, function(err) {
        console.log(err)
      })
    }



  }])


  // Controller responsavel pela página de Planejamento
  .controller('passagemTurnoCtrl', ['jwtHelper','$rootScope', '$scope', 'API', '$window','moment', function(jwtHelper,$rootScope, $scope, API, $window,moment) {

    API.getPlanejamentosByStatus(3).then(function(data){
    $scope.planejamentosFinalizados = data ;

    });




  }])









  // Controller responsavel pela página de Cadastro
  .controller('signupCtrl', ['$rootScope', '$scope', 'API', function($rootScope, $scope, API) {

    API.getAllUsers().then(function(data) {
      $scope.user = data; //passa para a pagina todos os usuários
      // console.log(data);
    });

    $scope.checkAll = function() {
      if($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.user, function(user) {
        user.selected = $scope.selectedAll;
      });
    };

    //
    $scope.cadastroUsuario = function() {
      var usuario = $scope.usuario //Recebe os dados da view
      if(usuario.cosenha != usuario.senha) {
        //Caso senha não bata com a repetição da mesma
        alert("As senhas não batem");
      } else {
        API.cadastroUsuario(usuario).then(function(res) {
          if(res.status) {
            console.log("Usuário registrado.")

            alert(res.message);
            window.location.reload();
            // window.location = "#!/login"; // O cadastro pode ser de n usuarios
          } else {
            console.log("Algum erro no cadastro.")
          }
        }, function(err) {
          console.log(err)
        })
      }

    }

  }])


  // Controller responsavel pela página de Login
  .controller('loginCtrl', ['$rootScope', '$scope', 'API', '$window', function($rootScope, $scope, API, $window) {
    $scope.logar = function() {
      var usuario = $scope.user //Recebe os dados da view

      API.loginUsuario(usuario).then(function(data) {
        if(data.status) {
          console.log("Logado");
          // alert("Bem-Vindo "+data.name);
          // console.log(data);
          //Salva no navegador token para o usuário
          window.localStorage.setItem('ngStorage-token', "\"" + data.token + "\"");
          window.localStorage.setItem('ngStorage-user_role', data.role);
          //Salva no navegador a id do usuário
          // window.localStorage.setItem('id', data.idUsuario.toString());
          // window.localStorage.setItem('name', data.nome.toString());
          document.getElementById('menu').style.visibility = "visible";
          document.getElementById('wrapper').style.backgroundColor="#f8f8f8";
          location.replace('#/'); //Redireciona para a pag inicial
          location.reload(); //Att a pag
        } else {
          console.log("Login/Senha incorretos");
          if(!status){alert(data.message)}
        }
      });
    }

  }])
