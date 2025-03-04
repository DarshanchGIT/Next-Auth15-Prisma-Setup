import { auth, signOut } from "@/lib/auth";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  console.log(user)
  // if (!user) redirect("/sign-in");

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">Next Auth Setup 🚀</h2>
        <div className="flex flex-col items-center space-y-4 bg-gray-100 rounded-lg p-6">
          {user?.image && (
            <img
              src={user.image || undefined}
              alt="User Image"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <p className="text-lg font-medium text-gray-900">
            {user?.name || "Guest"}
          </p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
        <div className="flex item-center justify-around">

          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer" onClick={
            async () => {
              "use server";
              console.log('Logged out ...')
              session ? await signOut() : alert("You are not logged in !");
              // redirect("/");
            }
          }>
            Sign Out
          </button>
          {/* {!session && (<button className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition cursor-pointer flex items-center" onClick={
            () => redirect("/")
          }>
          Sign In
          <ArrowRight className="mx-2" />
        </button>)} */}
      </div>

    </div>
    </div >
  );
}
