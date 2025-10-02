import { TrendingUp } from 'lucide-react';
import { Product, MarketingCampaign } from '../lib/supabase';

type RevenueChartProps = {
  products: Product[];
  campaigns: MarketingCampaign[];
  vatRate: number;
  currencySymbol?: string;
};

export const RevenueChart = ({ products, campaigns, vatRate, currencySymbol = 'AED' }: RevenueChartProps) => {
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.unit_price_aed * p.quantity), 0);

  const avgOrderValue = products.length > 0
    ? totalInventoryValue / products.reduce((sum, p) => sum + p.quantity, 1)
    : 100;

  const totalMarketingBudget = campaigns.reduce((sum, c) => sum + c.budget_aed, 0);

  const estimatedCustomers = campaigns.reduce((sum, c) => {
    return sum + ((c.budget_aed / 10) * (c.conversion_rate / 100));
  }, 0);

  const potentialRevenue = estimatedCustomers * avgOrderValue;
  const potentialRevenueWithVAT = potentialRevenue * (1 + vatRate / 100);

  const monthlyProjection = potentialRevenueWithVAT;
  const yearlyProjection = monthlyProjection * 12;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-kostyle-primary rounded-lg">
          <TrendingUp className="w-6 h-6 text-background" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Revenue Prediction</h2>
          <p className="text-sm text-muted-foreground">Forecast based on marketing campaigns</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-muted rounded-lg border border-kostyle-primary">
          <p className="text-sm text-muted-foreground mb-1">Monthly Forecast</p>
          <p className="text-3xl font-bold text-kostyle-primary">{currencySymbol} {monthlyProjection.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Based on {Math.round(estimatedCustomers)} estimated customers</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border border-kostyle-primary">
          <p className="text-sm text-muted-foreground mb-1">Yearly Forecast</p>
          <p className="text-3xl font-bold text-kostyle-primary">{currencySymbol} {yearlyProjection.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">If marketing performance is consistent</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-foreground border-b-2 border-kostyle-primary pb-2">Prediction Breakdown</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Total Marketing Spend</p>
            <p className="text-xl font-bold text-foreground">{currencySymbol} {totalMarketingBudget.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Estimated Customers</p>
            <p className="text-xl font-bold text-foreground">{Math.round(estimatedCustomers)}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Avg Order Value</p>
            <p className="text-xl font-bold text-foreground">{currencySymbol} {avgOrderValue.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">VAT Rate</p>
            <p className="text-xl font-bold text-foreground">{vatRate}%</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Forecast Method:</strong> Based on marketing campaign budgets, conversion rates, and estimated customer acquisition.
          Revenue = Estimated Customers × Average Order Value × (1 + VAT)
        </p>
      </div>
    </div>
  );
};
