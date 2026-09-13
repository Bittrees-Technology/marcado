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
