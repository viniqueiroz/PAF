CREATE SCHEMA ibpc;

USE ibpc;




create table privilegio(
    idPrivilegio int auto_increment,
    nomePrivilegio varchar(100) not null,
    constraint idPrivilegio primary key (idPrivilegio)

);

create table statusUsuario(
    idStatus int auto_increment,
    nomeStatus varchar(100) not null,
    constraint idPrivilegio primary key (idStatus)

);


create table clienteJuridico(
    idClienteJ int auto_increment,
    cnpj varchar(255) not null,
    razaoSocial varchar(255) not null,
    nomeFantasia varchar(255) not null,
    inscMunicipal varchar(255) not null,
    inscEstadual varchar(255) not null,
    cep varchar(100) not null,
    logradouro varchar(255) not null,
    complemento varchar(255),
    bairro varchar(255) not null,
    cidade varchar(255) not null,
    estado varchar(255) not null,
    telefoneGeral varchar(255) not null,
    constraint idClienteJ primary key (idClienteJ),
    constraint cnpj unique (cnpj)
);

create table clienteFisico(
    idClienteF int auto_increment,
    cpf varchar(255) not null,
    nomeCompleto varchar(255) not null,
    cep varchar(255) not null,
    logradouro varchar(255) not null,
    complemento varchar(255) not null,
    bairro varchar(255) not null,
    cidade varchar(255) not null,
    estado varchar(255) not null,
    telefoneGeral varchar(255) not null,
    constraint idClienteF primary key (idClienteF),
    constraint cpf unique (cpf)
);



-- Sempre que cadastrar um cliente físico ou jurídico, é necessário preencher a tabela clientes com a informação complementar. Dessa forma todas as outras tabelas se relacionam com a tabela clientes.
create table clientes(
    idClient int auto_increment,
    FKClientF int default null,
    FKClientJ int default null,
    constraint idClient primary key (idClient),
    constraint FKClientF foreign key (FKClientF) references clienteFisico(idClienteF),
    constraint FKClientJ foreign key (FKClientJ) references clienteJuridico(idClienteJ)

);



create table contatoClientes(
    idContClient int auto_increment,
    idCliente int not null,
    nome varchar(255) not null,
    funcao varchar(255) default null,
    telefone varchar(255) default null,
    celular varchar(255) default null,
    email varchar(255) default null,
    setor varchar(255) default null,
    constraint idContClient primary key (idContClient),
    constraint idCliente foreign key (idCliente) references clientes(idClient)
);

create table usuario(
    idUsuario int auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(255) not null,
    idStatus int not null default 0,
    idPrivilegio int not null default 0,
    constraint uc_usuario unique (email),
    constraint idUsuario primary key (idUsuario),
    constraint idStatus foreign key (idStatus) references statusUsuario(idStatus),
    constraint idPrivilegio foreign key (idPrivilegio) references privilegio(idPrivilegio)

);

create table unidadeMed(
  	idUnit int auto_increment,
  	sigla varchar(100) not null,
  	descricao varchar(255) not null,
  	constraint ucSigla unique (sigla),
  	constraint idUnit primary key (idUnit)
);

create table obra(
    idObra int auto_increment,
    dataCadastro varchar(100) not null,
    idCliente int not null,
    nomeObra varchar(255) not null,
    proprietario varchar(255) not null,
    responsavel varchar(255) not null,
    art varchar(255) not null,
    cep varchar(255) not null,
    logradouro varchar(255) not null,
    bairro varchar(255) not null,
    cidade varchar(255) not null,
    estado varchar(255) not null,
    telResponsavel varchar(255) not null,
    statusObra int default 0,
    constraint idObra primary key (idObra),
    constraint idClienteO foreign key (idCliente) references clientes(idClient)

);

-- Informação se a obra está concluída ou não. A conclusão é automática a partir da conclusão de todos os trechos da obra.


create table material(
    idMaterial int auto_increment,
    nomeMaterial varchar(255) not null,
    constraint idMaterial primary key (idMaterial),
  	constraint nomeMaterial unique (nomeMaterial)
);


create table escopo(
    idEscopo int auto_increment,
    nomeEscopo varchar(255) not null,
    constraint idEscopo primary key (idEscopo),
  	constraint nomeEscopo unique (nomeEscopo)
);


create table trecho(
    idTrecho int auto_increment,
    idObra int not null,
    nomeTrecho varchar(255) not null,
    categoria varchar(100) not null,
    idEscopo int not null,
    idMaterial int not null,
    prazoConclusao varchar(100) not null,
    constraint idTrech primary key (idTrecho),
    constraint idMat foreign key (idMaterial) references material(idMaterial),
    constraint idObrat foreign key (idObra) references obra(idObra),
    constraint idEscop foreign key (idEscopo) references escopo(idEscopo)
);


create table grupoPeca(
    idgrupPeca int auto_increment,
    grupo varchar(100) not null,
    constraint idgrupPeca primary key (idgrupPeca),
    constraint grupo unique (grupo)
);

create table peca(
  	idPeca int auto_increment,
  	nomePeca varchar(255) not null,
  	constraint ucNomePeca unique (nomePeca),
  	constraint idPeca primary key (idPeca)
);


create table equipamento(
  	idEquip int auto_increment,
  	nomeEquip varchar(255) not null,
  	constraint ucNomeEquip unique (nomeEquip),
  	constraint idEquip primary key (idEquip)
);




create table embutido(
    idEmbutido int auto_increment,
    desEmbutido	varchar(255) not null,
    qtdEmbutido float not null,
  	constraint idEmbutido primary key (idEmbutido)
);


