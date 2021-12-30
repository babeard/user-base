import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy((err) => {
        if (err) {
          reject(false);
          return;
        }

        ctx.res.clearCookie("qid");
        resolve(true);
      });
    });
  }
}
