# nw-site

Customer-facing services site for Neutral Working at neutralworking.com. Astro + Tailwind v4, no client JS, deployed via Coolify.

## Dev

```sh
pnpm dev      # localhost:4321
pnpm build    # ./dist/
pnpm preview  # preview build locally
```

## Structure

```
src/
  components/   BaseLayout, ServiceCard, CaseStudy, PriceTable, Pill, CTA
  layouts/      BaseLayout.astro
  pages/        file-based routing
  styles/       global.css (Tailwind v4 @theme tokens)
public/         static assets
```

`/styleguide` renders every component — not linked from the public site.
