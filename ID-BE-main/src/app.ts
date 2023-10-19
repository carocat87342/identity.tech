import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express, { Response } from "express";
import cookieParser from "cookie-parser";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import path from 'path';
import cors from 'cors';
import {
  UserResolver,
} from "./resolvers/index";
import {publicRouter, privateRouter} from './routes';
import restAuth from "./middleware/restAuth";
import graphqlAuth from "./middleware/graphqlAuth";
const port = process.env.PORT || 4000;
/**
 * Async StartServer function
 */

const startServer = async () => {
  /** Create Connection to database before starting server */
  await createConnection().then(fullfilled => {
    console.log("fullfilled-->>",fullfilled)
    console.log("Connected to database successfully", fullfilled.isConnected);
  });

  // Creating executable schema and brings in our various type definitions (schemas) and resolvers
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
    ],
    nullableByDefault: true,
    validate: true,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const context = {
        req,
        res,
      };
      return context;
    },
    introspection: true
  });

  /**
   * We're creating an apollo server that sits on top of Express. This will allow
   * us to use any express middleware we might need, espectially things like helmet,
   * cors, and cookies. This will help us track accounts
   */
  const app = express();
  // app.use(helmet());
  // app.use(cookieParser());

  const gqlpath = process.env.GQLPATH || "/";
  await server.start();
  server.applyMiddleware({
    app,
    path: gqlpath,
    bodyParserConfig: {
      limit: "5mb",
    },
  });

  app.use(cors());
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb', extended: true}));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api/1/', restAuth, privateRouter);
  app.use('/api/2/', publicRouter);

  // Start Express Server
  app.listen({ port }, () => {
    console.log(`🚀 iDENTITY Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
