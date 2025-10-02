import { useState } from 'react';
import { TrendingUp, CreditCard as Edit2, Check, X, Plus } from 'lucide-react';
import { MarketingCampaign, Product } from '../lib/supabase';

type MarketingROIProps = {
  campaigns: MarketingCampaign[];
  products: Product[];
  onUpdateCampaign: (id: string, updates: Partial<MarketingCampaign>) => void;
  onAddCampaign: (campaign: Omit<MarketingCampaign, 'id' | 'created_at' | 'updated_at'>) => void;
  currencySymbol?: string;
};

export const MarketingROI = ({ campaigns, products, onUpdateCampaign, onAddCampaign, currencySymbol = 'AED' }: MarketingROIProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ budget: string; conversion_rate: string }>({ budget: '', conversion_rate: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    budget_aed: '',
    conversion_rate: '2.5'
  });

  const avgOrderValue = products.length > 0
    ? products.reduce((sum, p) => sum + (p.unit_price_aed * p.quantity), 0) / products.reduce((sum, p) => sum + p.quantity, 1)
    : 100;

  const startEdit = (campaign: MarketingCampaign) => {
    setEditingId(campaign.id);
    setEditValues({
      budget: campaign.budget_aed.toString(),
      conversion_rate: campaign.conversion_rate.toString()
    });
  };

  const saveEdit = (id: string) => {
    onUpdateCampaign(id, {
      budget_aed: parseFloat(editValues.budget) || 0,
      conversion_rate: parseFloat(editValues.conversion_rate) || 0
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleAddCampaign = () => {
    if (newCampaign.name && newCampaign.budget_aed) {
      onAddCampaign({
        name: newCampaign.name,
        budget_aed: parseFloat(newCampaign.budget_aed),
        conversion_rate: parseFloat(newCampaign.conversion_rate),
        start_date: new Date().toISOString().split('T')[0],
        end_date: null,
        actual_customers: 0,
        actual_revenue_aed: 0,
        is_active: true
      });
      setNewCampaign({ name: '', budget_aed: '', conversion_rate: '2.5' });
      setShowAddForm(false);
    }
  };

  const calculateROI = (campaign: MarketingCampaign) => {
    const estimatedCustomers = (campaign.budget_aed / 10) * (campaign.conversion_rate / 100);
    const estimatedRevenue = estimatedCustomers * avgOrderValue;
    const roi = campaign.budget_aed > 0 ? ((estimatedRevenue - campaign.budget_aed) / campaign.budget_aed) * 100 : 0;

    return {
      estimatedCustomers: Math.round(estimatedCustomers),
      estimatedRevenue,
      roi,
      netGain: estimatedRevenue - campaign.budget_aed
    };
  };

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget_aed, 0);
  const totalEstimatedRevenue = campaigns.reduce((sum, c) => sum + calculateROI(c).estimatedRevenue, 0);
  const overallROI = totalBudget > 0 ? ((totalEstimatedRevenue - totalBudget) / totalBudget) * 100 : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-kostyle-primary rounded-lg">
            <TrendingUp className="w-6 h-6 text-background" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Marketing ROI Predictor</h2>
            <p className="text-sm text-muted-foreground">Estimate campaign performance</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-kostyle-primary text-background rounded-lg hover:bg-kostyle-primary-dark transition-colors flex items-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Campaign
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-3">New Campaign</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Campaign Name"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
            />
            <input
              type="number"
              placeholder={`Budget (${currencySymbol})`}
              value={newCampaign.budget_aed}
              onChange={(e) => setNewCampaign({ ...newCampaign, budget_aed: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
              step="0.01"
            />
            <input
              type="number"
              placeholder="Conversion Rate (%)"
              value={newCampaign.conversion_rate}
              onChange={(e) => setNewCampaign({ ...newCampaign, conversion_rate: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
              step="0.01"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddCampaign}
              className="px-4 py-2 bg-kostyle-primary text-background rounded-lg hover:bg-kostyle-primary-dark transition-colors font-medium"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-border transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 p-4 bg-kostyle-primary rounded-lg text-background">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm opacity-90">Total Spend</p>
            <p className="text-2xl font-bold">{currencySymbol} {totalBudget.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Estimated Revenue</p>
            <p className="text-2xl font-bold">{currencySymbol} {totalEstimatedRevenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Overall ROI</p>
            <p className="text-2xl font-bold">{overallROI.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Campaign</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Budget</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Conv. %</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Est. Customers</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Est. Revenue</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">ROI</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => {
              const metrics = calculateROI(campaign);
              return (
                <tr key={campaign.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="py-3 px-2 text-sm text-foreground font-medium">{campaign.name}</td>
                  <td className="py-3 px-2 text-right">
                    {editingId === campaign.id ? (
                      <input
                        type="number"
                        value={editValues.budget}
                        onChange={(e) => setEditValues({ ...editValues, budget: e.target.value })}
                        className="w-24 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                        step="0.01"
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground">{campaign.budget_aed.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {editingId === campaign.id ? (
                      <input
                        type="number"
                        value={editValues.conversion_rate}
                        onChange={(e) => setEditValues({ ...editValues, conversion_rate: e.target.value })}
                        className="w-20 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                        step="0.01"
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground">{campaign.conversion_rate.toFixed(2)}%</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right text-sm text-foreground">{metrics.estimatedCustomers}</td>
                  <td className="py-3 px-2 text-right text-sm font-semibold text-foreground">
                    {currencySymbol} {metrics.estimatedRevenue.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm font-bold text-kostyle-primary">
                      {metrics.roi.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center gap-2">
                      {editingId === campaign.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(campaign.id)}
                            className="p-1.5 bg-kostyle-primary text-background rounded hover:bg-kostyle-primary-dark transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1.5 bg-muted text-foreground rounded hover:bg-border transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(campaign)}
                          className="p-1.5 bg-kostyle-primary text-background rounded hover:bg-kostyle-primary-dark transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Calculation:</strong> Est. Customers = (Budget / 10) × (Conversion Rate / 100) | ROI = ((Est. Revenue - Budget) / Budget) × 100
        </p>
      </div>
    </div>
  );
};
