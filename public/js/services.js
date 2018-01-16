angular.module('services', [])

  .factory('API', ['$http', function($http, $httpProvider) {
    var baseUrl = "http://localhost:3000"; //"http://192.168.1.104:3300"
    var dataPushed=[];
    return {

      /// Status ///

      /// Retorna todos os status para preencher a tabela
      getStatus: function(data) {
      return  $http.get(baseUrl + '/getStatus/').then(function (response) {
         return response.data;
            });
      },
      /// Retorna o status que vai preencher a subtela de edição
      getStat: function(data) {
       return  $http.get(baseUrl + '/getStat/'+data.idStatus).then(function (response) {
         return response.data;
            });
      },
      /// Transfere os dados para cadastro de um status
      cadastroStatus: function(data, success, error) {
      return  $http.post(baseUrl + '/cadastrarStatus', data).then(function (response) {
           return response.data;
              });
      },
      /// Transfere os dados para a edição de um status
      editarStatus: function(data) {
      return  $http.put(baseUrl + '/editarStatus/'+data.idStatus,data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere dados para a seleção do status que vai ser removido
      removerStatus: function(data) {
      return  $http.delete(baseUrl + '/removerStatus/'+data.idStatus).then(function (response) {
         return response.data;
            });
      },

      /// Unidade de Medida ///

      /// Retorna todos as unidades para preencher a tabela
      getUnidadeMedida: function(data) {
      return  $http.get(baseUrl + '/getUnidadeMedida/').then(function (response) {
         return response.data;
            });
      },
      /// Retorna a unidade que vai preencher a subtela de edição
      getUnidade: function(data) {
      return  $http.get(baseUrl + '/getUnidade/'+data.idUnit).then(function (response) {
         return response.data;
            });
      },
      /// Transfere os dados para cadastro de uma unidade
      cadastroUnidade: function(data) {
      return  $http.post(baseUrl + '/cadastrarUnidade', data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere os dados para a edição de uma unidade
      editarUnidade: function(data) {
      return  $http.put(baseUrl + '/editarUnidade/'+data.idUnit, data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere dados para a seleção da unidade que vai ser removida
      removerUnidade: function(data) {
      return  $http.delete(baseUrl + '/removerUnidade/'+data.idUnit).then(function (response) {
         return response.data;
            });
      },

      /// Grupo de Peça ///

      /// Retorna todos os grupos para preencher a tabela
      getGrupoPeca: function(data) {
      return  $http.get(baseUrl + '/getGrupoPeca/').then(function (response) {
         return response.data;
            });
      },
      /// Transfere os dados para cadastro de um grupo
      cadastroGrupoPeca: function(data) {
      return  $http.post(baseUrl + '/cadastrarGrupoPeca', data).then(function (response) {
         return response.data;
            });
      },
      /// Retorna o grupo que vai preencher a subtela de edição
      getGrupoP: function(data) {
      return  $http.get(baseUrl + '/getGrupoP/'+data.idgrupPeca).then(function (response) {
         return response.data;
            });
      },
      /// Transfere os dados para a edição de um grupo
      editarGrupoPeca: function(data) {
      return  $http.put(baseUrl + '/editarGrupoPeca/'+data.idgrupPeca,data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere dados para a seleção do grupo que vai ser removido
      removerGrupoPeca: function(data) {
      return  $http.delete(baseUrl + '/removerGrupoPeca/'+data.idgrupPeca).then(function (response) {
         return response.data;
            });
      },



      /// Usuário ///

      getUsuario: function(data) {
      return  $http.get(baseUrl + '/usuario/'+data).then(function (response) {
         return response.data;
            });
      },
      // Transfere os dados do usuário a ser usado no menu principal
      getUser: function(data) {
      return  $http.get(baseUrl + '/getUser/'+data.id,data).then(function (response) {
         return response.data;
            });
      },
      /// Retorna todos os usuarios para preencher a tabela
      getAllUsers: function() {
        return  $http.get(baseUrl + '/users').then(function (response) {
            // console.log(response.data);
            return response.data;
        });
      },
      /// Transfere os dados para cadastro de um usuario
      cadastroUsuario: function(data, success, error) {
         return  $http.post(baseUrl + '/cadastrarUsuario', data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere os dados para a edição de um usuario
      editarUsuario: function(data) {
      return  $http.put(baseUrl + '/editarUsuario/'+data.idUsuario,data).then(function (response) {
         return response.data;
            });
      },
      /// Retorna o usuario que vai preencher a subtela de edição
      getUsuario: function(data) {
      return  $http.get(baseUrl + '/getUsuario/'+data.idUsuario).then(function (response) {
         return response.data;
            });
      },
      /// Transfere dados para a seleção do usuario que vai ser removido
      removerUsuario: function(data) {
      return  $http.delete(baseUrl + '/removerUsuario/'+data.idUsuario).then(function (response) {
         return response.data;
            });
      },
      loginUsuario: function(data) {
        return $http.post(baseUrl + '/usuario/auth', data).then(function (response) {
          return response.data;
        });
      },



      //////// CONTATO - INÍCIO

      /// Retorna todos os contatos para preencher a tabela
      getContatos: function(data) {
      return  $http.get(baseUrl + '/getContatos/'+data).then(function (response) {
         return response.data;
            });
      },

      /// Retorna o status que vai preencher a subtela de edição
      getContato: function(data) {
       return  $http.get(baseUrl + '/getContato/'+data.idContClient).then(function (response) {
         return response.data;
            });
      },

      /// Retorna o nome cliente que vai preencher a tela de contato
      getContatoName: function(data) {
       return  $http.get(baseUrl + '/getContatoName/'+data).then(function (response) {
         return response.data;
            });
      },

      /// Transfere os dados para cadastro de um contato
      cadastroContato: function(data, success, error) {
      return  $http.post(baseUrl + '/cadastroContato/'+data.id, data).then(function (response) {
           return response.data;
              });
      },

      /// Transfere os dados para a edição de um contato
      editarContato: function(data) {
      return  $http.put(baseUrl + '/editarContato/'+data.idContClient,data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere dados para a seleção do contato que vai ser removido
      removerContato: function(data) {
      return  $http.delete(baseUrl + '/removerContato/'+data.idContClient).then(function (response) {
         return response.data;
            });
      },

      /////// CONTATO - FIM




   //////// CATEGORIA - INICIO
      /// Retorna todos os clientes para preencher a tabela
      getCategorias: function(data) {
      return  $http.get(baseUrl + '/categoria/').then(function (response) {
         return response.data;
            });
      },
      /// Retorna o cliente que vai preencher a subtela de edição
      getCategoria: function(data) {
       return  $http.get(baseUrl + '/categoria/'+data.id).then(function (response) {
         return response.data;
            });
      },
      // Tranfere os dados para cadastro de cliente físico
      cadastroCategoria: function(data) {
      return  $http.post(baseUrl + '/categoria', data).then(function (response) {
         return response.data;
            });
      },

      /// Transfere os dados para a edição de um cliente
      editarCategoria: function(data) {
      return  $http.put(baseUrl + '/categoria/'+data.id,data).then(function (response) {
         return response.data;
            });
      },
      /// Transfere dados para a seleção do cliente que vai ser removido
      removerCategoria: function(data) {
      return  $http.delete(baseUrl + '/categoria/'+data.id).then(function (response) {
         return response.data;
            });
      },


 //////// CATEGORIA - FIM

 //////// TRANSPORTADORA - INICIO
    /// Retorna todos os clientes para preencher a tabela
    getTransportadoras: function(data) {
    return  $http.get(baseUrl + '/transportadora/').then(function (response) {
       return response.data;
          });
    },
    /// Retorna o cliente que vai preencher a subtela de edição
    getTransportadora: function(data) {
     return  $http.get(baseUrl + '/transportadora/'+data.id).then(function (response) {
       return response.data;
          });
    },
    // Tranfere os dados para cadastro de cliente físico
    cadastroTransportadora: function(data) {
    return  $http.post(baseUrl + '/transportadora', data).then(function (response) {
       return response.data;
          });
    },

    /// Transfere os dados para a edição de um cliente
    editarTransportadora: function(data) {
    return  $http.put(baseUrl + '/transportadora/'+data.id,data).then(function (response) {
       return response.data;
          });
    },
    /// Transfere dados para a seleção do cliente que vai ser removido
    removerTransportadora: function(data) {
    return  $http.delete(baseUrl + '/transportadora/'+data.id).then(function (response) {
       return response.data;
          });
    },


//////// TRANSPORTADORA - FIM

//////// PRODUTOS - INICIO
   /// Retorna todos os clientes para preencher a tabela
   getProdutos: function(data) {
   return  $http.get(baseUrl + '/produto/').then(function (response) {
      return response.data;
         });
   },
   /// Retorna o cliente que vai preencher a subtela de edição
   getProduto: function(data) {
    return  $http.get(baseUrl + '/produto/'+data.id).then(function (response) {
      return response.data;
         });
   },
   // Tranfere os dados para cadastro de cliente físico
   cadastroProduto: function(data) {
   return  $http.post(baseUrl + '/produto', data).then(function (response) {
      return response.data;
         });
   },

   /// Transfere os dados para a edição de um cliente
   editarProduto: function(data) {
   return  $http.put(baseUrl + '/produto/'+data.id,data).then(function (response) {
      return response.data;
         });
   },
   /// Transfere dados para a seleção do cliente que vai ser removido
   removerProduto: function(data) {
   return  $http.delete(baseUrl + '/produto/'+data.id).then(function (response) {
      return response.data;
         });
   },


//////// PRODUTO - FIM


//////// FORNECEDOR - INICIO

   /// Retorna todos os clientes para preencher a tabela
   getFornecedores: function(data) {
   return  $http.get(baseUrl + '/fornecedor/').then(function (response) {
      return response.data;
         });
   },
   /// Retorna o cliente que vai preencher a subtela de edição
   getFornecedor: function(data) {
    return  $http.get(baseUrl + '/fornecedor/'+data.id).then(function (response) {
      return response.data;
         });
   },
   // Tranfere os dados para cadastro de cliente físico
   cadastroFornecedor: function(data) {
   return  $http.post(baseUrl + '/fornecedor', data).then(function (response) {
      return response.data;
         });
   },

   /// Transfere os dados para a edição de um cliente
   editarFornecedor: function(data) {
   return  $http.put(baseUrl + '/fornecedor/'+data.id,data).then(function (response) {
      return response.data;
         });
   },
   /// Transfere dados para a seleção do cliente que vai ser removido
   removerFornecedor: function(data) {
   return  $http.delete(baseUrl + '/fornecedor/'+data.id).then(function (response) {
      return response.data;
         });
   },


//////// FORNECEDOR - FIM

//////// PLANEJAMENTO - INICIO

/// Transfere os dados para cadastro de um usuario
cadastroPlanejamento: function(data, success, error) {
   return  $http.post(baseUrl + '/planejamento', data).then(function (response) {
   return response.data;
      });
},

//////// PLANEJAMENTO - FIM


      ////////////////////////////////////////////////

      pushData: function(data) {
        dataPushed.length = 0;
        dataPushed.push(data);
        console.log(dataPushed);
      },
      getData: function(data) {
        return dataPushed ;
      },
      logout: function() {
        window.localStorage.clear();
        window.location = "#/";
      }

    };

  }])
