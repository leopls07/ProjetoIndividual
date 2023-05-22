DROP DATABASE IF EXISTS gowlegacy;
CREATE DATABASE IF NOT EXISTS gowlegacy;

USE gowlegacy;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    username  VARCHAR(50),
    email VARCHAR(100),
    senha VARCHAR(50)
    );

CREATE TABLE quiz (
    idQuiz int primary key,
    nomeQuiz VARCHAR(45),
    qtdPerguntas INT 
);


CREATE TABLE jogo (
    idJogo int PRIMARY KEY AUTO_INCREMENT,
    nomeJogo VARCHAR(50),
    lancamento DATE,
    curiosidade VARCHAR(255),
    fkQuiz INT,
    foreign key (fkQuiz) references quiz (idQuiz)
);

CREATE TABLE plataforma(
    idPlataforma int PRIMARY KEY AUTO_INCREMENT,
    plataforma  VARCHAR(50)
);

CREATE TABLE plataformaJogo(
    fkJogo int,
    fkPlataforma int,
    foreign key (fkJogo) references jogo (idJogo),
    foreign key (fkPlataforma) references plataforma (idPlataforma),
    constraint pkComposta primary key (fkJogo,fkPlataforma)
);

CREATE TABLE tentativa(
    idTentativa int primary key AUTO_INCREMENT,
    fkQuiz int ,
    fkUsuario int,
    pontuacao int ,
    tempo int,
    foreign key (fkQuiz) references quiz (idQuiz),
    foreign key (fkUsuario) references usuario (idUsuario)
);


