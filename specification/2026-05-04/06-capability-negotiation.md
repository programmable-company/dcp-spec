# 06 — Capability negotiation

A Programmable Company is more than the substrate types defined in [§03](03-entity-model.md). Real entities have governance, accounting obligations, employment relationships, mandate structures — and each of those is a separate body of model and behavior. To keep the core specification small while permitting that richness, Programmable Company uses a **capability-negotiation** pattern: every entity declares which capabilities (modules) it exposes, and consumers act according to that declaration.

This section defines how capabilities are declared, discovered, and negotiated. It does **not** define any non-core capability — those live in their own module specifications. It defines the substrate for them.

## Mandatory and optional capabilities

There are exactly two **mandatory** capabilities at the `2026-05-04` draft:

| Capability | Purpose |
| --- | --- |
| `core/identity` | The Entity, Identifier, and naming model (this specification, §03). |
| `core/lifecycle` | The `core.lifecycle.*` event vocabulary: formed, renamed, identifier-added, identifier-revoked, capability-added, capability-removed, dissolved. |

Every conformant `entity.json` MUST declare both, at major version 1, in `capabilities`. A repository missing either is non-conformant.

All other capabilities are **optional**. A repository MAY declare any number of them, in any combination. The `2026-05-04` draft does not specify any optional capabilities; the namespaces below are reserved for future module specifications:

| Reserved namespace | Anticipated subject |
| --- | --- |
| `accounting/*` | Chart of accounts, ledger events, financial statements. |
| `compliance/*` | Tax, statutory filings, regulator-facing artifacts. |
| `people/*` | Directors, officers, employees, mandates. |
| `payments/*` | Bank-account references, payment instructions. |
| `governance/*` | Bylaws, resolutions, voting. |
| `treasury/*` | Cash management, intercompany transfers. |
| `attestations/*` | Third-party attestations attached to the entity. |

Reservation does not commit this specification or any future foundation to any particular module shape. It only guarantees that the core specification will not allocate these names for unrelated purposes.

## Declaration

Capabilities are declared in two places, in this order of authority:

1. **`Entity.capabilities`** in `entity.json` — authoritative.
2. **`.programmable-company/capabilities.json`** — discovery cache.

Both are arrays of `{ id, version, params? }` objects. The cache MUST be a faithful mirror of the Entity declaration: tooling regenerates the cache whenever `Entity.capabilities` changes, by a `core.lifecycle.capability-added` or `core.lifecycle.capability-removed` event. Consumers that rely on the cache MUST verify it against `Entity.capabilities` if their action depends on the result.

Adding a capability is a `core.lifecycle.capability-added` event whose payload is the capability declaration:

```json
{
  "id": "01HXM1ABCD…",
  "type": "core.lifecycle.capability-added",
  "timestamp": "2026-05-10T08:00:00Z",
  "actor": "kid:ee:smart-id:PNOEE-…#1",
  "parent": { "hash": "…", "hashAlg": "sha-256" },
  "payload": {
    "capability": {
      "id": "accounting/v1",
      "version": "1.0.0"
    }
  }
}
```

Removing a capability is a `core.lifecycle.capability-removed` event whose payload identifies the capability `id`. Removal does not retroactively invalidate artifacts produced under the capability while it was active; it asserts that, going forward, the entity does not expose the capability and consumers SHOULD NOT initiate new actions that depend on it.

## Versioning

Capability `version` is semantic ([SemVer](https://semver.org/)). Major version differences are incompatible. Within a major version:

- A consumer MAY rely on any feature documented in any minor version ≤ the declared minor.
- A capability-defining specification MUST NOT remove or repurpose features within a major version. New features go in new minor versions; breaking changes in a new major version.

A consumer that expects `accounting/v1@^1.2.0` and finds an entity declaring `accounting/v1@1.4.7` MAY proceed; the same consumer finding `accounting/v1@2.0.0` MUST NOT proceed without explicit human or operator confirmation, because the capability semantics may have changed.

The mandatory `core/identity` and `core/lifecycle` versions are tied to the specification version. For `2026-05-04`, both are `1.0.0`.

## Negotiation algorithm

A consumer that wants to act on an entity follows this procedure:

1. **Read `Entity.capabilities`** — directly from `entity.json`, not from the cache, if the action depends on the result being authoritative.
2. **Match required capabilities.** For each capability the consumer needs (its "required set"), check that the entity declares the capability at a compatible version (per the SemVer rule above).
3. **If any required capability is missing or incompatible**, the consumer MUST NOT proceed with actions that depend on it. The consumer SHOULD report which capability was missing or incompatible.
4. **If every required capability is satisfied**, the consumer MAY proceed.

The consumer MAY tolerate capabilities it does not understand: a consumer that needs only `core/identity` and `accounting/v1` is not impeded by an entity that *also* declares `payments/v2`. Tolerance does not extend to acting on artifacts that depend on unknown capabilities; the consumer simply ignores them.

The consumer MUST NOT reject a repository solely because it declares a capability the consumer does not recognize. Doing so would penalize entities for being feature-rich.

## What capability semantics do (and do not) imply

A capability declaration says: *the entity is prepared to be acted on under the rules of this capability's specification*. It does not say:

- That every event in `events/` is from this capability's vocabulary. Events from many capabilities coexist in one log.
- That every consumer must understand the capability. Capability-unaware consumers continue to function; they simply cannot use the capability.
- That declaring the capability obliges the entity to perform any specific action. The capability tells consumers what is *available*, not what is *required* of the entity.

## Why this pattern

Capability negotiation lets the core specification stay small. A bare-minimum Programmable Company has only `core/identity` and `core/lifecycle` declared; that is sufficient to be addressable, identifiable, and auditable. Real-world entities will declare more, but they do so on their own terms, on their own timetable, and in their own jurisdiction's flavors.

This is also how the specification grows. A new module specification — say, `accounting/v1` — is published as its own document under its own SEP. Existing entities adopt it by emitting a `core.lifecycle.capability-added` event; consumers that want to act under the new module update their tooling. Neither the core specification nor the existing capabilities of an entity need to change for a new module to land.
