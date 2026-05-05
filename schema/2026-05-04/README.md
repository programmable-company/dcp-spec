# Schema — Declarative Company Protocol (DCP) `2026-05-04`

TypeScript source of truth and generated JSON Schema for the **Declarative Company Protocol** (DCP) entity model, draft `2026-05-04`. DCP is the data-layer specification of the Programmable Company project; the prose specification is in [`../../specification/2026-05-04/`](../../specification/2026-05-04/).

## What is normative

The TypeScript declarations under [`src/`](src/) are the **normative source of truth**. The generated [`schema.json`](schema.json) is a build product, included in the repository so consumers that cannot run the TypeScript toolchain can still validate artifacts.

If `schema.json` and `src/` disagree, the TypeScript wins. Open a SEP if you find a divergence.

## Layout

| Path | Purpose |
| --- | --- |
| [`schema.ts`](schema.ts) | Canonical entry point; re-exports everything in [`src/`](src/). |
| [`src/index.ts`](src/index.ts) | Internal entry. |
| [`src/primitives.ts`](src/primitives.ts) | Primitive aliases (`Sha256Hex`, `Iso8601Date`, …). |
| [`src/reference.ts`](src/reference.ts) | `Reference` — content-addressed pointer. |
| [`src/identifier.ts`](src/identifier.ts) | `Identifier` — typed identifier with issuer and scope. |
| [`src/capability.ts`](src/capability.ts) | `Capability` — opt-in module declaration. |
| [`src/document.ts`](src/document.ts) | `Document`, `Provenance`, `ContentInline`, `ContentByReference`. |
| [`src/event.ts`](src/event.ts) | `Event` — append-only log entry. |
| [`src/entity.ts`](src/entity.ts) | `Entity` — declarative projection at HEAD. |
| [`src/conformance.ts`](src/conformance.ts) | `Conformance` — repository-level metadata file. |
| [`schema.json`](schema.json) | JSON Schema generated from `src/`. |
| [`scripts/generate.ts`](scripts/generate.ts) | Generator script. |

## Building

```sh
npm install
npm run typecheck      # tsc --noEmit
npm run build:schema   # regenerate schema.json
npm run check          # both
```

The generator targets JSON Schema draft-07 (the dialect emitted by `ts-json-schema-generator`). Consumers that prefer 2020-12 can convert mechanically; the constraints expressed are within the common subset.

## Conventions

- All `string`-aliased primitives carry a `pattern` that validators are expected to enforce. The TypeScript types do not enforce these patterns at compile time; they are documentation that flows into the generated schema.
- Optional fields use `?:`. The generated schema omits them from `required` accordingly.
- Object types do not currently set `additionalProperties: false`. Strict-validation behavior is left to the prose specification (`specification/2026-05-04/`); the generated schema is permissive to allow forward-compatible extension by future drafts.
- Package name is `@programmable-company/dcp-2026-05-04` — the org's npm scope, the spec's abbreviation, the dated version.

## Versioning

This schema directory is frozen alongside the corresponding specification draft (`specification/2026-05-04/`). Future DCP drafts live in sibling directories (`schema/<DATE>/`); they MUST NOT modify this directory once published. See `specification/2026-05-04/07-versioning.md`.

When the future programmable-layer specification ships, it will live alongside DCP drafts under its own naming, not in this directory.
