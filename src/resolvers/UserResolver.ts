import { Resolver, Query, Mutation, Arg, ObjectType, Field, InputType, Int } from 'type-graphql';
import { User } from '../entity/Usuario';


@InputType() // Se pasa como argumento desde graphql
class UserInput {

    @Field()
    name!: String;

    @Field()
    email!: String;

    @Field()
    password!: String;
}


@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async signUp(
        @Arg("variables", () => UserInput ) variables: UserInput
    ) {
        const newUser =  User.create(variables);
        return await newUser.save();
    }

}
