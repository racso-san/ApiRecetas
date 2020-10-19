import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Ctx } from 'type-graphql';
import { User } from '../entity/Usuario';
const bcrypt = require('bcrypt');
import { Recipe } from '../entity/Receta';
import { Category } from '../entity/Categoria';

import { Context } from 'koa';

@InputType() // Se pasa como argumento desde graphql
class UserInput {

    @Field()
    name!: String;

    @Field()
    email!: String;

    @Field()
    password!: String;
}
/*
@InputType() 
class UserUpdateInput {

    @Field(() => String, {nullable:true})
    name!: String;

    @Field(() => String, {nullable:true})
    email!: String;

    @Field(() => String, {nullable:true})
    password!: String;
}
*/

@ObjectType()
class MyRecipeOutput {
    @Field()
    name!: String
    @Field()
    description!: String
    @Field()
    ingredients!: String
    @Field()
    recipe!: Recipe
    @Field()
    category!: Category
}

@Resolver()
export class UserResolver {

    @Query(() => [MyRecipeOutput]!, { nullable: true })
    async getMyRecipes(
        //@Arg("id") id: number,
        @Ctx() ctx: Context
    ) {
        if (ctx.name) {
            try {
                let recipe = await Recipe.find({
                    relations: ['user', 'category'],
                    where: {
                        user: ctx.id
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

    @Mutation(() => User)
    async signUp(
        @Arg("variables", () => UserInput ) variables: UserInput
    ) {
        const newUser =  User.create(variables);
        return await newUser.save();
    }

    @Mutation(() => User)
    async logIn(
        @Arg("email") email:string) {
        try{    
            const user = await User.findOne(email);
           /* if(!user){ return console.error(); }
          
            if(!valid){ return console.error(); } */    
            return user;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    
}
