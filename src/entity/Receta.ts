import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Category } from './Categoria';

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
    @Column({ nullable: true })
    category: number; */

    @ManyToOne(type => Category , category => category.recipe)
   // @JoinColumn()
    @Field(() => Category , {nullable:true})
    category!: Category; 

}