import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, JoinColumn, JoinTable } from "typeorm";
import { Field, ObjectType } from 'type-graphql';
import {Recipe} from "./Receta";


@ObjectType()
@Entity()
export class Category extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number; 

    @Field()
    @Column()
    name!: String;

    @OneToMany(type => Recipe, recipe => recipe.category, {eager:true})
    recipe!: Recipe[]; 
}