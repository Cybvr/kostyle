import { useState } from 'react';
import { DollarSign, CreditCard as Edit2, Check, X } from 'lucide-react';
import { BusinessSettings, Product } from '../lib/supabase';

type CostEstimatorProps = {
  products: Product[];
  settings: BusinessSettings;
  onUpdateSettings: (updates: Partial<BusinessSettings>) => void;
  currencySymbol?: string;
};

export const CostEstimator = ({ products, settings, onUpdateSettings, currencySymbol = 'AED' }: CostEstimatorProps) => {
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    vat_rate: settings.vat_rate.toString(),
    shipping_cost_aed: settings.shipping_cost_aed.toString(),
    discount_rate: settings.discount_rate.toString(),
    overhead_cost_aed: settings.overhead_cost_aed.toString()
  });

  const startEdit = () => {
    setEditing(true);
    setEditValues({
      vat_rate: settings.vat_rate.toString(),
      shipping_cost_aed: settings.shipping_cost_aed.toString(),
      discount_rate: settings.discount_rate.toString(),
      overhead_cost_aed: settings.overhead_cost_aed.toString()
    });
  };

  const saveEdit = () => {
    onUpdateSettings({
      vat_rate: parseFloat(editValues.vat_rate) || 0,
      shipping_cost_aed: parseFloat(editValues.shipping_cost_aed) || 0,
      discount_rate: parseFloat(editValues.discount_rate) || 0,
      overhead_cost_aed: parseFloat(editValues.overhead_cost_aed) || 0
    });
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const grossRevenue = products.reduce((sum, p) => sum + (p.unit_price_aed * p.quantity), 0);
  const vatAmount = grossRevenue * (settings.vat_rate / 100);
  const totalRevenue = grossRevenue + vatAmount;
  const discountAmount = totalRevenue * (settings.discount_rate / 100);
  const revenueAfterDiscount = totalRevenue - discountAmount;
  const totalCosts = settings.shipping_cost_aed + settings.overhead_cost_aed;
  const netProfit = revenueAfterDiscount - totalCosts;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-kostyle-primary rounded-lg">
            <DollarSign className="w-6 h-6 text-background" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Cost Settings</h2>
            <p className="text-sm text-muted-foreground">Configure VAT, costs and margins</p>
          </div>
        </div>
        <div>
          {editing ? (
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-kostyle-primary text-background rounded-lg hover:bg-kostyle-primary-dark transition-colors flex items-center gap-2 font-medium"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-border transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={startEdit}
              className="px-4 py-2 bg-kostyle-primary text-background rounded-lg hover:bg-kostyle-primary-dark transition-colors flex items-center gap-2 font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground border-b-2 border-kostyle-primary pb-2">Business Parameters</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">VAT Rate (%):</span>
              {editing ? (
                <input
                  type="number"
                  value={editValues.vat_rate}
                  onChange={(e) => setEditValues({ ...editValues, vat_rate: e.target.value })}
                  className="w-24 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                  step="0.01"
                />
              ) : (
                <span className="text-sm font-semibold text-kostyle-primary">{settings.vat_rate.toFixed(2)}%</span>
              )}
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Shipping Cost ({currencySymbol}):</span>
              {editing ? (
                <input
                  type="number"
                  value={editValues.shipping_cost_aed}
                  onChange={(e) => setEditValues({ ...editValues, shipping_cost_aed: e.target.value })}
                  className="w-24 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                  step="0.01"
                />
              ) : (
                <span className="text-sm font-semibold text-kostyle-primary">{settings.shipping_cost_aed.toFixed(2)}</span>
              )}
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Discount Rate (%):</span>
              {editing ? (
                <input
                  type="number"
                  value={editValues.discount_rate}
                  onChange={(e) => setEditValues({ ...editValues, discount_rate: e.target.value })}
                  className="w-24 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                  step="0.01"
                />
              ) : (
                <span className="text-sm font-semibold text-kostyle-primary">{settings.discount_rate.toFixed(2)}%</span>
              )}
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Overhead ({currencySymbol}):</span>
              {editing ? (
                <input
                  type="number"
                  value={editValues.overhead_cost_aed}
                  onChange={(e) => setEditValues({ ...editValues, overhead_cost_aed: e.target.value })}
                  className="w-24 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                  step="0.01"
                />
              ) : (
                <span className="text-sm font-semibold text-kostyle-primary">{settings.overhead_cost_aed.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground border-b-2 border-kostyle-primary pb-2">Financial Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Gross Revenue:</span>
              <span className="text-sm font-semibold text-foreground">{currencySymbol} {grossRevenue.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">VAT Amount:</span>
              <span className="text-sm font-semibold text-foreground">{currencySymbol} {vatAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Discount:</span>
              <span className="text-sm font-semibold text-muted-foreground">-{currencySymbol} {discountAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Total Costs:</span>
              <span className="text-sm font-semibold text-muted-foreground">-{currencySymbol} {totalCosts.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-kostyle-primary rounded-lg mt-4">
              <span className="text-sm font-bold text-background">Net Profit:</span>
              <span className="text-lg font-bold text-background">{currencySymbol} {netProfit.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Profit Margin:</span>
              <span className="text-sm font-semibold text-kostyle-primary">
                {profitMargin.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
