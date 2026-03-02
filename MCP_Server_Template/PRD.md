This page will contain the full technical description and architecture for the enterprise MCP Server Template container used to deploy per‑app MCP servers (Raindrop, Notion, Airtable, etc.).

MCP Server Template — Full Technical Description

1. Doel en scope
De MCP Server Template is een herbruikbare runtime Docker-container die op basis van configuratie een volwaardige MCP-server expose’t voor een specifieke upstream API (Raindrop, Notion, Airtable, ClickUp, Google Drive, etc.).

Ondersteunt:

- Tools
- Resources
- Prompts
- Sampling (optioneel)
- Streamable HTTP transport
- SSE transport
- OpenAI tool compatibility façade

Ontworpen voor:

- MCP farm (1 container per app)
- Enterprise security
- Observability
- Governance
- Reliability

1. High-level architectuur
MCP client → Gateway → MCP container → Execution engine → Upstream API

OpenAI client → /openai/tools → /openai/execute → MCP executor

1. Modules
- Transport layer
- Tool registry
- Resource registry
- Prompt registry
- Sampling bridge
- Execution engine
- Config loader
- Security layer
- Observability
- OpenAI compat layer

1. Execution engine
- HTTP executor
- retries
- timeouts
- auth injection
- response normalization

1. Security
- API key
- JWT
- upstream allowlist
- DNS rebinding protection
- rate limits

1. Deployment
Per app container:
- raindrop-mcp
- notion-mcp
- airtable-mcp

Gateway ervoor.

1. Acceptance
- MCP connect
- tools werken
- resources werken
- OpenAI compat werkt

(Full version in local architecture repo)

# MCP Server Template — Full Technical Description

## 1) Doel en scope

De MCP Server Template is een **herbruikbare runtime Docker-container** die — op basis van configuratie — een **volwaardige MCP-server** expose’t voor een specifieke upstream API (bv. Raindrop, Notion, Airtable, ClickUp, Google Drive).

De template ondersteunt:

- MCP primitives: **tools, resources, prompts**, optioneel **sampling**
- MCP transports: **Streamable HTTP (primary)** + **SSE (compat)**
- Extra façade: **OpenAI tool-calling compat endpoints** (voor clients die geen MCP spreken)

Ontworpen voor:

- “MCP farm”: 1 container per app (simpel) of multi-app routing (optie)
- Enterprise requirements: security, observability, governance, reliability

---

## 2) High-level architectuur

### 2.1 Request path

**MCP-native pad**

1. AI client → Gateway (IBM/Kong/Nginx/Cloudflare) → /mcp (of /sse)
2. Transport layer → session lifecycle + cancellation
3. MCP router → tool/resource/prompt/sampling handlers
4. Execution engine → upstream API calls
5. Normalizer → MCP response

**OpenAI-compat pad**

1. AI client → Gateway → /openai/tools (tool discovery)
2. AI client → /openai/execute (tool call)
3. Intern: map OpenAI call → MCP tool executor → normalize response

---

## 3) Modules en verantwoordelijkheden

### 3.1 Transport Layer

**Verantwoordelijk voor**

- Accepten van MCP connections via:
    - Streamable HTTP endpoint: POST /mcp
    - SSE endpoint: GET /sse
- Session lifecycle, cancellation, progress, backpressure

**Belangrijk**

- Containers zijn stateless (geen harde state vereist)
- Cancellation moet upstream calls kunnen stoppen

---

### 3.2 Capability & Registry Layer

Beheert alles wat “discoverable” is in MCP.

### Tools Registry

- Naam, description
- Input schema (JSON Schema)
- (optioneel) output schema
- Policies per tool (timeouts, retries, rate hints, permissions)

### Resources Registry

- resources/list
- resources/read
- resources/templates/list (URI templates)
- (optioneel) subscriptions + listChanged notifications

Resources bieden veilige “read context” via URI’s zoals:

- raindrop://collections
- notion://page/{id}
- drive://file/{id}

### Prompts Registry

- prompts/list
- prompts/get
- Prompt templates met argument schema en versie

### Sampling (optioneel)

- Server kan de client vragen om LLM output (client-side), met policies:
    - max tokens
    - allowed model hints
    - human approval hooks

---

### 3.3 Config Loader

Laadt en valideert config uit:

- config.yaml/json (server/app policies)
- openapi.yaml/json (optioneel)
- tools.json (gegenereerd of hand-curated)
- secrets via env vars / secret manager

Valideert:

- toolnames uniek en “client-safe” (app.verb_object)
- schema’s correct (required velden, enums, etc.)
- allowlists (hosts, paths) consistent

---

### 3.4 OpenAPI Ingestion & Tool Generation Pipeline

Ondersteunt twee modes:

**Mode A — Curated tools (aanrader)**

- tools gedefinieerd in tools.json of config allowlist
- stabiele toolnames, handmatige beschrijvingen, LLM-proof schema’s

**Mode B — Auto-generated uit OpenAPI**

- generator maakt tooldefs uit endpoints
- filters:
    - include tags / exclude paths
    - max tool count
    - rename rules (consistent naming)
    - schema simplification (oneOf flattening, nullable handling)

Output is altijd: **Tool Definition Set** (JSON), zodat runtime consistent blijft.

---

### 3.5 Execution Engine (Tool & Resource Executors)

**Kernlaag** die calls uitvoert.

**Features**

- HTTP client met:
    - timeouts per tool
    - retry/backoff (429/5xx)
    - circuit breaker (per upstream host)
    - concurrency limits (global + per tool)
- Auth injectie:
    - API key / bearer token
    - OAuth2 refresh (optioneel)
    - service account flows (bv. Google)
- Request builder:
    - path params, query params, body mapping
    - header templating
