import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";

import { RegisterResolver } from "./modules/user/Register";
import { redis } from "./redis";
import cors from "cors";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MeResolver, RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }) => ({ req }),
  });

  const app = Express();

  await apolloServer.start();

  const RedisStore = connectRedis(session);

  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      name: "qid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server started: http://localhost:4000/graphql 🚀")
  );
};

main();
