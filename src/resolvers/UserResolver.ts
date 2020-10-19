import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Ctx } from 'type-graphql';
import { User } from '../entity/Usuario';
import { Recipe } from '../entity/Receta';
import { Category } from '../entity/Categoria';

import fs from 'fs';
import path from 'path';
const jwt = require('jsonwebtoken');
import { Context } from 'koa';
const bcrypt = require('bcrypt');

@InputType() // Se pasa como argumento desde graphql
class UserInput {
    @Field()
    name!: String;

    @Field()
    email!: String;

    @Field()
    password!: String;
}
@InputType()
class LoginInput {

    @Field()
    email!: String;

    @Field()
    password!: String;
}

@ObjectType()
class TokenOutput {
    @Field()
    token!: String
}
@ObjectType()
class SignUpOutput {
    @Field()
    id!: Number;

    @Field()
    name!: String;

    @Field()
    email!: String;
}

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

    @Mutation(() => SignUpOutput!, { nullable: true })
    async signUp(
        @Arg("variables", () => UserInput) variables: UserInput,
        @Ctx() ctx: Context
    ) {
        if (ctx.name) {

            try {
                if (variables.password && variables.password) {
                    const newUser = User.create(variables);
                    return await newUser.save();
                }
                return null;
            } catch (err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }

    }

    @Mutation(() => TokenOutput!, { nullable: true })
    async logIn(
        @Arg("variables", () => LoginInput) variables: LoginInput,
        @Ctx() ctx: Context) {
        {

            try {

                const user = await User.findOne({ email: variables.email });
                if (!user) return null
                const match = await bcrypt.compare(variables.password, user.password);
                if (!match) return null;
                var privateKey = fs.readFileSync(path.normalize(__dirname + '/../config/private.key'), { encoding: 'utf8' });

                var token = jwt.sign({ data: { id: user.id, name: user.name, email: user.email } }, privateKey, { expiresIn: '12h' });
                return { token: token };

            } catch (err) {
                console.log(err);
                return null;
            }

        }

    }
}