create table setor(
  	idSetor int auto_increment,
  	nomeSetor varchar(255) not null,
  	constraint ucnomeSetor unique (nomeSetor),
  	constraint idSetor primary key (idSetor)
);


create table centralProd(
  	idCentralProd int auto_increment,
  	nomeCentralProd varchar(255) not null,
  	constraint ucnomeCentralProd unique (nomeCentralProd),
  	constraint idCentralProd primary key (idCentralProd)
);



create table statusForma(
    idStatusF int auto_increment,
    nomeStatusF varchar(100) not null,
    constraint idPrivilegio primary key (idStatusF)

);

create table tipoForma(
	idTipoForma int auto_increment,
	tipoForma varchar(255) not null,
    constraint idTipoForma primary key (idTipoForma),
    constraint tipoForma unique (tipoForma)
);



create table formas(
    idFormas int auto_increment,
    descricao varchar(255) not null,
    comprimento float not null,
    largura float not null,
    idTipoForma int not null,
    idStatusF int not null,
    totalPecas int not null,
    dataInicio varchar(100) not null,
    intervaloDias int not null,
    concretagem int not null,
  	constraint idFormas primary key (idFormas),
    constraint idTipoFormas foreign key (idTipoForma) references tipoForma(idTipoForma),
	constraint idStatusF foreign key (idStatusF) references statusForma(idStatusF)

);

create table statusProjeto(
  	idStatsProj int auto_increment,
  	nomeStatsProj varchar(255) not null,
  	constraint ucnomeStatsProj unique (nomeStatsProj),
  	constraint idStatsProj primary key (idStatsProj)
);


create table projetoPeca(
	  idProjPeca int auto_increment,
    idTrecho int not null,
    idPeca int not null,
    nomeProjeto varchar(255) not null,
    constraint idProjPeca primary key (idProjPeca),
    constraint idTrecho foreign key (idTrecho) references trecho(idTrecho),
    constraint idPeca foreign key (idPeca) references peca(idPeca)
);




-- Armação, fôrma, fôrma e armação, insert e montagem
create table tipoProjeto(
	  idTipoProj int auto_increment,
	  tipoProj varchar(255) not null,
    constraint idTipoProj primary key (idTipoProj),
    constraint tipoProj unique (tipoProj)
);

-- Categoria projeto (Interno ou externo)
create table cateProjeto(
    idCatProj int auto_increment,
    categoria varchar(100) not null,
    constraint idCatProj primary key (idCatProj),
    constraint categoria unique (categoria)
);

create table plantaProjeto(
    idPlantaProj int auto_increment,
    nomePlanta varchar(100) not null,
    constraint idPlantaProj primary key (idPlantaProj),
    constraint nomePlanta unique (nomePlanta)
);



create table projeto(
  idProjeto int auto_increment,
  idTrecho int not null,
  idCatProj int not null,
  idPlantaProj int,
  descricao varchar(255) not null,
  idTipoProj int not null,
  projetista varchar(255) not null,
  constraint idProjeto primary key (idProjeto),
  constraint idTrechop foreign key (idTrecho) references trecho(idTrecho),
  constraint idCatProj foreign key (idCatProj) references cateProjeto(idCatProj),
  constraint idTipoProj foreign key (idTipoProj) references tipoProjeto(idTipoProj),
  constraint idPlantaProj foreign key (idPlantaProj) references plantaProjeto(idPlantaProj)

);

create table revisao(
    idRevisao int auto_increment,
    idProjeto int not null,
    dataRevisao varchar(100) not null,
    dataRecebimento varchar(100) not null,
    constraint idRevisao primary key (idRevisao),
    constraint idProjeto foreign key (idProjeto) references projeto(idProjeto)
);



insert into `ibpc`.`material` (`nomeMaterial`) values ('Aço'),('Embutidos Metálicos');
insert into `ibpc`.`escopo` (`nomeEscopo`) values ('Projeto'),('Fabricação'),('Transporte'),('Montagem');


insert into `ibpc`.`unidadeMed` (`sigla`, `descricao`) values ('M', 'Metro'),
('l','Litro'),
('UND', 'Unidade'),
('TN', 'Tonelada'),
('KG', 'Kilograma'),
('M³', 'Metro Cubico'),
('Nm', 'Nanômetro');


insert into `ibpc`.`statusUsuario` (`idStatus`, `nomeStatus`) values ('1', 'Ativo');


insert into `ibpc`.`privilegio` (`nomePrivilegio`) values
('Administrador'),
('Funcionário');

insert into `ibpc`.`usuario` (`idUsuario`, `nome`, `email`, `senha`, `idStatus`, `idPrivilegio`) VALUES ('1', 'teste', 'teste@teste.com', '2e6f9b0d5885b6010f9167787445617f553a735f', '1', '1');

INSERT INTO `ibpc`.`cateProjeto` (`idCatProj`, `categoria`) VALUES ('1', 'Interno');
INSERT INTO `ibpc`.`cateProjeto` (`idCatProj`, `categoria`) VALUES ('2', 'Externo');

INSERT INTO `ibpc`.`tipoProjeto` (`tipoProj`) VALUES ('Armação');
INSERT INTO `ibpc`.`tipoProjeto` (`tipoProj`) VALUES ('Fôrma');
INSERT INTO `ibpc`.`tipoProjeto` (`tipoProj`) VALUES ('Fôrma e Armação');
INSERT INTO `ibpc`.`tipoProjeto` (`tipoProj`) VALUES ('Insert');
INSERT INTO `ibpc`.`tipoProjeto` (`tipoProj`) VALUES ('Montagem');
