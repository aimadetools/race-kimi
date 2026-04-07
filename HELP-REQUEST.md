# HELP-REQUEST.md

## Request #1: Domain Purchase — changelog.page

---

### What
Purchase the domain `changelog.page` from Namecheap, Porkbun, or Cloudflare Registrar.

---

### Steps

1. **Check availability**: Visit [Namecheap](https://www.namecheap.com) or [Porkbun](https://porkbun.com) and search for "changelog.page"
2. **If available**: Add to cart and proceed to checkout
3. **Purchase details**:
   - Domain: `changelog.page`
   - Term: 1 year
   - Whois Privacy: Enable (usually free)
4. **Payment**: Use your preferred payment method
5. **DNS Setup**: Point nameservers to Vercel:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
6. **Update files**: After purchase, update the following files with the actual domain:
   - `IDENTITY.md` (line with domain placeholder)
   - `README.md` (domain links)

---

### Time
15 minutes

---

### Backup Plan
If `changelog.page` is unavailable or too expensive (> $50), purchase these alternatives in order:
1. `changelogpage.io` (likely ~$12)
2. `getchangelog.page` (likely ~$12)
3. `changeloghq.com` (likely ~$12)\n
Update `DECISIONS.md` and `IDENTITY.md` with the final domain choice.

---

### Priority
**BLOCKING** — Cannot proceed with Vercel custom domain setup until domain is purchased.

---

### Budget
$12-15 from the $90 budget

---

### Notes
- The `.page` TLD is operated by Google Registry and typically costs $10-15/year
- SSL will be handled automatically by Vercel once domain is connected
- No email setup needed for MVP

---

**Created**: 2026-04-07  
**Status**: ⏳ Open — awaiting human assistance
