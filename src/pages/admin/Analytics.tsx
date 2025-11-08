import { getLeads } from "@/utils/localStorageHelpers";
import { LeadsLineChart } from "@/components/admin/charts/LeadsLineChart";
import { CategoryPieChart } from "@/components/admin/charts/CategoryPieChart";
import { ConversionBarChart } from "@/components/admin/charts/ConversionBarChart";

export default function Analytics() {
  const leads = getLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Visualize your lead data and conversion trends
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LeadsLineChart />
        <CategoryPieChart leads={leads} />
      </div>

      <div className="grid gap-6">
        <ConversionBarChart />
      </div>
    </div>
  );
}
