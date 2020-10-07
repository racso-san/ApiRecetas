import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import {Recipe} from "../entity/Receta";

@Resolver()
export class RecipeResolver {


    @Mutation(() => Boolean)
    async createRecipe(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("ingredients") ingredients: string
    ) {
        await Recipe.insert({name,description,ingredients})
        return true
    }

}
