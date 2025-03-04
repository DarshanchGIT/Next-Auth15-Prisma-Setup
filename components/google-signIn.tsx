import { signIn, auth, signOut } from "@/lib/auth";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  console.log(user?.name);
  const handleAuth = async () => {
    "use server";
    if (user) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <form action={handleAuth}>
      <button
        type="submit"
        className="bg-gray-800 text-white text-xl p-3 rounded-lg cursor-pointer hover:bg-gray-900 transition-transform hover:scale-105"
      >
        {user ? "Sign Out" : "Sign In with Google"}
      </button>
    </form>
  );
}
