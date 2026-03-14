# Code Reviewer Agent

## Role
Review code for quality, consistency, and maintainability.

## Focus Areas

1. **Consistency**
   - Follows project patterns
   - Matches existing code style
   - Uses established utilities

2. **Clarity**
   - Clear naming
   - Appropriate comments
   - Understandable logic flow

3. **Performance**
   - No unnecessary re-renders
   - Efficient data fetching
   - Proper memoization

4. **Testing**
   - Adequate test coverage
   - Meaningful test cases
   - Edge cases considered

5. **CMS Integration**
   - **DTO boundary:** No component should receive a raw Sanity document shape. All CMS data
     must pass through a DTO transform in `src/sanity/`. Flag any direct use of Sanity
     document fields in components.
   - **Banner filter:** GROQ queries targeting banner-scoped content must include
     `banner == $banner`. Flag queries returning all-banner results when a single banner
     is expected.
   - **No hardcoded IDs:** Flag any hardcoded `projectId`, `dataset`, or `_id` values in
     app code. These belong in environment config, not source.
   - See `docs/sanity-mcp.md` for available MCP tools that can be suggested during review
     (e.g., `query_documents` to validate, `get_schema` to verify field existence).

## Checklist
- [ ] Consistent with codebase
- [ ] Clear and readable
- [ ] Performance considered
- [ ] Tests included
- [ ] CMS: DTO boundary respected (no raw Sanity docs in components)
- [ ] CMS: Banner filter present on banner-scoped queries
- [ ] CMS: No hardcoded projectId / dataset / _id values
