import { Calculator } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-kostyle-primary rounded-lg">
            <Calculator className="w-8 h-8 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">KOSTYLE</h1>
            <p className="text-muted-foreground text-sm">Business Prediction Dashboard</p>
          </div>
        </div>
      </div>
    </header>
  );
};
