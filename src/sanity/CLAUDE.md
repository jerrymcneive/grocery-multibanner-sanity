# src/sanity/ — CMS Integration Layer

## What Lives Here
- GROQ queries
- DTO transforms
- Sanity client configuration
- Type definitions for CMS data

## Rules
1. All CMS data passes through DTO layer
2. Components receive typed DTOs, never raw Sanity data
3. Queries use banner parameter for filtering
4. Schema changes require migration plan

## Phase 1 Banners
- festival-foods
- hometown-grocers
- (schnucks deferred)

## DTO Pattern
Raw Sanity → Transform → Typed DTO → Component
