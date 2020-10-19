import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Int, Ctx } from 'type-graphql';
import { Recipe } from '../entity/Receta';
import { Category } from '../entity/Categoria';
import { Context } from 'koa';


@InputType() // Se pasa como argumento desde graphql
class RecipeInput {

    @Field()
    name!: string

    @Field()
    description!: string

    @Field()
    ingredients!: string

    @Field()
    category!: string

}

@InputType() // Se pasa como argumento desde graphql
class RecipeUpdateInput {

    @Field(() => String, { nullable: true }) // Para no tener que modificar todos los campos
    name?: string;

    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => String, { nullable: true })
    ingredients?: string

    @Field(() => String, { nullable: true })
    category!: string
}

@ObjectType()
class RecipeOutput {
    @Field()
    id!: Number
    @Field()
    name!: String
    @Field()
    description!: String
    @Field()
    ingredients!: String
    @Field()
    category!: Category
}

@Resolver()
export class RecipeResolver {

    @Query(() => [RecipeOutput]!, { nullable: true })
    async getRecipes(@Ctx() ctx: Context) {
        if (ctx.name) {
            try {

                let recipe = await Recipe.find({
                    relations: ['category'],
                });
                return recipe;
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }
    }

    @Query(() => RecipeOutput!, { nullable: true })
    async getOneRecipe(
        @Arg("id") id: number, @Ctx() ctx: Context) {
        if (ctx.name) {
            try {
                let recipe = await Recipe.findOne({
                    relations: ['category'],
                    where: {
                        id: id
                    }
                });
                return recipe;
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }
    }

    @Mutation(() => RecipeOutput!, { nullable: true })
    async createRecipe(
        @Arg("variables", () => RecipeInput) variables: RecipeInput, @Ctx() ctx: Context
    ) { 
        if (ctx.name) {
            try {
                let category = await Category.findOne({ name: variables.category });
                if (!category) {
                    Category.name
                    const newCategory = Category.create({ name: variables.category });
                    category = await newCategory.save();

                }

                const newRecipe = Recipe.create({
                    name: variables.name,
                    description: variables.description,
                    ingredients: variables.ingredients,
                    category: category
                });
                return await newRecipe.save();
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }

    }

    @Mutation(() => Boolean)
    async deleteRecipe(@Arg("id", () => Int) id: number, @Ctx() ctx: Context) {
        if (ctx.name) {
            try {
                await Recipe.delete(id);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        } else {
            return false;
        }
    }

    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => RecipeUpdateInput) Fields: RecipeUpdateInput, @Ctx() ctx: Context
    ) {
        if (ctx.name) {
            try {
                let category = await Category.findOne({ name: Fields.category });
                if (!category) {
                    return false;

                }


                await Recipe.update({ id }, {
                    name: Fields.name,
                    description: Fields.description,
                    ingredients: Fields.ingredients,
                    category: category
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        } else {
            return false;
        }
    }

}
