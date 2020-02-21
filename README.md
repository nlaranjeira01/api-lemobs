# Desafio Lemobs - API de Alunos
## Instalação
* Primeiro instale o docker:  
  * Mac/Windows: Docker Desktop \(instruções em [https://docs.docker.com/install/](https://docs.docker.com/install/)\).  
  * Ubuntu:  
    * docker: [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04).  
    * docker-compose:  
    Baixe o docker-compose (versão 1.25.4 para suportar o docker-compose.yml versão 3.7):
    ```bash 
    $ sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    ```  
    Permita a execução do docker-compose:
    ```bash
    $ sudo chmod +x /usr/local/bin/docker-compose
    ```
* Baixe este repositório, extraia e entre na pasta extraída.
* Depois utilize o docker-compose para iniciar os contêineres \(no ubuntu pode ser necessário utilizar esse comando com sudo\):
```bash
$ docker-compose up
```

## Acessando a API

A api está configurada para ser acessada na porta 4000, e a documentação do swagger está configurada no caminho /api, portanto, para acessar a documentação da api, dirija-se ao URL [localhost:4000/api](http://localhost:4000/api).

## Informações Adicionais

### PgAdmin
Para visualizar os dados do banco, incluí um container do pgadmin no docker-compose. Está acessível em [localhost:52278/](http://localhost:52278/).  

### Informações do banco:  
* usuário: postgres
* senha: postgres
* host: pg \(se for iniciado pelo docker-compose\)
* porta: 5432

### Informações do PgAdmin
* usuário pgadmin: pgadmin@email.com
* senha pgadmin: pgadminpw

### Script SQL
O script de criação do banco pode ser localizado em 'db_dump/ddl.sql'. Este script é executado automaticamente com o docker-compose.


## Features
### Alunos
:heavy_check_mark: POST /aluno &rarr; cria um aluno com 0 ou mais endereços.  
:heavy_check_mark: GET /aluno &rarr; retorna todos os alunos com todas as informações.  
:heavy_check_mark: GET /aluno/{aluno_id} &rarr; retorna o aluno identificado pelo aluno_id.  
:heavy_check_mark: GET /aluno/{aluno_id}/endereco &rarr; retorna os endereços de um aluno identificado pelo aluno_id \(pode ser filtrado por bairro\).  
:heavy_check_mark: GET /aluno/media &rarr; retorna todos os alunos cujas notas são maiores que a média de notas de todos os alunos.  
:heavy_check_mark: GET /aluno/nota/{criterio}/{nota} &rarr; retorna todos os alunos com nota maior ou menor \(dependendo do critério\) que a nota especificada.  
:heavy_check_mark: PUT /aluno/{aluno_id} &rarr; atualiza TODAS as informações de um aluno identificado pelo aluno_id.  
:heavy_check_mark: DELETE /aluno/{aluno_id} &rarr; deleta o aluno identificado pelo aluno_id.  

### Endereços
:heavy_check_mark: POST /endereco &rarr; cria um endereco para um aluno.  
:heavy_check_mark: GET /endereco &rarr; retorna todos os endereco com todas as informações \(pode ser filtrado por bairro\).  
:heavy_check_mark: DELETE /endereco/{endereco_id} &rarr; retorna o endereco identificado pelo endereco_id.

### Validação
:heavy_check_mark: todos os parâmetros têm alguma validação.  
:heavy_check_mark: validação customizada para CPFs.  
:heavy_check_mark: validação customizada para datas no formato dd/mm/yyyy.  

### Informações adicionais
:heavy_check_mark: CPF sem traços e pontos no banco, mas formatado na response.  
