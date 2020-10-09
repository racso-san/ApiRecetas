import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Int } from 'type-graphql';
//import { IsEmail, IsNotEmpty } from 'class-validator';

import { Recipe } from '../entity/Receta';
import { In } from 'typeorm';


@InputType() // Se pasa como argumento desde graphql
class RecipeInput {

    @Field()
    name!: string

    @Field()
    description!:string

    @Field()
    ingredients!: string
}

@InputType() // Se pasa como argumento desde graphql
class RecipeUpdateInput {

    @Field(() => String, {nullable:true}) // Para no tener que modificar todos los campos
    name?: string;

    @Field(() => String, {nullable:true})
    description?:string

    @Field(() => String, {nullable:true})
    ingredients?: string
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

    @Mutation(() => Boolean)
    async deleteRecipe(@Arg("id", ()=> Int) id: number) {
        await Recipe.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", () => Int) id:number,
        @Arg("fields", () => RecipeUpdateInput) Fields: RecipeUpdateInput
    ) {
        await Recipe.update({id}, Fields);
        return true;
    }

}
