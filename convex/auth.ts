import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { internal } from "./_generated/api";
import { PasswordReset } from "./model/alunos/passwordReset";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      profile(googleProfile) {
        return {
          id: googleProfile.sub,
          name: googleProfile.name,
          email: googleProfile.email,
          image: googleProfile.picture,
        };
      },
    }),
    Password({ reset: PasswordReset }),
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId, profile }) {
      if (!profile.email) return;
      await ctx.runMutation(internal.model.alunos.mutation.linkAlunoUser, {
        userId,
        email: profile.email,
      });
    },
  },
});