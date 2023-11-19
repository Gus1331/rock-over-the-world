CREATE DATABASE ROTW;
USE ROTW;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkApelido VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(60),
    sexo CHAR(1),
    dtNasc DATE,
    email VARCHAR(256) UNIQUE,
    senha VARCHAR(30),
    fkRegiao INT,
    dtConta DATETIME)AUTO_INCREMENT = 10000;
    
CREATE TABLE apelido (
	idApelido INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(20) UNIQUE NOT NULL) AUTO_INCREMENT = 20000;
    
CREATE TABLE regiao (
	idRegiao INT PRIMARY KEY AUTO_INCREMENT,
    pais VARCHAR(45),
    estado VARCHAR (45)) AUTO_INCREMENT = 100;
    
ALTER TABLE usuario ADD CONSTRAINT fkRegiaoUsuario FOREIGN KEY (fkRegiao)
	REFERENCES regiao(idRegiao);
    
INSERT INTO regiao(pais, estado) VALUES
	('Brasil', 'São Paulo'),
	('Brasil', 'Rio de Janeiro'),
    ('Brasil', 'Bahia'),
    ('Brasil', 'Minas Gerais'),
    ('Canada', 'Ottwa'),
    ('United States', 'New York'),
    ('France', 'Paris');
    
INSERT INTO apelido (apelido) VALUE 
	('Shineee');

INSERT INTO usuario(nome, sexo, apelido, dtNasc, email, senha, fkRegiao) VALUE 
	('Gus Souza', 'm', '10-02-2003', 'gustavooliver.souza@gmail.com', 'onepieceisreal', 100);
    
SELECT * FROM regiao;
SELECT * FROM USUARIO;
DESCRIBE usuario;
-- DROP DATABASE ROTW;