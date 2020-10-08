import {Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

    @Field() // Indicar que tambien es un campo de graphql
    @PrimaryGeneratedColumn()
    id!: number; // Generar autom el id

    @Field()
    @Column()
    name!: String;

    @Field()
    @Column()
    description!: String;

    @Field()
    @Column()
    ingredients!: String;
    /*
    @Field() 
    @Column()
    category!: number; */
}