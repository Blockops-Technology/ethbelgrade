import Sidebar from "@/components/dashboard/sidebar/sidebar";

const DashboardLayout = ({ children }) => {
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