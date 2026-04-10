# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Auth & Session (Highest Priority)

1. **[2026-04-07] Next.js 16 uses `proxy.ts`, not `middleware.ts`**
   Do instead: Never create `middleware.ts`. The root `proxy.ts` exporting `proxy` and `config` IS the middleware. Having both files causes a fatal conflict.

2. **[2026-04-07] OAuth callback must set cookies on the redirect response directly**
   Do instead: In `/auth/callback/route.ts`, create `NextResponse.redirect()` first, then pass it to `createServerClient` so `setAll` writes cookies onto `response.cookies`. Using `cookies()` from `next/headers` risks Set-Cookie headers not merging into the redirect response.

3. **[2026-04-07] SessionProvider must eagerly call `getSession()` on mount**
   Do instead: Call `supabase.auth.getSession()` in `useEffect` before subscribing to `onAuthStateChange`. Relying solely on the change event can resolve `loading: false, session: null` if the event fires before mount.

4. **[2026-04-07] Corporate SSL proxy blocks Node.js HTTPS (UNABLE_TO_GET_ISSUER_CERT_LOCALLY)**
   Do instead: In `next.config.ts`, set `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` guarded by `NODE_ENV !== 'production'`. In production, use `NODE_EXTRA_CA_CERTS` pointing to the corporate CA cert.

## Routing

5. **[2026-04-07] All default redirects must include the locale prefix**
   Do instead: Never default to `/dashboard`. Always use `` `/${defaultLocale}/dashboard` `` or `` `/${locale}/dashboard` ``. The app only has routes under `/[locale]/`.