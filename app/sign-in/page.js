import { signIn, auth } from "auth";
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard/speakers");
  }

  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
    >
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-sm">
            <h1 className="text-xl font-bold mb-4 text-center">Sign In</h1>
            <input className="bg-transparent !text-sm !py-2 !px-4 rounded-sm w-full border !border-gray-700 mb-2" type="text" name="email" placeholder="Email" />
            <button type="submit" className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm w-full">Sign In</button>
          </div>
        </div>
      </div>
    </form>
  )
};

