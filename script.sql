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
    idApiSpotify (????));
    
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


SELECT musica , album, banda, artista, solo, vocal, subGen, instrumento FROM usuario JOIN favoritos ON fkUsuario = idUsuario WHERE idUsuario = 10001;
UPDATE favoritos SET musica = "Painkiller" WHERE idFav = 20001;