import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { RecipeResolver } from "./resolvers/RecipeResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { UserResolver } from "./resolvers/UserResolver";

import fs from 'fs';
import path from 'path';

export async function startServer() {
  const jwt = require('jsonwebtoken');
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver, CategoryResolver, UserResolver],
      validate: false
    }),
    context: ({ req }) => {
      let token = req.headers.authorization || '';
      token = token.split("Bearer ")[1];
      var privateKey = fs.readFileSync(path.normalize(__dirname + '/config/private.key'), { encoding: 'utf8' });
      try {
        let user =   jwt.verify(token, privateKey);
        return user.data;
      } catch (error) {
        return null;
      }
    },
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}