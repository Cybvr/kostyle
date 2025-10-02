import { useState } from 'react';
import { DollarSign, CreditCard as Edit2, Check, X } from 'lucide-react';
import { BusinessSettings } from '../lib/supabase';

type CurrencyConverterProps = {
  settings: BusinessSettings;
  onUpdateSettings: (updates: Partial<BusinessSettings>) => void;
};

export const CurrencyConverter = ({ settings, onUpdateSettings }: CurrencyConverterProps) => {
  const [editing, setEditing] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(settings.usd_to_aed_rate.toString());
  const [amountAED, setAmountAED] = useState('1000');

  const startEdit = () => {
    setEditing(true);
    setExchangeRate(settings.usd_to_aed_rate.toString());
  };

  const saveEdit = () => {
    onUpdateSettings({
      usd_to_aed_rate: parseFloat(exchangeRate) || 3.6725
    });
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setExchangeRate(settings.usd_to_aed_rate.toString());
  };

  const aedValue = parseFloat(amountAED) || 0;
  const usdValue = aedValue / settings.usd_to_aed_rate;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-kostyle-primary rounded-lg">
            <DollarSign className="w-6 h-6 text-background" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Currency</h2>
            <p className="text-sm text-muted-foreground">AED to USD</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-foreground">Exchange Rate (1 USD)</span>
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
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
              </div>
            ) : (
              <button
                onClick={startEdit}
                className="p-1.5 bg-kostyle-primary text-background rounded hover:bg-kostyle-primary-dark transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {editing ? (
            <input
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-kostyle-primary rounded-lg text-lg font-semibold text-center text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
              step="0.0001"
            />
          ) : (
            <p className="text-3xl font-bold text-kostyle-primary text-center">{settings.usd_to_aed_rate.toFixed(4)} AED</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg border border-kostyle-primary">
            <label className="text-sm text-muted-foreground block mb-2">Amount in AED</label>
            <input
              type="number"
              value={amountAED}
              onChange={(e) => setAmountAED(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-kostyle-primary placeholder:text-muted-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
              placeholder="Enter AED amount"
              step="0.01"
            />
          </div>

          <div className="p-4 bg-muted rounded-lg border border-kostyle-primary">
            <label className="text-sm text-muted-foreground block mb-2">Equivalent in USD</label>
            <div className="w-full px-4 py-2 bg-card border border-border rounded-lg text-kostyle-primary text-lg font-semibold">
              ${usdValue.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Quick Reference</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex justify-between p-2 bg-card rounded">
              <span>100 USD =</span>
              <span className="font-semibold text-foreground">{(100 * settings.usd_to_aed_rate).toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between p-2 bg-card rounded">
              <span>500 USD =</span>
              <span className="font-semibold text-foreground">{(500 * settings.usd_to_aed_rate).toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between p-2 bg-card rounded">
              <span>1000 USD =</span>
              <span className="font-semibold text-foreground">{(1000 * settings.usd_to_aed_rate).toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between p-2 bg-card rounded">
              <span>5000 USD =</span>
              <span className="font-semibold text-foreground">{(5000 * settings.usd_to_aed_rate).toFixed(2)} AED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
