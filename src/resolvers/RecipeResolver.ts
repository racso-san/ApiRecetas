import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType } from 'type-graphql';
//import { IsEmail, IsNotEmpty } from 'class-validator';

import { Recipe } from '../entity/Receta';

@InputType() // Se pasa como argumento desde graphql
class RecipeInput {

    @Field()
    name!: string

    @Field()
    description!:string

    @Field()
    ingredients!: string
}

@Resolver()
export class RecipeResolver {

    @Query(() => [Recipe])
    getRecipes(){
        return Recipe.find()
    }

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg("variables", () => RecipeInput ) variables: RecipeInput
    ) {
        const newRecipe =  Recipe.create(variables);
        return await newRecipe.save();
    }

}
