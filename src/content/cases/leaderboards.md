---
title: "Multi-brand leaderboard rollout"
headline: "Six casino brands. One feature. Zero missed deadlines."
summary: "Acceptance criteria, QA test plans, and multi-brand release coordination for a gamification feature launch. Shipped on schedule across all six brands."
order: 1
context: "An iGaming agency needed to roll out a leaderboard feature across six casino brands simultaneously. Each brand had its own copy, design tokens, regulatory constraints, and CRM integration. None of them could afford to launch broken."
problem: "Cross-brand features at this scale usually fail one of three ways: scope drifts, QA gets compressed, or translation work blocks release. The team had hit all three on previous rollouts. They needed someone to own the rollout end-to-end without taking development capacity off the build."
what_i_did:
  - "Wrote QA acceptance criteria covering brand-specific edge cases — bonus eligibility, region-locked games, time-zone rollover, leaderboard tiebreakers"
  - "Structured the work in Linear with a consistent ticket taxonomy across all six brands, so the engineering team could pattern-match instead of context-switching"
  - "Coordinated with frontend on translation workflow — English source to French and other locales, with brand-specific copy variants"
  - "Coordinated with the data pipeline owner on the event streaming integration powering the leaderboard standings"
  - "Ran the release sequence brand-by-brand to limit blast radius, with a rollback plan for each"
outcome:
  - "All six brands shipped on schedule"
  - "Zero rollback events across the launch sequence"
  - "The ticket taxonomy and QA acceptance criteria became the template for subsequent multi-brand features"
  - "Translation workflow now reusable for future feature rollouts without re-spec"
tools:
  - "Linear"
  - "YouTrack"
  - "Azure Event Hub"
  - "Figma"
  - "GitHub"
tags:
  - "Product"
  - "QA"
  - "Delivery"
related_services:
  - "ai-operations-setup"
  - "fractional-po-retainer"
---
