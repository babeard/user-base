import { v4 } from "uuid";
import { confirmUserPrefix } from "../constants/redisPrefixes";
import { redis } from "../redis";

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24);

  return `http://localhost:3000/confirm/${token}`;
};
