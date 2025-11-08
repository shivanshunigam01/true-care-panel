import { Outlet } from "react-router-dom";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
