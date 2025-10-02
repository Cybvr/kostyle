import { useState } from 'react';
import { CreditCard as Edit2, Check, X, Package, Plus, Trash2 } from 'lucide-react';
import { Product } from '../lib/supabase';

type ProductEstimatorProps = {
  products: Product[];
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  onDeleteProduct: (id: string) => void;
  vatRate: number;
  currencySymbol?: string;
};

export const ProductEstimator = ({ products, onUpdateProduct, onAddProduct, onDeleteProduct, vatRate, currencySymbol = 'AED' }: ProductEstimatorProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; category: string; price: string; quantity: string }>({ name: '', category: '', price: '', quantity: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    unit_price_aed: '',
    quantity: ''
  });

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditValues({
      name: product.name,
      category: product.category,
      price: product.unit_price_aed.toString(),
      quantity: product.quantity.toString()
    });
  };

  const saveEdit = (id: string) => {
    onUpdateProduct(id, {
      name: editValues.name,
      category: editValues.category,
      unit_price_aed: parseFloat(editValues.price) || 0,
      quantity: parseInt(editValues.quantity) || 0
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.unit_price_aed && newProduct.quantity) {
      onAddProduct({
        name: newProduct.name,
        category: newProduct.category,
        unit_price_aed: parseFloat(newProduct.unit_price_aed),
        quantity: parseInt(newProduct.quantity),
        description: '',
        image_url: '',
        is_active: true
      });
      setNewProduct({ name: '', category: '', unit_price_aed: '', quantity: '' });
      setShowAddForm(false);
    }
  };

  const calculateSubtotal = (product: Product) => {
    return product.unit_price_aed * product.quantity;
  };

  const totalRevenue = products.reduce((sum, p) => sum + calculateSubtotal(p), 0);
  const vatAmount = totalRevenue * (vatRate / 100);
  const totalWithVAT = totalRevenue + vatAmount;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-kostyle-primary rounded-lg">
            <Package className="w-6 h-6 text-background" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Product Estimator</h2>
            <p className="text-sm text-muted-foreground">Add and estimate potential inventory</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-kostyle-primary text-background rounded-lg hover:bg-kostyle-primary-dark transition-colors flex items-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-3">New Product</h3>
          <div className="grid md:grid-cols-4 gap-3 mb-3">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
            />
            <input
              type="number"
              placeholder={`Price (${currencySymbol})`}
              value={newProduct.unit_price_aed}
              onChange={(e) => setNewProduct({ ...newProduct, unit_price_aed: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
              step="0.01"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-kostyle-primary text-background rounded-lg hover:bg-kostyle-primary-dark transition-colors font-medium"
            >
              Add Product
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Product</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Category</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Price ({currencySymbol})</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Qty</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Subtotal</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-muted transition-colors">
                <td className="py-3 px-2">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editValues.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      className="w-full px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                    />
                  ) : (
                    <span className="text-sm font-medium text-foreground">{product.name}</span>
                  )}
                </td>
                <td className="py-3 px-2">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editValues.category}
                      onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                      className="w-full px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  )}
                </td>
                <td className="py-3 px-2 text-right">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editValues.price}
                      onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                      className="w-24 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                      step="0.01"
                    />
                  ) : (
                    <span className="text-sm font-medium text-foreground">{product.unit_price_aed.toFixed(2)}</span>
                  )}
                </td>
                <td className="py-3 px-2 text-right">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editValues.quantity}
                      onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
                      className="w-20 px-2 py-1 bg-card border border-kostyle-primary rounded text-sm text-right text-foreground focus:outline-none focus:ring-2 focus:ring-kostyle-primary"
                    />
                  ) : (
                    <span className="text-sm font-medium text-foreground">{product.quantity}</span>
                  )}
                </td>
                <td className="py-3 px-2 text-right text-sm font-semibold text-kostyle-primary">
                  {calculateSubtotal(product).toFixed(2)}
                </td>
                <td className="py-3 px-2">
                  <div className="flex justify-center gap-2">
                    {editingId === product.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(product.id)}
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
                      <>
                        <button
                          onClick={() => startEdit(product)}
                          className="p-1.5 bg-kostyle-primary text-background rounded hover:bg-kostyle-primary-dark transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-1.5 bg-muted text-foreground rounded hover:bg-border transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-border">
        <div className="space-y-2 max-w-md ml-auto">
          <div className="flex justify-between text-foreground">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">{currencySymbol} {totalRevenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-foreground">
            <span className="font-medium">VAT ({vatRate}%):</span>
            <span className="font-semibold">{currencySymbol} {vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-kostyle-primary pt-2 border-t border-border">
            <span>Total Revenue:</span>
            <span>{currencySymbol} {totalWithVAT.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
