import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Leads",
    icon: Users,
    path: "/admin/leads",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
