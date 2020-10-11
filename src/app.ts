import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { RecipeResolver } from "./resolvers/RecipeResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import {UserResolver} from "./resolvers/UserResolver";


export async function startServer() {

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver,CategoryResolver,UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}