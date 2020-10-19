# ApiRecetas

## Information
This project is a CRUD where the user registers, and upon logging in, they will have access to create and consult both their recipes and their categories.
Used technology:

    • NodeJs
    • Graphql
    • TypeOrm
    • Apollo
    • Typescript
    • JWT
    • MySql

---
## Installation

1. Clone the repository 
   https://github.com/racso-san/ApiRecetas.git

2. Open the project with a code editor

3. Go to src -> config -> `typeorm.ts` -> Configure the database to use

4. Run in console `npm run dev` 


## Testing the queries

1. Enter to http://localhost:3000/graphql.

2. You have various queries and mutations to use

    Queries: getRecipes, getOneRecipe, getCategories, getOneCategory, getMyRecipes

    Mutations: createRecipe, createCategory, updateRecipe, updateCategory, deleteRecipe, deleteCategory, signUp, login

3. You can consult the `test.txt` file to make the queries and know the parameters to use


## Login

1. To be able to consult, edit, delete your recipes and category, you must first create a user (`signUp`) and then login (`logIn`).

2. When you log in, the API will give you a token, which will last 12 hours (if you exceed the time you will have to log in and get another token again). Copy the token

3. In the HTTP header of graphql:
{
   "authorization": "Bearer token"
}

4. By having the token you can now carry out CRUD operations

## Code challenge - Oscar Lopez

