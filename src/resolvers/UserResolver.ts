import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType } from 'type-graphql';
import { User } from '../entity/Usuario';
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

@Resolver()
export class UserResolver {

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
