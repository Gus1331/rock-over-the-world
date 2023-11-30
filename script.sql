CREATE DATABASE ROTW;
USE ROTW;

CREATE TABLE usuario ( -- 10 COLUNAS
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    apelido VARCHAR(20) UNIQUE,
    sexo CHAR(1),
	dtNasc DATE,
    fkRegiao INT,
    dtConta DATETIME DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(256) UNIQUE,
    senha VARCHAR(30),
    imgPerfil CHAR(13) DEFAULT "profile-img01"	
    )AUTO_INCREMENT = 10000;
    
CREATE TABLE regiao ( -- 2 COLUNAS
	idRegiao INT PRIMARY KEY AUTO_INCREMENT,
    pais VARCHAR(45),
    estado VARCHAR (45)) AUTO_INCREMENT = 100;
    
CREATE TABLE favoritos (
	idFav INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    musica VARCHAR(45),
    album VARCHAR(45),
    banda VARCHAR(45),
    artista VARCHAR(45),
    solo VARCHAR(45),
    vocal VARCHAR(45),
    subGen VARCHAR(45),
    instrumento VARCHAR(45)
    )AUTO_INCREMENT = 20000;
    
CREATE TABLE musica (
	idMusica INT PRIMARY KEY AUTO_INCREMENT,
    idApiSpotify VARCHAR(45))AUTO_INCREMENT = 1000000;
    
    
CREATE TABLE curtida (
	fkMusica INT,
    fkUsuario INT,
    PRIMARY KEY (fkMusica, fkUsuario),
		CONSTRAINT fkMusicaCurtida FOREIGN KEY (fkMusica)
			REFERENCES musica(idMusica),
		CONSTRAINT fkUsuarioCurtida FOREIGN KEY (fkUsuario)
			REFERENCES usuario(idUsuario));
    
    -- ----------------------------------------------------------------------------------------------------------- --
    
ALTER TABLE usuario ADD CONSTRAINT fkRegiaoUsuario FOREIGN KEY (fkRegiao)
	REFERENCES regiao(idRegiao); -- DE USUARIO PRA REGIAO
    
ALTER TABLE favoritos ADD CONSTRAINT fkUsuarioFavoritos FOREIGN KEY (fkUsuario)
	REFERENCES usuario(idUsuario); -- DE FAVORITOS PRA USUARIO
        -- ----------------------------------------------------------------------------------------------------------- --
    
INSERT INTO regiao(pais, estado) VALUES
	('Brasil', 'São Paulo'),
	('Brasil', 'Rio de Janeiro'),
    ('Brasil', 'Bahia'),
    ('Brasil', 'Minas Gerais'),
    ('Canada', 'Ottwa'),
    ('United States', 'New York'),
    ('France', 'Paris');


INSERT INTO usuario(nome, apelido, sexo, dtNasc, email, senha, fkRegiao) VALUE 
	('Gus Souza', 'Shineee', 'm', '2023-10-02', 'gustavooliver.souza@gmail.com', 'onepieceisreal', 100);
    
INSERT INTO favoritos(fkUsuario) VALUE (10000);
    
        -- ----------------------------------------------------------------------------------------------------------- --
        
SELECT * FROM usuario WHERE apelido = 'Shineee' AND senha = 'onepieceisreal';

SELECT * FROM usuario JOIN favoritos ON fkUsuario = idUsuario;
    
SELECT * FROM regiao;
SELECT * FROM USUARIO;
SELECT * FROM favoritos;
DESCRIBE usuario;
TRUNCATE table usuario;
-- DELETE FROM favoritos WHERE idFav = 20000;
-- DROP DATABASE ROTW;

UPDATE usuario SET imgPerfil = "profile-img01" WHERE apelido = "shineee";

INSERT INTO favoritos(fkUsuario) VALUE (10001);

SELECT DATE_FORMAT(dtConta, "%d/%m/%Y") AS dtConta FROM usuario;

UPDATE usuario SET  imgPerfil = "profile-img03" WHERE apelido = "KevinSampaio";

UPDATE favoritos SET idFav = 20004 WHERE fkUsuario = 10004;

ALTER TABLE usuario MODIFY COLUMN sexo VARCHAR(4);

INSERT INTO usuario(nome, apelido, sexo, dtNasc, email, senha, fkRegiao) VALUE 
    ('anonimous', 'ANONIMO', 'null', '2000-01-01', 'anonimous@anom.ano', '1234567*', 102);

SELECT musica , album, banda, artista, solo, vocal, subGen, instrumento FROM usuario JOIN favoritos ON fkUsuario = idUsuario WHERE idUsuario = 10001;	
UPDATE favoritos SET vocal = "5LyRtsQLhcXmy50VXhQXXS" WHERE idFav = 20001;


INSERT INTO musica VALUES
	(NULL, '7bhfCl1a1InaSy8NOWVswk'),
    (NULL, '03zRY58mcXQvvwu9Iyy4a4');
    
SELECT * FROM usuario;
SELECT * FROM musica;
    
INSERT INTO curtida(fkMusica, fkUsuario) VALUES
(1000000, 10000),
(1000000, 10001),
(1000000, 10002),
(1000000, 10005),
(1000000, 10004),
(1000001, 10000),
(1000001, 10001),
(1000001, 10002),
(1000001, 10004);

SELECT COUNT(*) as 'total de curtidas' FROM curtida;

-- select pra listar ranking
SELECT idApiSpotify as idMusica, COUNT(*) AS likes FROM curtida JOIN musica ON fkMusica = idMusica GROUP BY fkMusica;

SELECT idApiSpotify as idMusica FROM curtida JOIN musica ON fkMusica = idMusica WHERE fkUsuario = 10000;

INSERT INTO musica VALUES
	(NULL, '4IsQ9C6xrEiC3e1c1T0eim');

INSERT INTO curtida(fkMusica, fkUsuario) VALUES
	(1000002, 10005);
    
SELECT idApiSpotify AS idMusica FROM musica;