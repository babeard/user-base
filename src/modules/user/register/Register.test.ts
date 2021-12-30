const gql = String.raw;

import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

describe("Register", () => {
  it("create user", async () => {
    const res = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstName: "bob",
          lastName: "bob2",
          email: "bob@bob.com",
          password: "asdfasdf",
        },
      },
    });

    console.log(JSON.stringify(res));
  });
});