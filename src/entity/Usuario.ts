import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,BeforeInsert } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
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
/*
const authenticate = async function( User ) {
  const user = await this.findOne( {email} ); // busca si hay un usuario con ese email
  if(!user) throw new Error('Email or password are wrong');

  const result = await bcrypt.compare(password, user.password); // comparar el pass ingresado con el pass de la bd
  if(!result) throw new Error('Email or password are wrong');
};                     
*/