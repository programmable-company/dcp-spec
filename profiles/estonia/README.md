# Estonia profile

This directory contains the Estonia jurisdictional profile for **Declarative Company**, the data-layer specification of the Programmable Company project. It binds the jurisdiction-neutral core specification (under [`specification/<DATE>/`](../../specification/)) to Estonian law, registries, and digital-state infrastructure.

## Purpose

The core specification leaves jurisdictional details deliberately abstract: legal forms, identifier types, registry resolution, trust anchors, and identity-binding semantics are profile-defined. The Estonia profile fills these in for entities registered in the Republic of Estonia.

The profile is the jurisdiction-specific layer that makes a Declarative Company *operational* in Estonia. A repository declaring `Entity.profile = "estonia"` MUST satisfy both the core specification and the additional requirements set out in this profile.

## Why Estonia first

The Programmable Company project is being drafted Estonia-first because the preconditions are operational here rather than aspirational:

- **Legal-person identity** is state-issued (registrikood) and stable.
- **Personal identity** is cryptographic and universal — Smart-ID, Mobile-ID, ID-card — and produces eIDAS-qualified electronic signatures.
- **State interoperability** runs on X-Road, production infrastructure for over two decades.
- **Tax, registry, and statutory filings** are already API-accessible.

The Estonia profile binds Declarative Company to these primitives. It does not invent new ones.

See [`../../VISION.md`](../../VISION.md) for the longer argument.

## Scope

The profile addresses:

| File | Subject | Status |
| --- | --- | --- |
| [`00-introduction.md`](00-introduction.md) | Profile mechanics; relationship to the core specification; eIDAS context. | Skeleton |
| [`01-legal-forms.md`](01-legal-forms.md) | Permitted `Entity.legalForm` values: OÜ, AS, FIE, MTÜ. | Skeleton |
| [`02-identifiers.md`](02-identifiers.md) | Identifier types: registrikood, EMTAK, KMKR, EUID. | Skeleton |
| [`03-emta-integration.md`](03-emta-integration.md) | e-MTA touchpoints. | Skeleton |
| [`04-x-road.md`](04-x-road.md) | X-Road considerations. | Skeleton |

Skeletons describe *what* will be specified, not *how*. The full profile is a downstream effort scheduled after the core specification stabilizes.

## What this profile is not

- Not a rewrite of Estonian company law. Where this profile and applicable law differ, applicable law governs.
- Not a replacement for RIK, EMTA, or any other state service. The profile binds Declarative Company artifacts to those services; it does not duplicate or supersede them.
- Not the only profile. Other jurisdictions are expected to publish their own profiles under [`profiles/<jurisdiction>/`](../) once the core specification stabilizes.

## Versioning

The profile is versioned independently of the core specification (see [`specification/2026-05-04/07-versioning.md`](../../specification/2026-05-04/07-versioning.md)). At pre-alpha, the profile is dated only by the commit history of this directory. A formal profile-version field will be introduced once the profile reaches first-draft completeness.

## Contributions

Profile-specific contributions follow the same constraints as the core specification (see [`../../GOVERNANCE.md`](../../GOVERNANCE.md)): closed for substantive contributions until the substrate stabilizes.
