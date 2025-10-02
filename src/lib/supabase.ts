import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  category: string;
  unit_price_aed: number;
  quantity: number;
  description: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type BusinessSettings = {
  id: string;
  vat_rate: number;
  shipping_cost_aed: number;
  discount_rate: number;
  overhead_cost_aed: number;
  usd_to_aed_rate: number;
  updated_at: string;
};

export type MarketingCampaign = {
  id: string;
  name: string;
  budget_aed: number;
  conversion_rate: number;
  start_date: string;
  end_date: string | null;
  actual_customers: number;
  actual_revenue_aed: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
