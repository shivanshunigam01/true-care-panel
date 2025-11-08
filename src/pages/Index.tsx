import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, HeartPulse } from "lucide-react";
import trueLogo from "@/assets/true-logo.png";

const Index = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    const token = localStorage.getItem("adminToken");
    navigate(token ? "/admin" : "/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-secondary to-background">
      <div className="text-center space-y-8 px-4">
        <img src={trueLogo} alt="T.R.U.E. Hospitals" className="h-20 mx-auto" />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground flex items-center justify-center gap-3">
            <HeartPulse className="h-12 w-12 text-primary" />
            T.R.U.E. Hospitals
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Expert Care, Every Step of the Way
          </p>
        </div>
        <Button
          onClick={handleAdminAccess}
          size="lg"
          className="gap-2 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
        >
          Access Admin Panel
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
