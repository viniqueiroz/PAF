var bookshelf = require('../bookshelf');
var status = require('./status');
var categoria = require('./categoria');
var fornecedor = require('./fornecedor');
var produto = require('./produto');
var transportadora = require('./transportadora');
var movimentacao = require('./movimentacao');
var unidadeMedida = require('./unidadeMedida');
var area = require('./area');

var Planejamento = bookshelf.Model.extend({
  tableName: 'planejamento',
  status: function(){
    return this.belongsTo(status,'idStatus');
  },
  categoria: function(){
    return this.belongsTo(categoria,'idCategoria');
  },
  fornecedor: function(){
    return this.belongsTo(fornecedor,'idFornecedor');
  },
  produto: function(){
    return this.belongsTo(produto,'idProduto');
  },
  transportadora: function(){
    return this.belongsTo(transportadora,'idTransportadora');
  }
});

module.exports = Planejamento;
