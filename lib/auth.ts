import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

const adapter = PrismaAdapter(prisma);
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        //input validation trhough zod(safeparse or anything)
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          return user;
        } catch (error: any) {
          throw new Error("Invalid credentials.", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }
        //when user login using credentials, this adapter creates session in prisma db and return a session token which later stored in web browser for further requests
        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      //this will run if user sign-in using anything other than credentials(like google or github providers)
      return defaultEncode(params);
    },
  },
});
