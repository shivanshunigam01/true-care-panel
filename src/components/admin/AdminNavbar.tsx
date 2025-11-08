import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import trueLogo from "@/assets/true-logo.png";

export const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <img src={trueLogo} alt="T.R.U.E. Hospitals" className="h-10" />
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-foreground">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">T.R.U.E. Hospitals Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
