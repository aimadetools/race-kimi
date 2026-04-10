# Changelog Template: API Documentation

> **Use this for:** API and developer-facing changes  
> **Best for:** Developer tools, API-first products, technical platforms  
> **Tone:** Clear, precise, action-oriented

---

```yaml
---
date: 2026-04-10
version: "2.4.0"
title: "API v2.4.0 Release"
category: feature
tags: ["api", "breaking-change", "deprecation"]
api_version: "2026-04-10"
---
```

---

## ⚠️ Breaking Changes

### Changed: Endpoint Behavior

**What changed:** Brief description of the change

**Impact:** Who is affected and how

**Migration:**
```javascript
// Before
const response = await api.oldEndpoint(params);

// After  
const response = await api.newEndpoint({
  ...params,
  newRequiredParam: value
});
```

**Timeline:** 
- Change effective: April 10, 2026
- Old endpoint deprecated: June 10, 2026  
- Old endpoint removed: August 10, 2026

---

## 🚀 New Features

### New Endpoint: `/v2/resources`

Create and manage resources with the new REST endpoint.

**Documentation:** [API Reference →](link-to-docs)

**Example request:**
```bash
curl -X POST https://api.yourservice.com/v2/resources \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Resource",
    "type": "premium",
    "settings": {
      "autoScale": true
    }
  }'
```

**Example response:**
```json
{
  "id": "res_123456",
  "name": "My Resource",
  "type": "premium",
  "status": "active",
  "created_at": "2026-04-10T14:30:00Z",
  "url": "https://api.yourservice.com/v2/resources/res_123456"
}
```

---

### Webhook: `resource.updated` Event

New webhook event fires when resource configuration changes.

**Payload example:**
```json
{
  "event": "resource.updated",
  "timestamp": "2026-04-10T14:30:00Z",
  "data": {
    "resource_id": "res_123456",
    "changes": ["settings.autoScale", "plan"],
    "previous_values": {
      "plan": "basic"
    }
  }
}
```

---

## ✨ Improvements

### Performance

- **API Response Time**: P95 latency reduced by 40% (from 120ms to 72ms)
- **Rate Limiting**: New headers for better quota management
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1649092800
  ```

### Developer Experience

- **Error Messages**: More descriptive validation errors with field-level details
- **SDK Updates**: Python SDK v3.2.0 and Node.js SDK v2.1.0 released
- **Postman Collection**: Updated with new endpoints

---

## 🐛 Bug Fixes

### Fixed: Pagination Cursor Issue

**Issue:** `next_cursor` was returning invalid value on last page
**Fix:** Cursor now correctly returns `null` when no more results
**Affected versions:** v2.3.0 - v2.3.9

### Fixed: Webhook Retry Logic

**Issue:** Webhooks failing with 5xx responses weren't being retried
**Fix:** Exponential backoff retry now works correctly

---

## 📚 Documentation Updates

- New guide: [Migrating from v1 to v2](link)
- Updated: [Authentication best practices](link)
- Added: Code examples in Go and Rust

---

## 📅 Deprecation Notice

### `/v1/endpoints` (Sunset: Dec 31, 2026)

The v1 API will be discontinued on December 31, 2026. Please migrate to v2.

**Migration guide:** [v1 to v2 Migration →](link)

**Support:** migration@yourcompany.com

---

## 🔗 Resources

- [Full API Reference](https://docs.yourservice.com/api)
- [Postman Collection](https://docs.yourservice.com/postman)
- [SDKs & Tools](https://docs.yourservice.com/sdks)
- [Status Page](https://status.yourservice.com)

---

## Writing Tips for API Changelogs

✅ **DO:**
- Lead with breaking changes (developers need to know immediately)
- Include code examples for every new feature
- Specify exact dates for deprecations
- Link to relevant documentation
- Include migration paths for changes

❌ **DON'T:**
- Use marketing language ("revolutionary", "game-changing")
- Hide breaking changes in minor releases
- Forget to mention which versions are affected
- Skip the "why" for major changes

---

*Template by [Changelog.page](https://changelog.page) — Beautiful changelogs for SaaS products*
