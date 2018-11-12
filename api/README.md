# API

Seção dedicada para os arquivos relacionados à API desenvolvida que atende o estudo de caso proposto.

## Documentação dos endpoints
Ao depurar a API (ver abaixo), acesse a rota [`/documentation`](http://localhost:8081/documentation) para ver a documentação dos endpoints feitos.

## Testes

Para rodar os testes, rode um dos seguintes comandos na pasta da API
```
nyc mocha *test.js
```

ou

```
npm test
```

## Depuração
Para depurar localmente a API, dentro da pasta da mesma, digite o seguinte comando:
```
    node .
```
Uma instância no localhost iniciará conforme descrito no terminal.

## Banco de dados
Existe um arquivo na raiz da api utilizado para popular o banco e poder realizar testes de maneira mais rápida.
```
    node seeds.js
```

## Modelagem

Utilizamos 5 coleções para guardar os documentos utilizados na API e representar as entidades:

### Users
Coleção que guarda os dados do usuário.
```
{
    "name": "Nome",
    "email": "Email",
    "photo": 'Path da foto utilizada',
    "password": "Senha",
    "createdAt": "Data em que o usuário foi criado",
    "area": "Área de especialização do usuário (ex.: arquitetura)",
    "phone": "Telefone",
    "cpf": "CPF",
    "gender": "Sexo do usuário",
    "birthDate": "Data de nascimento"

}
```

### Projects
Coleção que guarda os dados do projeto criado de um usuário.
```
{
    "name": "Título",
    "createdAt": "Data de criação",
    "description": "Espaço para descrever brevemente o projeto",
    "userId": "ID do usuário que é dono do projeto",
    "loading": "Porcentagem de quanto o projeto está completo",
    "likes": "Número de curtidas",
    "photo": "Path da foto"
}
```

### Posts
Coleção que guarda os posts feitos por um usuário em sua timeline ou na timeline de um projeto.
```
{
    "user": "Usuário que fez o post",
    "projectId": "ID do projeto relacionado ao post (caso tenha)",
    "createdAt": "Data de criação do post",
    "content": "Conteúdo do post",
    "likes": "Número de curtidas",
    "comments": [
          {
            "content": "Texto do comentário",
            "createdAt": "Data de criação do comentário"
            "user": {
                "_id": "ID do usuário que fez o comentário",
                "name": "Nome do usuário que fez o comentário",
                "photo": "Fot do usuário que fez o comentário"
            },
        }
    ]
}
```

### Followers
Coleção que guarda os seguidores (dentro de um array) de um usuário.
```
{
    "userId": "ID do usuário que possui os seguidores",
    followers: ["Array que contém", "os IDS dos seguidores", "do usuário acima"]
}
```

### Following
Coleção que guarda, em um array, os usuários que são seguidos por um outro usuário (userId)
```
{
    "userId": "ID do usuário que segue",
    followers: ["Array que contém", "os IDS dos usuários seguidos", "pelo usuário acima"]
}
```
