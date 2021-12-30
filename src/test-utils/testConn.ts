import { createConnection } from "typeorm";

export const testConn = (drop = false) => {
  return createConnection({
    name: "default",
    type: "sqlite",
    database: "../data/main-test.sqlite",
    dropSchema: drop,
    synchronize: drop,
    entities: [__dirname + "/../entity/*.*"],
  });
};
