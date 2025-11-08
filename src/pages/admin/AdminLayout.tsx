import { Outlet } from "react-router-dom";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <AdminNavbar />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
