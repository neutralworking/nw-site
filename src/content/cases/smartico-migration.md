---
title: "Gamification platform migration"
headline: "Migrating a live casino brand from a legacy gamification platform without losing player progress."
summary: "Migration brief and rollout plan for moving a casino brand from a legacy gamification platform. Risks surfaced before build, not after."
order: 2
context: "A casino brand was moving from a legacy gamification platform to a newer one. The work had been scoped in pieces by different people over several months, with no single document anyone could quote against. Engineering was reluctant to start. The brand team thought it was a copy job."
problem: "Platform migrations of this kind have three failure modes: player progress loss, broken triggers, and stakeholder mismatch on what's actually changing. Without a unified brief, the migration was on track for at least two of those."
what_i_did:
  - "Audited the existing gamification implementation — campaigns, triggers, player segments, reward types"
  - "Mapped each existing component to its equivalent on the new platform, flagging what didn't translate cleanly"
  - "Wrote a single migration brief covering scope, sequencing, data migration, rollback, and out-of-scope items"
  - "Surfaced risks that hadn't been raised — segment definitions that wouldn't survive the migration, triggers that depended on legacy event names, edge cases around in-flight campaigns at cutover"
  - "Coordinated stakeholder sign-off across product, brand, and engineering before build started"
outcome:
  - "Migration brief became the single source of truth referenced through build"
  - "Edge cases caught at spec stage rather than at QA — saving roughly two weeks of rework based on previous similar migrations"
  - "Rollout plan adapted and reused for the second brand with minor edits"
  - "Stakeholder alignment held through to launch, with no scope changes after sign-off"
tools:
  - "Linear"
  - "Figma"
tags:
  - "Product"
  - "Migration"
related_services:
  - "product-clarity-sprint"
  - "fractional-po-retainer"
---
