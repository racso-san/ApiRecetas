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

---
## Installation

1. Clonar el repositorio 
   https://github.com/racso-san/ApiRecetas.git

2. Abrir el proyecto con un editor de codigo

3. Ir a src -> config -> `typeorm.ts` -> Configure la base de datos que utilizara

4. Ejecutar en consola `npm run dev`


## Testing the queries

1. Enter to http://localhost:3000/graphql.

2. You have various queries and mutations to use:

Queries: 
getRecipes.  
getOneRecipe. 
getCategories. 
getOneCategory. 
getMyRecipes.

Mutations:
createRecipe.  
createCategory. 
updateRecipe.  
updateCategory.
deleteRecipe.  
deleteCategory.
signUp.
login.


