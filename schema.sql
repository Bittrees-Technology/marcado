CREATE SCHEMA IF NOT EXISTS marcada;
CREATE TABLE IF NOT EXISTS marcada.users(identity text PRIMARY KEY, referral text UNIQUE NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS marcada.sessions(hash text PRIMARY KEY,identity text NOT NULL,expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS marcada.auth_tokens(hash text PRIMARY KEY,identity text NOT NULL,kind text NOT NULL,expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS marcada.email_challenges(hash text PRIMARY KEY,identity text NOT NULL,code_hash text NOT NULL,attempts integer NOT NULL DEFAULT 0,expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS marcada.rate_limits(key text PRIMARY KEY,count integer NOT NULL,expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS marcada.audit(id uuid PRIMARY KEY,actor text NOT NULL,action text NOT NULL,detail text NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS marcada.products(id text PRIMARY KEY,name text NOT NULL,category text NOT NULL,description text NOT NULL,active boolean NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS marcada.offers(id uuid PRIMARY KEY,product_id text NOT NULL REFERENCES marcada.products(id),dealer text NOT NULL,url text NOT NULL,price numeric CHECK(price>=0),currency text NOT NULL DEFAULT 'USD',private boolean NOT NULL DEFAULT true,notes text NOT NULL DEFAULT '',active boolean NOT NULL DEFAULT true,expires_at timestamptz,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS marcada.offer_grants(offer_id uuid REFERENCES marcada.offers(id) ON DELETE CASCADE,identity text NOT NULL,PRIMARY KEY(offer_id,identity));
CREATE TABLE IF NOT EXISTS marcada.quotes(id uuid PRIMARY KEY,identity text NOT NULL,product_id text NOT NULL REFERENCES marcada.products(id),quantity integer NOT NULL CHECK(quantity BETWEEN 1 AND 10000),details text NOT NULL,referral text,status text NOT NULL DEFAULT 'new' CHECK(status IN ('new','reviewing','quoted','closed')),created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS marcada_quotes_identity ON marcada.quotes(identity);
INSERT INTO marcada.products(id,name,category,description) VALUES
('bitaxe','Bitaxe miners','Mining','Open-source Bitcoin mining hardware. Tell us your preferred model and we will source an available dealer offer.'),
('asic','ASIC miners','Mining','Dedicated mining hardware for larger setups. Request a model, algorithm and quantity.'),
('mining-accessories','Mining essentials','Accessories','Power supplies, cooling and accessories for your mining setup. Confirm compatibility before ordering.'),
('ai-compute','AI compute','AI & compute','GPU workstations and compute hardware for local models and demanding workloads.'),
('servers','Servers & networking','Servers','Rack servers, storage and networking equipment for your next deployment.'),
('components','Electronic components','Accessories','Memory, storage, power and replacement parts. Source the components your build needs.')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS marcada.roles(identity text PRIMARY KEY,role text NOT NULL CHECK(role IN ('admin','dealer_manager','support')),created_at timestamptz NOT NULL DEFAULT now());

CREATE TABLE IF NOT EXISTS marcada.items(id text PRIMARY KEY,product_id text NOT NULL REFERENCES marcada.products(id),name text NOT NULL,description text NOT NULL,price numeric(12,2) NOT NULL CHECK(price>=0),currency text NOT NULL CHECK(currency IN ('USD','EUR','GBP','CAD','AUD')),price_kind text NOT NULL DEFAULT 'reference' CHECK(price_kind IN ('reference','asking')),price_checked date NOT NULL DEFAULT CURRENT_DATE,source_url text NOT NULL DEFAULT '',source_name text NOT NULL DEFAULT '',image_url text NOT NULL,image_credit text NOT NULL DEFAULT '',specifications text NOT NULL DEFAULT '',supplier_status text NOT NULL DEFAULT 'Unknown',active boolean NOT NULL DEFAULT true,updated_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS marcada_items_collection ON marcada.items(product_id);
CREATE TABLE IF NOT EXISTS marcada.media(id uuid PRIMARY KEY,mime text NOT NULL CHECK(mime IN ('image/jpeg','image/png','image/webp')),data text NOT NULL,bytes integer NOT NULL CHECK(bytes>0 AND bytes<=1048576),created_by text NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
ALTER TABLE marcada.quotes ADD COLUMN IF NOT EXISTS item_id text REFERENCES marcada.items(id);
ALTER TABLE marcada.offers ADD COLUMN IF NOT EXISTS item_id text REFERENCES marcada.items(id);
CREATE TABLE IF NOT EXISTS marcada.orders(id uuid PRIMARY KEY,identity text NOT NULL,quote_id uuid REFERENCES marcada.quotes(id),status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','awaiting_payment','paid','fulfilling','shipped','completed','cancelled','refunded')),currency text NOT NULL,subtotal_minor bigint NOT NULL DEFAULT 0 CHECK(subtotal_minor>=0),tax_minor bigint NOT NULL DEFAULT 0 CHECK(tax_minor>=0),shipping_minor bigint NOT NULL DEFAULT 0 CHECK(shipping_minor>=0),total_minor bigint NOT NULL DEFAULT 0 CHECK(total_minor=subtotal_minor+tax_minor+shipping_minor),created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS marcada.order_lines(id uuid PRIMARY KEY,order_id uuid NOT NULL REFERENCES marcada.orders(id),item_id text REFERENCES marcada.items(id),sku_snapshot text NOT NULL,name_snapshot text NOT NULL,quantity integer NOT NULL CHECK(quantity>0),unit_price_minor bigint NOT NULL CHECK(unit_price_minor>=0));
CREATE TABLE IF NOT EXISTS marcada.payment_events(id uuid PRIMARY KEY,order_id uuid NOT NULL REFERENCES marcada.orders(id),provider text NOT NULL,provider_event_id text NOT NULL,status text NOT NULL,amount_minor bigint NOT NULL CHECK(amount_minor>=0),currency text NOT NULL,verified_at timestamptz,created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(provider,provider_event_id));
CREATE TABLE IF NOT EXISTS marcada.shipments(id uuid PRIMARY KEY,order_id uuid NOT NULL REFERENCES marcada.orders(id),carrier text,tracking_number text,status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','label_created','in_transit','delivered','exception','returned')),address jsonb,created_at timestamptz NOT NULL DEFAULT now());
