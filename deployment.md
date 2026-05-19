# Deployment — Neutral Working Site

Server: Hetzner CAX31 — 167.235.15.94
Access: `ssh root@167.235.15.94 -i ~/.ssh/coolify_hetzner`
Coolify: https://167.235.15.94:8000 (v4.0.0-beta.470)
Reverse proxy: Traefik (already running, handles SSL via Let's Encrypt)

---

## 1. Coolify — nw-site static deploy

In the Coolify dashboard:

1. **New Project** → name it `neutralworking-site`
2. **New Resource** → Git Repository → GitHub → `neutralworking/nw-site`
3. **Branch**: `main`
4. **Build pack**: Nixpacks (detects Astro automatically) or Static HTML
5. **Build command**: `pnpm install --frozen-lockfile && pnpm build`
6. **Publish directory**: `dist`
7. **Domain**: `neutralworking.com` and `www.neutralworking.com`
8. Enable **auto-deploy on push to main**
9. Let's Encrypt SSL: enabled (Traefik handles this automatically once DNS resolves)

www redirect: set `www.neutralworking.com` as a redirect to `neutralworking.com` (canonical is apex).

---

## 2. DNS — Cloudflare

Add these records (proxy OFF initially until SSL is confirmed, then re-enable):

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | @ | 167.235.15.94 | DNS only → then Proxied |
| A | www | 167.235.15.94 | DNS only → then Proxied |
| A | plausible | 167.235.15.94 | DNS only → then Proxied |
| A | cal | 167.235.15.94 | DNS only → then Proxied |

After Coolify issues the Let's Encrypt cert and the site is confirmed over HTTPS, switch all four to Proxied.

---

## 3. Plausible — self-hosted analytics

Deploy via Coolify → Docker Compose. Use the official `plausible/community-edition` repo.

Create a new resource → Docker Compose → paste the following:

```yaml
version: "3.3"
services:
  plausible_db:
    image: postgres:16-alpine
    restart: always
    volumes:
      - plausible_db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

  plausible_events_db:
    image: clickhouse/clickhouse-server:24.3.3.102-alpine
    restart: always
    volumes:
      - plausible_events_db_data:/var/lib/clickhouse
      - plausible_events_db_logs:/var/log/clickhouse-server
    ulimits:
      nofile:
        soft: 262144
        hard: 262144

  plausible:
    image: ghcr.io/plausible/community-edition:v2
    restart: always
    command: sh -c "sleep 10 && /entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"
    depends_on:
      - plausible_db
      - plausible_events_db
    ports:
      - "127.0.0.1:8001:8000"
    environment:
      BASE_URL: https://plausible.neutralworking.com
      SECRET_KEY_BASE: ${SECRET_KEY_BASE}
      DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@plausible_db:5432/plausible
      CLICKHOUSE_DATABASE_URL: http://plausible_events_db:8123/plausible
      DISABLE_REGISTRATION: true

volumes:
  plausible_db_data:
  plausible_events_db_data:
  plausible_events_db_logs:
```

**Environment variables to set in Coolify:**
- `POSTGRES_PASSWORD` — generate a strong random string
- `SECRET_KEY_BASE` — generate with: `openssl rand -base64 64 | tr -d '\n'`

**Domain**: `plausible.neutralworking.com` → port 8001

After deploy:
1. Visit `https://plausible.neutralworking.com`
2. Create account (registration is then disabled by `DISABLE_REGISTRATION: true`)
3. Add site: `neutralworking.com`
4. The tracking script in BaseLayout is already wired — verify pageviews appear on a test visit

---

## 4. Cal.com — self-hosted booking

Deploy via Coolify → Docker Compose:

```yaml
version: "3.3"
services:
  cal_db:
    image: postgres:16-alpine
    restart: always
    volumes:
      - cal_db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: cal
      POSTGRES_PASSWORD: ${CAL_DB_PASSWORD}
      POSTGRES_DB: cal

  cal:
    image: calcom/cal.com:latest
    restart: always
    depends_on:
      - cal_db
    ports:
      - "127.0.0.1:3002:3000"
    environment:
      DATABASE_URL: postgresql://cal:${CAL_DB_PASSWORD}@cal_db:5432/cal
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      CALENDSO_ENCRYPTION_KEY: ${CALENDSO_ENCRYPTION_KEY}
      NEXTAUTH_URL: https://cal.neutralworking.com
      NEXT_PUBLIC_WEBAPP_URL: https://cal.neutralworking.com
      EMAIL_FROM: hello@neutralworking.com
      EMAIL_SERVER_HOST: ${SMTP_HOST}
      EMAIL_SERVER_PORT: ${SMTP_PORT}
      EMAIL_SERVER_USER: ${SMTP_USER}
      EMAIL_SERVER_PASSWORD: ${SMTP_PASSWORD}

volumes:
  cal_db_data:
```

**Environment variables:**
- `CAL_DB_PASSWORD` — generate random
- `NEXTAUTH_SECRET` — `openssl rand -base64 32`
- `CALENDSO_ENCRYPTION_KEY` — `openssl rand -base64 32` (must be exactly 32 chars after decode)
- `SMTP_*` — use neutralworking.com email SMTP credentials

**Domain**: `cal.neutralworking.com` → port 3002

After deploy:
1. Visit `https://cal.neutralworking.com/auth/setup` to create admin account (use `hello@neutralworking.com`)
2. Set username to `luke`
3. Create event type: **Discovery call**, 30 minutes, slug `discovery`
4. Add custom questions: "What's going on?" (optional, long text)
5. The contact page embed is already pointed at `cal.neutralworking.com/luke/discovery` — no code change needed

---

## 5. Post-deploy checklist

- [ ] `https://neutralworking.com` loads over HTTPS
- [ ] `https://www.neutralworking.com` redirects to apex
- [ ] Push a trivial commit to `main`, confirm auto-redeploy triggers and change appears within 5 minutes
- [ ] `https://plausible.neutralworking.com` loads, pageview fires on site visit
- [ ] `https://cal.neutralworking.com/luke/discovery` loads calendar
- [ ] Contact page popup button opens the Cal.com overlay
- [ ] Book a test slot — confirm confirmation email arrives at `hello@neutralworking.com`
- [ ] SSL Labs: `https://www.ssllabs.com/ssltest/analyze.html?d=neutralworking.com` — target grade A
- [ ] All pages return 200 (`curl -sI https://neutralworking.com/services/backlog-rescue`)
- [ ] 404 page renders for an unknown path

---

## Resource usage (at time of deploy)

- Disk: 33G used / 49G total — 14G free. ClickHouse will grow slowly with low traffic.
- RAM: 8G used / 62G total — headroom is ample.
- Monitor disk after 30 days; ClickHouse retention defaults are fine for low-traffic.
