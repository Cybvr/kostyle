/*
  # Boxing Gear Dashboard Database Schema

  ## Overview
  Complete database schema for a boxing gear business dashboard in Dubai.
  Supports dynamic product management, cost estimation, marketing ROI tracking,
  and currency conversion with full CRUD capabilities.

  ## New Tables
  
  ### `products`
  Core product catalog with pricing and inventory
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name (e.g., "Boxing Gloves")
  - `category` (text) - Product category
  - `unit_price_aed` (decimal) - Base price in AED
  - `quantity` (integer) - Current stock quantity
  - `description` (text) - Product description
  - `image_url` (text) - Product image URL
  - `is_active` (boolean) - Whether product is currently offered
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `business_settings`
  Configurable business parameters for calculations
  - `id` (uuid, primary key) - Settings identifier
  - `vat_rate` (decimal) - Dubai VAT percentage (default 5%)
  - `shipping_cost_aed` (decimal) - Base shipping cost
  - `discount_rate` (decimal) - Default discount percentage
  - `overhead_cost_aed` (decimal) - Monthly overhead costs
  - `usd_to_aed_rate` (decimal) - Currency exchange rate
  - `updated_at` (timestamptz) - Last update timestamp

  ### `marketing_campaigns`
  Marketing spend and ROI tracking
  - `id` (uuid, primary key) - Campaign identifier
  - `name` (text) - Campaign name
  - `budget_aed` (decimal) - Marketing budget in AED
  - `conversion_rate` (decimal) - Expected conversion rate (%)
  - `start_date` (date) - Campaign start date
  - `end_date` (date) - Campaign end date
  - `actual_customers` (integer) - Actual customers acquired
  - `actual_revenue_aed` (decimal) - Actual revenue generated
  - `is_active` (boolean) - Whether campaign is active
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public access policies for reading data (suitable for business dashboard)
  - Authenticated access required for modifications
  - All tables protected with appropriate CRUD policies

  ## Initial Data
  - Sample boxing products (gloves, guards, wraps, t-shirts)
  - Default business settings (5% VAT, AED exchange rate)
  - Example marketing campaign data
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  unit_price_aed decimal(10, 2) NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 0,
  description text DEFAULT '',
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create business_settings table
CREATE TABLE IF NOT EXISTS business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vat_rate decimal(5, 2) NOT NULL DEFAULT 5.00,
  shipping_cost_aed decimal(10, 2) DEFAULT 0,
  discount_rate decimal(5, 2) DEFAULT 0,
  overhead_cost_aed decimal(10, 2) DEFAULT 0,
  usd_to_aed_rate decimal(10, 4) NOT NULL DEFAULT 3.6725,
  updated_at timestamptz DEFAULT now()
);

-- Create marketing_campaigns table
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  budget_aed decimal(10, 2) NOT NULL DEFAULT 0,
  conversion_rate decimal(5, 2) NOT NULL DEFAULT 2.00,
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  actual_customers integer DEFAULT 0,
  actual_revenue_aed decimal(10, 2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Business settings policies
CREATE POLICY "Anyone can view business settings"
  ON business_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert settings"
  ON business_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON business_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Marketing campaigns policies
CREATE POLICY "Anyone can view marketing campaigns"
  ON marketing_campaigns FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert campaigns"
  ON marketing_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update campaigns"
  ON marketing_campaigns FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete campaigns"
  ON marketing_campaigns FOR DELETE
  TO authenticated
  USING (true);

-- Insert default business settings
INSERT INTO business_settings (vat_rate, shipping_cost_aed, discount_rate, overhead_cost_aed, usd_to_aed_rate)
VALUES (5.00, 25.00, 0.00, 5000.00, 3.6725)
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category, unit_price_aed, quantity, description, is_active) VALUES
  ('Professional Boxing Gloves', 'Gloves', 250.00, 50, 'Premium leather boxing gloves for professional training', true),
  ('Training Boxing Gloves', 'Gloves', 150.00, 100, 'Durable training gloves for beginners and intermediate', true),
  ('Mouth Guard Pro', 'Guards', 45.00, 200, 'Custom-fit mouth guard with maximum protection', true),
  ('Groin Guard', 'Guards', 85.00, 75, 'Professional-grade groin protector', true),
  ('Hand Wraps (Pair)', 'Wraps', 35.00, 300, '180-inch cotton hand wraps with thumb loop', true),
  ('Quick Wraps', 'Wraps', 55.00, 150, 'Easy-to-use quick wraps with gel padding', true),
  ('Boxing T-Shirt', 'T-Shirts', 75.00, 200, 'Moisture-wicking performance t-shirt with boxing design', true),
  ('Training Tank Top', 'T-Shirts', 65.00, 150, 'Breathable mesh tank top for intense training', true)
ON CONFLICT DO NOTHING;

-- Insert sample marketing campaigns
INSERT INTO marketing_campaigns (name, budget_aed, conversion_rate, start_date, end_date, is_active) VALUES
  ('Instagram Boxing Ads Q1', 5000.00, 3.50, CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', true),
  ('Google Search Campaign', 8000.00, 5.00, CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', true),
  ('Facebook Retargeting', 3000.00, 2.50, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true)
ON CONFLICT DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_campaigns_is_active ON marketing_campaigns(is_active);
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON marketing_campaigns(start_date, end_date);