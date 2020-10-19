# ApiRecetas

## Information
El precente proyecto es un CRUD donde el usuario se registra, y al logiarse , tendra el acceso a crear y consultar tanto sus recetas como sus categorias.
Tecnologias utilizadas:

    • NodeJs
    • Graphql
    • TypeOrm
    • Apollo
    • Typescript
    • JWT
    • MySql


## Installation

1. Clonar el repositorio 
   https://github.com/racso-san/ApiRecetas.git

2. Abrir el proyecto con un editor de codigo

3. Configure la base de datos que utilizara

await createConnection({
      type:"mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "nombre-database",
      entities: [
        path.join(__dirname, '../entity/**/**.ts')
      ],
      synchronize: true
    });


