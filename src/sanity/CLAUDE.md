# src/sanity/ — CMS Integration Layer

## What Lives Here
- GROQ queries
- DTO transforms
- Sanity client configuration
- Type definitions for CMS data

## Rules
1. All CMS data passes through DTO layer
2. Components receive typed DTOs, never raw Sanity data
3. Queries use banner parameter for filtering — use `banner == $banner` for single-value
   `banner` fields; use `$banner in banners[]` for multi-value `banners` array fields.
   Verify field shape in `sanity-studio/schemas/` before writing queries.
4. Schema changes require migration plan
5. NEVER bypass the DTO layer — raw Sanity documents must not reach components

## Phase 1 Banners
- festival-foods
- hometown-grocers
- (schnucks deferred)

## DTO Pattern
Raw Sanity → Transform → Typed DTO → Component

## Sanity MCP Tools
See `docs/sanity-mcp.md` for the full tool reference.

Rules:
- ALWAYS call `get_schema` before writing GROQ queries or schema code
- Use `query_documents` for validation; `semantic_search` for content discovery
- Load `get_sanity_rules` (sanity-schema rule) before writing any schema code
