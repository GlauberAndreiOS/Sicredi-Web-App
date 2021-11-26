DROP DATABASE IF EXISTS SICREDI_LOCACAO;
CREATE DATABASE IF NOT EXISTS SICREDI_LOCACAO;
USE SICREDI_LOCACAO;

DROP TABLE IF EXISTS categoria;
CREATE TABLE IF NOT EXISTS categoria(
	id int primary key auto_increment,
	nome varchar(45)
);

INSERT INTO categoria (nome) VALUES ("Carro"), ("Caminhão"), ("Moto"), ("Ônibus"), ("Van");

DROP TABLE IF EXISTS clientes;
CREATE TABLE IF NOT EXISTS clientes(
	id int primary key auto_increment,
    nome varchar(255),
    CPF numeric(11),
    CNH numeric(11),
    CEP numeric(8),
    rua varchar(255),
    numero numeric(10),
	cidade varchar(255),
    estado char(2),
    bairro varchar(255),
    complemento varchar(255),
    telefone varchar(255),
    cartaoCredito numeric(16),
    vencimentoCartao char(5)
);

DROP TABLE IF EXISTS veiculos;
CREATE TABLE IF NOT EXISTS veiculos(
	id int primary key auto_increment,
    placa char(9),
    renavam numeric(11),
    modelo varchar(255),
    fabricante varchar(255),
    ano char(9)
);

DROP TABLE IF EXISTS locacoes;
CREATE TABLE IF NOT EXISTS locacoes(
	id int primary key auto_increment,
    veiculos_idVeiculo int,
    clientes_idClient int,
    foreign key (clientes_idClient) references clientes(id),
    foreign key (veiculos_idVeiculo) references veiculos(id)
);

SELECT COUNT(id) as "Quantidades de Locações" FROM locacoes