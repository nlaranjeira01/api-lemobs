SELECT 'CREATE DATABASE db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db')\gexec

\c db

CREATE TABLE IF NOT EXISTS aluno (
    id SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf CHAR(14) NOT NULL,
    nota FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS endereco (
    id SERIAL NOT NULL PRIMARY KEY,
    rua VARCHAR (255) NOT NULL,
    numero VARCHAR (10),
    complemento VARCHAR (50),
    bairro VARCHAR(255) NOT NULL,
    id_aluno INTEGER NOT NULL REFERENCES aluno(id)
);