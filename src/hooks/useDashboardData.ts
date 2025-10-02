import { useEffect, useState } from 'react';
import { supabase, Product, BusinessSettings, MarketingCampaign } from '../lib/supabase';

export const useDashboardData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [productsRes, settingsRes, campaignsRes] = await Promise.all([
        supabase.from('products').select('*').eq('is_active', true).order('category'),
        supabase.from('business_settings').select('*').limit(1).maybeSingle(),
        supabase.from('marketing_campaigns').select('*').eq('is_active', true).order('created_at', { ascending: false })
      ]);

      if (productsRes.error) throw productsRes.error;
      if (settingsRes.error) throw settingsRes.error;
      if (campaignsRes.error) throw campaignsRes.error;

      setProducts(productsRes.data || []);
      setSettings(settingsRes.data);
      setCampaigns(campaignsRes.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const updateSettings = async (updates: Partial<BusinessSettings>) => {
    try {
      if (!settings) return;

      const { error } = await supabase
        .from('business_settings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', settings.id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    }
  };

  const updateCampaign = async (id: string, updates: Partial<MarketingCampaign>) => {
    try {
      const { error } = await supabase
        .from('marketing_campaigns')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update campaign');
    }
  };

  const addCampaign = async (campaign: Omit<MarketingCampaign, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('marketing_campaigns')
        .insert([campaign]);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add campaign');
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([product]);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  return {
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
    addCampaign,
    refetch: fetchData
  };
};
