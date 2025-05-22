import { auth } from "@/auth";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
// import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Dashboard — ETH Belgrade',
  description: 'Dashboard for ETH Belgrade',
  openGraph: {
    title: 'Dashboard — ETH Belgrade',
    description: 'Dashboard for ETH Belgrade',
  },
}

const DashboardLayout = async ({ children }) => {
  const user = await auth();

  console.log("user", user);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 px-8 py-14">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;