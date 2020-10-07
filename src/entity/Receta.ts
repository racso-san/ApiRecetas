import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id!: number; // Generar autom el id

    @Column()
    name!: String;

    @Column()
    description!: String;

    @Column()
    Ingredients!: String;
    /* 
    @Column()
    category!: number; */
}