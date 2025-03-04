import { signIn, auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;

  const handleAuth = async () => {
    "use server";
    if (user) {
      await signOut();
      redirect("/");
    } else {
      await signIn("google");
      redirect("/");
    }
  };

  const handleCredentialsSignIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
    });
    redirect('/')
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">Sign In</h2>

        {/* Email/Password Form */}
        <form className="space-y-4" action={handleCredentialsSignIn}>
          <div className="text-left">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none text-gray-900"
              required
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white text-lg p-3 rounded-lg hover:bg-gray-600 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Google Sign In */}
        <form action={handleAuth}>
          <button
            type="submit"
            className="w-full bg-red-600 text-white text-lg p-3 rounded-lg hover:bg-red-500 transition cursor-pointer"
          >
            {user ? "Sign Out" : "Sign In with Google"}
          </button>
        </form>
      </div>
    </div>
  );
}
