import { Package, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { Product, BusinessSettings } from '../lib/supabase';

type StatsOverviewProps = {
  products: Product[];
  settings: BusinessSettings;
  currencySymbol?: string;
};

export const StatsOverview = ({ products, settings, currencySymbol = 'AED' }: StatsOverviewProps) => {
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, p) => sum + p.quantity, 0);
  const grossRevenue = products.reduce((sum, p) => sum + (p.unit_price_aed * p.quantity), 0);
  const totalWithVAT = grossRevenue * (1 + settings.vat_rate / 100);
  const avgProductValue = totalProducts > 0 ? grossRevenue / totalInventory : 0;

  const stats = [
    {
      icon: Package,
      label: 'Estimated Products',
      value: totalProducts.toString()
    },
    {
      icon: ShoppingCart,
      label: 'Potential Inventory',
      value: totalInventory.toString()
    },
    {
      icon: DollarSign,
      label: 'Estimated Revenue',
      value: `${currencySymbol} ${grossRevenue.toFixed(0)}`
    },
    {
      icon: TrendingUp,
      label: 'Revenue + VAT',
      value: `${currencySymbol} ${totalWithVAT.toFixed(0)}`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 transition-transform hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-kostyle-primary rounded-lg">
              <stat.icon className="w-6 h-6 text-background" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-kostyle-primary">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
