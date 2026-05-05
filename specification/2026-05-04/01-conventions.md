# 01 — Conventions

## Normative keywords

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [BCP 14](https://www.rfc-editor.org/info/bcp14) ([RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174)) when, and only when, they appear in all capitals.

These keywords carry their normal English meaning when not in all capitals, and impose no normative requirement.

## Normative versus informative content

Sections, paragraphs, examples, and tables in this specification are **normative** unless explicitly marked otherwise. Material introduced as "Note:", "Example:", "Rationale:", or fenced under a heading containing "(informative)" is informative; it explains, motivates, or illustrates normative content but imposes no requirement of its own.

The schema package at [`schema/2026-05-04/`](../../schema/2026-05-04/) is normative. The TypeScript source under `src/` is the source of truth; the generated `schema.json` is a build product included for convenience. If they disagree, the TypeScript wins, and the divergence is a defect.

## Terminology

The following terms have specific meanings in this specification. They are introduced fully in the sections noted, but defined here for cross-reference.

| Term | Meaning | Defined in |
| --- | --- | --- |
| **Programmable Company** | The project / organization developing this and future related specifications. Not a noun used to describe a single conforming company in this draft. | [`../../README.md`](../../README.md), [`../../GOVERNANCE.md`](../../GOVERNANCE.md) |
| **Declarative Company Protocol**, **DCP** | This specification, taken as a whole; the data-layer specification of the Programmable Company project. *DCP* is the abbreviation used in body text. | This document |
| **Entity** | A legal person represented under this specification. The Entity document at HEAD is the declarative projection of the entity's state. | [§03](03-entity-model.md) |
| **Identifier** | A typed, namespaced, optionally scoped reference that an entity carries (e.g. an Estonian registrikood). | [§03](03-entity-model.md) |
| **Capability** | A declared opt-in module — a unit of functionality with its own specification — that the entity exposes. | [§03](03-entity-model.md), [§06](06-capability-negotiation.md) |
| **Document** | A signed-artifact wrapper for content attached to an entity (bylaws, resolutions, mandates, attachments). | [§03](03-entity-model.md) |
| **Event** | An entry in the entity's append-only signed log; the canonical record of state change. | [§03](03-entity-model.md) |
| **Reference** | A content-addressed pointer (hash + optional resolution hint) to another artifact. | [§03](03-entity-model.md) |
| **Repository** | A Git repository conforming to [§02](02-repository-structure.md), holding a single DCP entity. | [§02](02-repository-structure.md) |
| **Profile** | A jurisdiction-specific binding (e.g. Estonia) that constrains and extends the core specification for that jurisdiction. | [§07](07-versioning.md), [`profiles/`](../../profiles/) |
| **Conformance** | The property of an artifact, repository, or implementation satisfying the requirements of this specification at the level claimed (Core or profile). | [§00](00-introduction.md), [§07](07-versioning.md) |
| **Programmable-layer specification** | The future runtime/interaction specification of the project, complement to DCP. Out of scope for this draft. | [`../../README.md`](../../README.md) |

The term **agent**, where it appears in this specification, refers to any non-human party acting on or against an entity — automated tooling, a Claude or other large-language-model instance, an integration service. It does not refer to a legal agent in the company-law sense, except where that is made explicit.

## Notation conventions

**Type names.** Names like `Entity`, `Identifier`, `Capability` refer to the corresponding TypeScript types in [`schema/2026-05-04/src/`](../../schema/2026-05-04/src/) and the corresponding `definitions` in [`schema/2026-05-04/schema.json`](../../schema/2026-05-04/schema.json).

**Field names.** Field names are written `monospaced`. Dotted forms refer to nested fields: `Entity.head.hash` is the `hash` field of the `head` field of the `Entity` document.

**Path references.** Paths in backticks (e.g. `events/2026/2026-05-04-genesis.json`) are paths relative to the repository root, except where another base is explicit.

**JSON examples.** Examples are written as JSON in fenced blocks. Examples are informative unless explicitly noted otherwise.

```json
{
  "$specVersion": "2026-05-04",
  "id": "pc:ee:registrikood:14123456",
  "name": "Created At OÜ"
}
```

**Hash references.** Hashes in prose are abbreviated to the first eight hexadecimal characters with an ellipsis (`e3b0c442…`) for readability. Conformant artifacts always carry the full 64-character form.

## TypeScript-to-JSON-Schema mapping

The schema is authored in TypeScript and compiled to JSON Schema via [`ts-json-schema-generator`](https://github.com/vega/ts-json-schema-generator). The mapping is straightforward; the points worth noting are:

- TypeScript `interface` and `type` declarations become JSON Schema `definitions`.
- Optional fields (`field?: T`) are omitted from the `required` array.
- String aliases with a JSDoc `@pattern` annotation become `string` definitions with a `pattern` constraint.
- Union types (`A | B`) become `oneOf` clauses.
- `Record<string, T>` becomes an object with `additionalProperties: { … }` and no `properties`.
- The generated schema does **not** set `additionalProperties: false` globally. Implementations MAY enforce strict validation; the specification only requires that fields that are declared be of the declared type.

## Date and time

All dates in this specification are written in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) form: `YYYY-MM-DD` for calendar dates, `YYYY-MM-DDTHH:MM:SSZ` for instants. Instants MUST be UTC and SHOULD use the `Z` suffix. Implementations MUST NOT depend on local time zones in artifact bytes.

## Identifier and hash conventions

Hexadecimal hashes are lowercase. SHA-256 digests are 64 lowercase hexadecimal characters with no separators. Base64 encodings use the URL-safe alphabet without padding (Base64URL, [RFC 4648 §5](https://www.rfc-editor.org/rfc/rfc4648#section-5)).

The single hash algorithm permitted in the `2026-05-04` draft is SHA-256, expressed as `"sha-256"` in the `Reference.hashAlg` field. Future drafts MAY broaden this set. Consumers MUST reject references whose `hashAlg` they do not recognize.

## Languages and encoding

All artifact bytes are UTF-8. JSON artifact files use Unix line endings (`\n`) and end with a single trailing newline. Files MUST NOT contain a UTF-8 byte-order mark.
