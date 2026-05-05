# Declarative Company Protocol — specification draft `2026-05-04`

This directory contains the prose specification for the **Declarative Company Protocol** (DCP), draft `2026-05-04`. DCP is the data-layer specification of the Programmable Company project; it pairs with the schema under [`../../schema/2026-05-04/`](../../schema/2026-05-04/), which is the TypeScript and JSON Schema source of truth.

A future programmable-layer specification, under the same project, will define runtime / interaction behavior over DCP artifacts. That layer is out of scope here.

## Status

**Pre-alpha draft.** Frozen by date once published; superseded by future dated drafts. No backward-compatibility commitments until the specification reaches a tagged version.

## Reading order

| File | Subject |
| --- | --- |
| [`00-introduction.md`](00-introduction.md) | What this draft is, scope, conformance levels. |
| [`01-conventions.md`](01-conventions.md) | RFC 2119 keywords, terminology, notation. |
| [`02-repository-structure.md`](02-repository-structure.md) | What files and directories make a DCP repository. |
| [`03-entity-model.md`](03-entity-model.md) | Entity, Identifier, Capability, Document, Event, Reference. |
| [`04-canonicalization.md`](04-canonicalization.md) | JCS application; what gets canonicalized. |
| [`05-signing.md`](05-signing.md) | JWS / JAdES profile, signature placement, verification. |
| [`06-capability-negotiation.md`](06-capability-negotiation.md) | How capabilities are declared and discovered. |
| [`07-versioning.md`](07-versioning.md) | Spec versioning, conformance declaration, deprecation. |

A motivated reader should be able to finish the draft top to bottom in roughly thirty minutes.

## Cross-references

- TypeScript types: [`../../schema/2026-05-04/src/`](../../schema/2026-05-04/src/) — normative.
- Generated JSON Schema: [`../../schema/2026-05-04/schema.json`](../../schema/2026-05-04/schema.json) — convenience.
- Estonia profile (skeleton): [`../../profiles/estonia/`](../../profiles/estonia/).
- Specification Enhancement Proposals: [`../../seps/`](../../seps/).
