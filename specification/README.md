# Specification

Specifications under the Programmable Company project live in dated subdirectories under this directory. Each draft is frozen once published; substantive changes go in a new dated directory.

The current specification is **Declarative Company** — the data-layer specification. The future runtime/interaction layer (the *programmable-layer specification*) will be drafted once the data layer stabilizes; it is not in scope for this directory today.

## Drafts

| Date | Specification | Status | Notes |
| --- | --- | --- | --- |
| [`2026-05-04/`](2026-05-04/) | Declarative Company | Pre-alpha | First draft. Defines the data substrate: repository structure, entity model, JCS canonicalization, JWS/JAdES signing, capability negotiation, versioning. |

## Companion artifacts

| Path | Purpose |
| --- | --- |
| [`../schema/<DATE>/`](../schema/) | TypeScript source of truth and generated JSON Schema for each dated draft. |
| [`../profiles/`](../profiles/) | Jurisdiction-specific bindings. The Estonia profile is published in skeleton form. |
| [`../seps/`](../seps/) | Specification Enhancement Proposals — the change-control mechanism. |

## How to read

Start with [`2026-05-04/00-introduction.md`](2026-05-04/00-introduction.md) for the current draft. The remaining sections (00 → 07) build the substrate in the order a producer would construct it. A motivated reader should finish in roughly thirty minutes.

For project-level context (vision, principles, governance), see the [repository root](../README.md).
