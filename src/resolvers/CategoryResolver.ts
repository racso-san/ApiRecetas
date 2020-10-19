import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Int, Ctx } from 'type-graphql';

import { Category } from '../entity/Categoria';
//import { In } from 'typeorm';
import { Context } from 'koa';


@InputType() // Se pasa como argumento desde graphql
class CategoryInput {

    @Field()
    name!: string
}


@Resolver()
export class CategoryResolver {

    @Query(() => [Category]!, { nullable: true })
    getCategories(@Ctx() ctx: Context) {
        if (ctx.name) {
            try {
                return Category.find()
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }
    }

    @Query(() => Category!, { nullable: true })
    async getOneCategory(
        @Arg("id") id: number, @Ctx() ctx: Context) {
        if (ctx.name) {
            try {
                const category = await Category.findOne(id);
                return category;
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }
    }

    @Mutation(() => Category!, { nullable: true })
    async createCategory(
        @Arg("variables", () => CategoryInput) variables: CategoryInput,
        @Ctx() ctx: Context
    ) {
        if (ctx.name) {
            try {
                const newCategory = Category.create(variables);
                return await newCategory.save();
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id", () => Int) id: number, @Ctx() ctx: Context) {
        if (ctx.name) {
            try {
                await Category.delete(id);
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
    async updateCategory(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => CategoryInput) Fields: CategoryInput,
        @Ctx() ctx: Context
    ) {
        if (ctx.name) {
            try {
                await Category.update({ id }, Fields);
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
