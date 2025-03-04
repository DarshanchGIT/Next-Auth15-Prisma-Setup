import { prisma } from "@/lib/db";

export type User = {
  name?: string;
  email: string;
  password: string;
};
export const SignUpAction = async (user: User) => {
  try {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    console.log("User signed up successfully");
  } catch (error: any) {
    throw new Error("Error signing you up !!");
  }
};
