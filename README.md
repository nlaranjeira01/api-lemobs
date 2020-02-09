# Desafio Lemobs - API de Alunos
## Instalação
* Primeiro instale o docker \(instruções em [https://docs.docker.com/install/](https://docs.docker.com/install/)\) .
* Baixe este repositório, extraia e entre na pasta extraída.
* Depois utilize o docker-compose para iniciar os contêineres:
```bash
$ docker-compose up
```

## Acessando a API

A api está configurada para ser acessada na porta 4000, e a documentação do swagger está configurada no caminho /api, portanto, para acessar a documentação da api, dirija-se ao URL [localhost:4000/api](http://localhost:4000/api).


### Script SQL
O script de criação do banco pode ser localizado em 'db_dump/ddl.sql'. Este script é executado automaticamente com o docker-compose.