- Response normalizer:
    - upstream JSON/text/binary → MCP response content
    - consistente error structuur

**Intern result contract**

- ok: true, result, meta
- ok: false, error: { code, message, details }, meta

Dit interne contract wordt vertaald naar:

- MCP tool result format
- OpenAI tool result format (façade)

---

### 3.6 Security Layer

### Client → MCP server

Minimaal:

- API key header (X-MCP-KEY)

Optioneel:

- JWT validation (OIDC)
- mTLS (via gateway)
- IP allowlist (via gateway)
- Request size limits

### SSRF/DNS rebinding & Host allowlists

- Host header allowlist
- Upstream allowlist: enkel calls naar ALLOWED_UPSTREAM_HOSTS
- Blokkeer private IP ranges indien upstream hostnames misbruikt worden

### Data hygiene

- Secrets nooit in logs
- Redaction van auth headers en tokens
- Optionele PII filters

---

### 3.7 Observability Layer

- Structured logging:
    - correlation id per request
    - tool name / resource uri
    - upstream latency/status
    - retries/backoff events
- Metrics:
    - call count per tool
    - error rate per upstream
    - latency histograms
- Tracing (optioneel):
    - OpenTelemetry export

---

### 3.8 OpenAI Tool-Compat Façade

Doel: clients zonder MCP toch laten werken.

Endpoints:

- GET /openai/tools
    - tools als OpenAI “function tools” (name/description/parameters JSON Schema)
- POST /openai/execute
    - ontvangt { name, arguments } (arguments kan stringified JSON zijn)
    - voert tool uit via Execution Engine
    - return { ok, tool_result } met JSON output (errors uniform)

Optioneel:

- POST /openai/chat (server-side tool loop)

---

## 4) API/Interface details

### 4.1 MCP endpoints

- POST /mcp → Streamable HTTP transport
- GET /sse → SSE transport

### 4.2 OpenAI compat endpoints

- GET /openai/tools
- POST /openai/execute
- (opt) POST /openai/chat

### 4.3 Health & Ops

- GET /health → basic liveness
- GET /ready → readiness (config loaded; upstream reachable optioneel)
- GET /metrics → Prometheus metrics (optioneel)

---

## 5) Configuratiemodel

### 5.1 Core config (voorbeeldvelden)

- APP_NAME
- BASE_URL
- TOOLS_SOURCE = curated | openapi
- TOOLS_CONFIG_PATH
- OPENAPI_PATH/URL
- ALLOWED_UPSTREAM_HOSTS
- AUTH_MODE = api_key | jwt | none
- MCP_API_KEY
- UPSTREAM_AUTH_TYPE = bearer | api_key | oauth2 | service_account
- UPSTREAM_TOKEN_ENV
- TIMEOUTS, RETRIES, CIRCUIT_BREAKER
- LOG_LEVEL

### 5.2 Tool definition schema (conceptueel)

Per tool:

- name, description
- method, path
- params mapping (path/query/body)
- inputSchema (JSON Schema)
- responseHints (optional: what to return, truncate policy)
- policyOverrides (timeout/retry/concurrency)

### 5.3 Resource definition schema (conceptueel)

- uriPattern
- listHandler (optional)
- readHandler mapping naar upstream endpoints
- mimeType, isBinary, truncation rules
- templates (URI templates)

### 5.4 Prompt schema (conceptueel)

- name, description, argsSchema
- template of messages[]
- version
- optional guardrails / hints

---

## 6) Reliability & performance

### 6.1 Timeouts

- Default tool timeout (bv. 20s)
- Per tool override (bv. search 10s, export 60s)

### 6.2 Retries & backoff

- Retry alleen idempotent (GET) by default
- POST retries enkel als expliciet toegestaan
- Backoff bij 429/503

### 6.3 Circuit breaker

Per upstream host:

- open bij hoge error rate
- half-open probes
- voorkomt cascading failures

### 6.4 Concurrency controls

- Max concurrent calls global
- Max concurrent calls per tool

### 6.5 Response truncation

- Grote payloads begrenzen (bv. 8k–32k chars) met:
    - meta.truncated=true
    - meta.nextPage indien pagination mogelijk

---

## 7) Deployment model

### 7.1 Per-app container (primair)

- raindrop-mcp, notion-mcp, airtable-mcp, ...
- Elke container:
    - eigen secrets
    - eigen allowed upstream
    - eigen toolset config

Voordelen: isolatie, eenvoudig beheer, blast radius klein

### 7.2 Gateway routing

Gateway routeert:

- /raindrop/* → raindrop container
- /notion/* → notion container

Regelt:

- TLS, WAF, rate limiting
- auth (optioneel) en logging

---

## 8) Security governance model

- Least privilege tokens per app
- Tool allowlisting (geen generic fetch any url in prod)
- Audit logs voor tool calls
- Change management: config versie + checksum, immutable artifacts

---

## 9) Extensibility

### 9.1 Plugins

Pluggable modules voor:

- OAuth providers
- Caching (Redis)
- Nieuwe transports (stdio local)
- Custom composed tools (upsert/sync/workflows)

### 9.2 Multi-tenant (future)

- Tenant id in JWT / header
- Per tenant tool visibility + secrets scoping
- Rate limits per tenant

---

## 10) Acceptance criteria (technisch)

- MCP client kan verbinden via /mcp en tools zien en uitvoeren
- Resources en prompts worden correct gelist en gelezen
- OpenAI compat kan tools discoveren en uitvoeren zonder MCP
- SSRF/host allowlist actief
- Structured logs met correlation id en tool naam
- Timeouts/retries werken; upstream errors normaliseren correct
- Container is stateless en schaalbaar achter gateway