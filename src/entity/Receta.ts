import {Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number; // Generar autom el id

    @Column()
    name!: String;

    @Column()
    description!: String;

    @Column()
    ingredients!: String;
    /* 
    @Column()
    category!: number; */
}