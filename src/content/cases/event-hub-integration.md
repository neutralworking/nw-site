---
title: "CRM event routing architecture"
headline: "Routing CRM events to brand-specific databases across multiple casinos without downtime."
summary: "End-to-end architecture for routing CRM events to brand-specific SQL databases, with a zero-downtime hard-switch plan."
order: 3
context: "An iGaming agency needed to replace a legacy CRM event routing system with an event streaming pipeline. Events from multiple casino brands needed to land in brand-specific SQL databases for downstream use — reporting, player segmentation, and coupon click tracking. The migration had to happen brand-by-brand without taking any of them offline."
problem: "These migrations usually fail at the consumer-side switching. Producers are easy. Consumers — the systems reading the events — are where dependencies live, and a hard switch on the wrong day takes a brand's CRM down. The team had a working architecture sketch but no rollout plan."
what_i_did:
  - "Worked with the data pipeline owner to validate the producer-side architecture"
  - "Designed a brand-by-brand hard-switch rollout plan with consumer-side switching managed in sequence"
  - "Defined the schema for the coupon click log table and how it would join to downstream redemption data — flagging the open joinability question for resolution before the dashboard work"
  - "Mapped downstream consumer dependencies for each brand so cutover order was driven by risk, not convenience"
  - "Documented the rollback procedure per brand"
outcome:
  - "All brands migrated with zero unplanned downtime"
  - "The brand-by-brand sequence gave the team learnings from each cutover that improved the next"
  - "The architecture is now the foundation for downstream features including coupon click tracking and the planned reporting dashboard"
  - "Joinability question with the redemption platform raised early enough to influence the dashboard scope"
tools:
  - "Azure Event Hub"
  - "SQL"
  - "Linear"
  - "AWS QuickSight"
tags:
  - "Architecture"
  - "Integration"
related_services:
  - "ai-operations-setup"
  - "product-clarity-sprint"
---
