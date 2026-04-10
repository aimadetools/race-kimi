# Changelog.page API Documentation

The Changelog.page API allows you to programmatically manage your changelog entries. Perfect for integrating with your existing workflow, automating releases, or building custom tools.

## Base URL

```
https://changelog.page/api/v1
```

## Authentication

All API requests require an API key. Include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

To get an API key, upgrade to the Team plan and generate one from your dashboard.

## Rate Limits

- **Team Plan**: 1,000 requests per hour
- **Enterprise**: 10,000 requests per hour

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Endpoints

### Entries

#### List All Entries

```http
GET /entries
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Number of entries to return (1-100, default: 20) |
| `offset` | integer | Number of entries to skip (default: 0) |
| `category` | string | Filter by category (feature, bugfix, security, improvement, announcement) |
| `tag` | string | Filter by tag |
| `search` | string | Search in title and content |

**Response:**

```json
{
  "data": [
    {
      "id": "2026-04-09-api-launch",
      "title": "API v1 Launch",
      "date": "2026-04-09",
      "category": "feature",
      "tags": ["api", "automation"],
      "excerpt": "Programmatically manage your changelog...",
      "url": "https://your-domain.com/changelog/2026-04-09-api-launch",
      "published": true,
      "created_at": "2026-04-09T10:00:00Z",
      "updated_at": "2026-04-09T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 20,
    "offset": 0,
    "has_more": true
  }
}
```

#### Get Single Entry

```http
GET /entries/:id
```

**Response:**

```json
{
  "id": "2026-04-09-api-launch",
  "title": "API v1 Launch",
  "date": "2026-04-09",
  "category": "feature",
  "tags": ["api", "automation"],
  "content": "# API v1 Launch\n\nWe are excited to announce...",
  "excerpt": "Programmatically manage your changelog...",
  "url": "https://your-domain.com/changelog/2026-04-09-api-launch",
  "published": true,
  "metadata": {
    "author": "Team Changelog",
    "featured_image": null
  },
  "created_at": "2026-04-09T10:00:00Z",
  "updated_at": "2026-04-09T10:00:00Z"
}
```

#### Create Entry

```http
POST /entries
```

**Request Body:**

```json
{
  "title": "New Feature Announcement",
  "date": "2026-04-10",
  "category": "feature",
  "tags": ["ui", "enhancement"],
  "content": "# New Feature\n\nWe are launching...",
  "published": true,
  "metadata": {
    "author": "Product Team"
  }
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Entry title |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `category` | string | Yes | One of: feature, bugfix, security, improvement, announcement |
| `content` | string | Yes | Markdown content |
| `tags` | array | No | Array of tag strings |
| `published` | boolean | No | Whether to publish immediately (default: true) |
| `metadata` | object | No | Additional metadata (author, featured_image, etc.) |

#### Update Entry

```http
PATCH /entries/:id
```

#### Delete Entry

```http
DELETE /entries/:id
```

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-04-09T10:00:00Z"
}
```

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request is invalid",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}
```

**HTTP Status Codes:**

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

## SDKs and Libraries

Official SDKs coming soon:

- JavaScript/TypeScript
- Python
- Ruby
- Go

## Examples

### cURL

```bash
# List entries
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://changelog.page/api/v1/entries

# Create entry
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Feature",
    "date": "2026-04-10",
    "category": "feature",
    "content": "# New Feature\n\nDetails here..."
  }' \
  https://changelog.page/api/v1/entries
```

### JavaScript

```javascript
const client = new ChangelogClient('YOUR_API_KEY');

// List entries
const entries = await client.entries.list({ limit: 10 });

// Create entry
const entry = await client.entries.create({
  title: 'New Feature',
  date: '2026-04-10',
  category: 'feature',
  content: '# New Feature\n\nDetails here...'
});
```

### Python

```python
from changelog import Client

client = Client('YOUR_API_KEY')

# List entries
entries = client.entries.list(limit=10)

# Create entry
entry = client.entries.create(
    title='New Feature',
    date='2026-04-10',
    category='feature',
    content='# New Feature\n\nDetails here...'
)
```

## Webhook Payloads

When a webhook is triggered, it sends a POST request to your URL:

```json
{
  "event": "entry.created",
  "timestamp": "2026-04-09T10:00:00Z",
  "data": {
    "id": "2026-04-09-new-feature",
    "title": "New Feature",
    "url": "https://your-domain.com/changelog/2026-04-09-new-feature"
  }
}
```

## Changelog

### v1.0.0 (2026-04-09)

- Initial API release
- CRUD operations for entries
- Category and tag management
- Webhook support
- Rate limiting
