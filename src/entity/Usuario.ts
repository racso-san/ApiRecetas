import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,BeforeInsert, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import {Recipe} from "./Receta";
const bcrypt = require('bcrypt'); // Importar encriptacion de pass


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: String;

    @Field()
    @Column()
    email!: String;

    @Field()
    @Column()
    password!: String;

    @OneToMany(() => Recipe, recipe => recipe.category)
    recipe!: Recipe[];


    @BeforeInsert()
    async beforeInsert() {
      if(this.password === undefined)return; // Si no hay pass no encripta nada
      try{
        this.password = await bcrypt.hash(this.password, 10);
      } catch(err){
            console.log(err);
            throw err;
      }
    }
    
}