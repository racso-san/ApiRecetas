import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Int } from 'type-graphql';

import { Category } from '../entity/Categoria';
import { In } from 'typeorm';


@InputType() // Se pasa como argumento desde graphql
class CategoryInput {

    @Field()
    name!: string
}


@Resolver()
export class CategoryResolver {

    @Query(() => [Category])
    getCategories(){
        return Category.find()
    }

    @Query(() => Category)
    async getOneCategory(
        @Arg("id") id:number) {
        const category = await Category.findOne(id);
        return category;
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg("variables", () => CategoryInput ) variables: CategoryInput
    ) {
        const newCategory =  Category.create(variables);
        return await newCategory.save();
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id", ()=> Int) id: number) {
        await Category.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg("id", () => Int) id:number,
        @Arg("fields", () => CategoryInput) Fields: CategoryInput
    ) {
        await Category.update({id}, Fields);
        return true;
    }

}
