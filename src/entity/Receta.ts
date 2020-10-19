import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne} from "typeorm";
import { Field, ObjectType } from 'type-graphql';
import { Category } from './Categoria';
import {User} from './Usuario';

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

  
    
    @ManyToOne(() => Category, category => category.recipe)
    category!: Category;

    @ManyToOne(() => User, user => user.recipe)
    user!: User;

}