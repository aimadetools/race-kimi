# API & Developer Tools Template

> Designed for API platforms, developer tools, and technical products. Emphasizes technical details while maintaining readability.

---

## How to Use This Template

1. Copy this file to your changelog content directory
2. Replace placeholder content with your API updates
3. Update version numbers, endpoints, and code examples
4. Include migration guides for breaking changes
5. Build and deploy

---

## YAML Frontmatter Template

```yaml
---
date: 2026-04-08
title: "API v2.3: Webhooks, Rate Limits & New Endpoints"
categories: ["API", "Developer Experience", "Breaking Changes"]
version: "2.3.0"
api_version: "2026-04-08"
featured: true
---
```

---

## Entry Structure

### 🔌 API Version Header

```markdown
**API Version:** `2026-04-08`  
**Documentation:** [View API Docs](https://docs.example.com/api)  
**Status:** All systems operational
```

---

### 🚀 New Endpoints

#### `POST /v2/resources`
Create a new resource with expanded attribute support.

**New Attributes:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metadata` | object | No | Key-value pairs for custom data |
| `tags` | array | No | String array for categorization |
| `expires_at` | ISO 8601 | No | Auto-expiration timestamp |

**Example Request:**
```bash
curl -X POST https://api.example.com/v2/resources \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Database",
    "metadata": {
      "region": "us-east-1",
      "environment": "production"
    },
    "tags": ["critical", "database"]
  }'
```

**Example Response:**
```json
{
  "id": "res_1234567890",
  "name": "Production Database",
  "metadata": {
    "region": "us-east-1",
    "environment": "production"
  },
  "tags": ["critical", "database"],
  "created_at": "2026-04-08T10:30:00Z",
  "expires_at": null
}
```

---

### ⚡ Improvements

#### Rate Limiting Enhancements
- **Previous:** 100 requests/minute per API key
- **New:** 1,000 requests/minute per API key
- **Burst capacity:** 100 requests/second for 10 seconds

**New Headers:**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1712581200
```

#### Pagination Improvements
- Cursor-based pagination for large datasets
- `Link` headers for easier navigation
- New `?per_page` parameter (max: 100)

---

### 🔧 Breaking Changes

> ⚠️ **Action Required:** These changes affect existing integrations.

#### Deprecated: `GET /v1/legacy-endpoint`
**Removal Date:** 2026-06-08 (60 days notice)

**Migration Path:**
```javascript
// Old (Deprecated)
const response = await fetch('/v1/legacy-endpoint');

// New (Recommended)
const response = await fetch('/v2/resources');
```

#### Changed: Error Response Format
Error responses now follow [RFC 7807](https://tools.ietf.org/html/rfc7807) (Problem Details):

```json
{
  "type": "https://api.example.com/errors/rate-limit-exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "You have exceeded the rate limit of 1000 requests per minute.",
  "instance": "/v2/resources"
}
```

---

### 📊 Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| P50 latency | 120ms | 45ms | 62% faster |
| P99 latency | 890ms | 230ms | 74% faster |
| Error rate | 0.5% | 0.08% | 84% reduction |

---

### 🆕 SDK Updates

**JavaScript SDK v3.2.0**
```bash
npm install @example/sdk@latest
```

- Added TypeScript definitions
- New retry logic with exponential backoff
- Browser bundle size reduced by 40%

**Python SDK v2.1.0**
```bash
pip install example-sdk --upgrade
```

- Async/await support
- Pydantic v2 compatibility
- New resource context managers

---

### 🔐 Security Updates

- API keys now support scoped permissions
- New IP allowlist feature for enterprise plans
- Enhanced audit logging for all write operations

---

## Full Example Entry

```markdown
---
date: 2026-04-08
title: "API v2.3: Webhooks, Rate Limits & New Endpoints"
categories: ["API", "Developer Experience"]
version: "2.3.0"
---

# API v2.3: Webhooks, Rate Limits & New Endpoints

**API Version:** `2026-04-08`  
**Documentation:** [View API Docs](https://docs.example.com/api)  
**Status:** ✅ All systems operational

## 🚀 New Features

### Webhooks: Real-Time Event Delivery
Subscribe to events and receive real-time notifications at your endpoint.

**Supported Events:**
- `resource.created`
- `resource.updated`
- `resource.deleted`
- `billing.invoice.paid`

**Configuration:**
```bash
curl -X POST https://api.example.com/v2/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "url": "https://your-app.com/webhooks",
    "events": ["resource.created", "resource.updated"],
    "secret": "whsec_your_webhook_secret"
  }'
```

**Webhook Payload:**
```json
{
  "id": "evt_1234567890",
  "type": "resource.created",
  "data": { /* resource object */ },
  "created_at": "2026-04-08T10:30:00Z"
}
```

[→ Webhook Documentation](https://docs.example.com/webhooks)

---

## ⚡ Improvements

### 10x Rate Limit Increase
All accounts now have higher default rate limits:

| Plan | Previous | New |
|------|----------|-----|
| Free | 100/min | 500/min |
| Pro | 500/min | 2,000/min |
| Enterprise | 2,000/min | 10,000/min |

### New Query Parameters
- `?include=metadata,tags` - Include related data
- `?fields=id,name,status` - Select specific fields
- `?filter[status]=active` - Filter by field values

---

## 🔧 Breaking Changes

### Authentication Header Format
**Effective:** Immediately  
**Previous versions:** Still supported until 2026-06-08

We now accept both formats:
```http
# New (Preferred)
Authorization: Bearer YOUR_API_KEY

# Old (Deprecated, but still works)
X-API-Key: YOUR_API_KEY
```

---

## 📚 Resources

- [API Reference](https://docs.example.com/api)
- [Webhook Guide](https://docs.example.com/webhooks)
- [SDK Documentation](https://docs.example.com/sdks)
- [Postman Collection](https://docs.example.com/postman)

---

*Questions? [Contact Developer Support](mailto:dev-support@example.com)*
```

---

## Tips for This Template

✅ **DO:**
- Always include code examples in multiple languages
- Document breaking changes clearly with migration paths
- Provide timeline for deprecated features
- Include performance metrics when relevant
- Link to complete documentation

❌ **DON'T:**
- Make breaking changes without 30+ days notice
- Forget to update SDKs when API changes
- Skip validation of code examples
- Use vague language like "improved performance" without numbers

---

*Template provided by [Changelog.page](https://changelog.page)*
