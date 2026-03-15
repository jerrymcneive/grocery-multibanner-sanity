# Sanity MCP Server

The Sanity MCP (Model Context Protocol) server lets AI assistants interact directly with Sanity
projects — querying content, managing documents, working with schemas, and more — without leaving
your editor or coding environment.

## What It Does

| Category | Capabilities |
|---|---|
| **Content Queries** | Execute GROQ queries against any dataset |
| **Document CRUD** | Create (JSON or Markdown), patch, publish, unpublish, discard drafts |
| **Schema** | Retrieve workspace schemas, deploy schema types to production |
| **Releases** | Create document versions, manage scheduled release workflows |
| **Media / AI** | Generate images for document fields; transform existing images asynchronously |
| **Semantic Search** | Query embeddings indices for meaning-based content lookup |
| **Project Admin** | Create datasets, configure CORS origins, manage projects |
| **Docs & Rules** | Search/read Sanity docs in-context; load best-practice dev rules |
| **Migration** | Access CMS migration guides; move content to updated schemas |

## Common Use Cases

- **Content management** — query, create, and update documents without opening Sanity Studio
- **Schema-driven development** — retrieve the current schema before writing queries or code to
  avoid type mismatches
- **Release workflows** — stage document versions for a scheduled release and preview content as it
  will appear when published
- **AI-assisted media** — generate or transform images directly on document fields using natural
  language
- **Localization** — add locale fields to document types and migrate existing content to the new
  structure
- **CMS migration** — use the migration guide tool when moving content from another platform
- **Semantic search** — find content by meaning rather than exact text (requires embeddings index)

## Setup

```bash
# Quickest path — auto-configures for your current editor
npx sanity@latest mcp configure
```

Or add the hosted server manually to your editor's MCP config:

```json
{
  "mcpServers": {
    "sanity": {
      "command": "npx",
      "args": ["-y", "sanity@latest", "mcp"],
      "env": {
        "SANITY_AUTH_TOKEN": "<your-token>"
      }
    }
  }
}
```

`SANITY_AUTH_TOKEN` is optional; OAuth is used by default.

Supported editors: Claude Code, VS Code, Cursor, v0, Lovable, Replit, OpenCode.

## Key Tools (42 total)

`query_documents` · `get_schema` · `create_documents_from_json` · `create_documents_from_markdown`
· `patch_document_from_json` · `patch_document_from_markdown` · `publish_documents`
· `unpublish_documents` · `discard_drafts` · `create_version` · `generate_image`
· `transform_image` · `semantic_search` · `list_projects` · `create_dataset`
· `deploy_schema` · `migration_guide` · `search_docs` · `get_sanity_rules`

Full tool list: https://www.sanity.io/docs/ai/mcp-server
