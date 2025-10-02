import { useDashboardData } from './hooks/useDashboardData';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { ProductEstimator } from './components/ProductEstimator';
import { CostEstimator } from './components/CostEstimator';
import { MarketingROI } from './components/MarketingROI';
import { RevenueChart } from './components/RevenueChart';
import { CurrencyConverter } from './components/CurrencyConverter';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const {
    products,
    settings,
    campaigns,
    loading,
    error,
    updateProduct,
    addProduct,
    deleteProduct,
    updateSettings,
    updateCampaign,
    addCampaign
  } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-kostyle-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-xl border border-border p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-kostyle-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-xl border border-border p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-kostyle-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">No Settings Found</h2>
          <p className="text-muted-foreground">Please configure business settings first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <StatsOverview products={products} settings={settings} currencySymbol="AED" />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductEstimator
              products={products}
              onUpdateProduct={updateProduct}
              onAddProduct={addProduct}
              onDeleteProduct={deleteProduct}
              vatRate={settings.vat_rate}
              currencySymbol="AED"
            />
          </div>

          <div className="lg:col-span-1">
            <CurrencyConverter
              settings={settings}
              onUpdateSettings={updateSettings}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <CostEstimator
            products={products}
            settings={settings}
            onUpdateSettings={updateSettings}
            currencySymbol="AED"
          />

          <RevenueChart
            products={products}
            campaigns={campaigns}
            vatRate={settings.vat_rate}
            currencySymbol="AED"
          />
        </div>

        <MarketingROI
          campaigns={campaigns}
          products={products}
          onUpdateCampaign={updateCampaign}
          onAddCampaign={addCampaign}
          currencySymbol="AED"
        />
      </main>

      <footer className="bg-card border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">KOSTYLE - Business Prediction Dashboard</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
