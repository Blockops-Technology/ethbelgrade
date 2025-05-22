"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react"

const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="flex flex-col py-5 px-8 border-r border-gray-200/50">
      <img src="/logo.svg" alt="ETH Belgrade logo" />
      <nav className="flex flex-col my-10">
        <Link className={`uppercase text-sm !text-gray-300 font-bold ${pathname === '/dashboard/speakers' ? "!bg-gray-900 !text-white" : ""} hover:bg-gray-900/50 py-4 px-6 rounded-sm`} href="/dashboard/speakers">Speakers</Link>
        <Link className={`uppercase text-sm !text-gray-300 font-bold ${pathname === '/dashboard/sponsors' ? "!bg-gray-900 !text-white" : ""} hover:bg-gray-900/50 py-4 px-6 rounded-sm`} href="/dashboard/sponsors">Sponsors</Link>
        <Link className={`uppercase text-sm !text-gray-300 font-bold ${pathname === '/dashboard/agenda' ? "!bg-gray-900 !text-white" : ""} hover:bg-gray-900/50 py-4 px-6 rounded-sm`} href="/dashboard/agenda">Agenda</Link>
        <Link className={`uppercase text-sm !text-gray-300 font-bold ${pathname === '/dashboard/moderators' ? "!bg-gray-900 !text-white" : ""} hover:bg-gray-900/50 py-4 px-6 rounded-sm`} href="/dashboard/moderators">Moderators</Link>
      </nav>
      <div className="mt-auto justify-self-end">
        <p className="mb-3">{session?.user?.email}</p>
        <div className="text-sm text-gray-500 text-center py-4 px-6 rounded-sm bg-gray-900/50 hover:bg-gray-900/70 hover:text-white cursor-pointer" onClick={signOut}>Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;