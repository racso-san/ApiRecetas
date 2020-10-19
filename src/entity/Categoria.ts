import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany} from "typeorm";
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

    @OneToMany(() => Recipe, recipe => recipe.category)
    recipe!: Recipe[];
}