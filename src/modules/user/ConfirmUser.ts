import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { confirmUserPrefix } from "../../constants/redisPrefixes";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string) {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) return false;

    await User.update({ id: +userId }, { confirmed: 1 });

    await redis.del(confirmUserPrefix + token);

    return true;
  }
}
