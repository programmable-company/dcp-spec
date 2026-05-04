# 03 — Entity model

This section defines the core entity types — Entity, Identifier, Capability, Document, Event, Reference — and their relationships. The TypeScript definitions in [`schema/2026-05-04/src/`](../../schema/2026-05-04/src/) are the normative source for shape; this section is the normative source for semantics.

## Reference

A `Reference` is a content-addressed pointer to another artifact. Its definition lives in [`schema/2026-05-04/src/reference.ts`](../../schema/2026-05-04/src/reference.ts).

```json
{
  "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "hashAlg": "sha-256",
  "uri": "events/2026/2026-05-04-genesis.json",
  "mediaType": "application/json"
}
```

The `hash` is the digest of the canonicalized bytes of the referenced artifact (see [§04](04-canonicalization.md)). Two references with the same `hash` and `hashAlg` MUST be treated as referring to the same content.

`uri` is a resolution hint, not part of identity. Verifiers MUST recompute the digest from the resolved bytes; they MUST NOT trust the URI to certify that the bytes are the bytes that were signed. A `Reference` without a `uri` is still a valid identifier — verifiers can search the repository, a content-addressable store, or any other source until they find bytes whose hash matches.

`hashAlg` in the `2026-05-04` draft MUST be `"sha-256"`. Consumers MUST reject references whose `hashAlg` they do not recognize.

## Identifier

An `Identifier` is a typed reference an entity carries. Its definition lives in [`schema/2026-05-04/src/identifier.ts`](../../schema/2026-05-04/src/identifier.ts).

```json
{
  "type": "ee.registrikood",
  "value": "14123456",
  "issuer": "Centre of Registers and Information Systems (RIK)",
  "scope": "EE",
  "validFrom": "2024-03-15"
}
```

The `type` namespace is the unit of meaning. Two identifiers with the same `type` and `value` refer to the same external registration; the `issuer` field is informational and MUST NOT be used for trust decisions. Trust is established by the profile that defines the `type` (see [`profiles/`](../../profiles/)).

The `2026-05-04` draft does not enumerate identifier types in the core specification; profiles register the types they use. This is a deliberate constraint: the core specification is jurisdiction-neutral, and a fixed enumeration would either privilege one jurisdiction or grow without bound.

An entity MAY carry multiple identifiers. The pair (`type`, `value`) MUST be unique across an entity's active identifiers — the same registration MUST NOT appear twice in `Entity.identifiers`. An identifier whose `validUntil` is set in the past is **expired** but remains in `Entity.identifiers` until purged by a subsequent `core.lifecycle.identifier-revoked` event; verifiers presenting current state SHOULD filter expired identifiers from view.

## Capability

A `Capability` declares that an entity exposes a given module. Its definition lives in [`schema/2026-05-04/src/capability.ts`](../../schema/2026-05-04/src/capability.ts).

```json
{
  "id": "core/identity",
  "version": "1.0.0"
}
```

Every conformant entity MUST declare at least:

- `core/identity` at major version 1 — the entity-identity capability defined by this specification.
- `core/lifecycle` at major version 1 — the formation/rename/dissolution event vocabulary defined by this specification.

A repository's full capability set is the `capabilities` field of `entity.json`. Capability negotiation, the discovery cache, and version compatibility are described in [§06](06-capability-negotiation.md).

The `params` field is capability-specific. Declarative Company itself imposes no constraint on its contents beyond JCS-canonicalizable JSON (see [§04](04-canonicalization.md)).

## Document

A `Document` is the wrapper for any signed content attached to an entity — bylaws, resolutions, mandates, attachments to events, and any other artifact that needs to be referenced by hash and verified by signature. Its definition lives in [`schema/2026-05-04/src/document.ts`](../../schema/2026-05-04/src/document.ts).

A Document carries:

- `id` — stable across the document's lifetime.
- `type` — namespaced (`core/bylaws`, `core/resolution`, …).
- `content` — either inline or by reference.
- `provenance` — who produced it, when, and what (if anything) it supersedes.

Inline content is suitable for short JSON-native payloads. Larger or binary content is stored as bytes elsewhere (typically under `documents/<id>/content/`) and pointed at by `Reference`. In both cases, the document's signature binds to the canonicalized `Document` envelope, not to the bytes of the content; the content's own integrity is established by the `Reference.hash`.

A Document SHOULD NOT be edited in place. Producing a new Document with `provenance.supersedes` pointing at the prior version preserves the audit trail; verifiers reconstructing state replay supersession chains in order.

A Document is signed via a sidecar JWS at `<document-path>.jws` (see [§05](05-signing.md)). Multiple signatures (countersignatures) are expressed as multiple sidecar files: `document.json.<kid>.jws`, one per signer.

## Event

An `Event` is an entry in the entity's append-only log. Events are the **canonical record** of an entity's state under this specification — `entity.json` at HEAD is a *projection* over the events, not the source of truth. The `Event` definition lives in [`schema/2026-05-04/src/event.ts`](../../schema/2026-05-04/src/event.ts).

```json
{
  "id": "01HXKZS3F4XK6Q2C7H5PA3RZ7M",
  "type": "core.lifecycle.formed",
  "timestamp": "2026-05-04T09:30:00Z",
  "actor": "kid:ee:smart-id:PNOEE-12345678901#1",
  "payload": {
    "name": "Created At OÜ",
    "legalForm": "OÜ",
    "jurisdiction": "EE"
  },
  "refs": [
    {
      "hash": "9b74…",
      "hashAlg": "sha-256",
      "uri": "documents/formation/document.json"
    }
  ]
}
```

### Genesis and chain

The first event in the log MUST have `type: "core.lifecycle.formed"` and MUST NOT have a `parent`. Every subsequent event MUST have a `parent` whose `hash` resolves to the canonicalized bytes of an earlier event in the same repository. The `parent` chain forms a hash-linked structure: any out-of-order or omitted event invalidates the chain at the first broken link.

Verifiers MUST traverse the chain from genesis and confirm that:

1. Each event's `parent.hash` (when present) matches the canonicalized predecessor.
2. Each event's signature (sidecar JWS) verifies against a key authorized at the time of `timestamp`.
3. No two events share the same `id`.
4. Timestamps are monotonically non-decreasing along the chain. (Equal timestamps are permitted; producers SHOULD avoid them, but consumers MUST tolerate them.)

### Event types defined by this specification

The `core.lifecycle.*` namespace is defined here. Every conformant entity supports these types (they are part of the mandatory `core/lifecycle` capability):

| Type | Effect on the projection |
| --- | --- |
| `core.lifecycle.formed` | Sets `id`, `legalForm`, `jurisdiction`, `name`, `formedAt`. Genesis only. |
| `core.lifecycle.renamed` | Updates `name`. |
| `core.lifecycle.identifier-added` | Appends to `identifiers`. |
| `core.lifecycle.identifier-revoked` | Removes a previously-added identifier or sets its `validUntil`. |
| `core.lifecycle.capability-added` | Appends to `capabilities`. |
| `core.lifecycle.capability-removed` | Removes a previously-added capability. |
| `core.lifecycle.dissolved` | Sets `dissolvedAt`. Terminal: no further events MAY be appended. |

Payload shapes for each event type are defined in the schema (TODO(SEP-XXXX): per-event payload types are not yet broken out into named TypeScript types in this draft; they appear as `Record<string, unknown>` and are constrained only by prose. A future SEP will introduce per-type schemas).

Downstream capability specifications introduce additional event types under their own namespace (e.g. `accounting.*`).

### Why projection, not document

A Declarative Company's authoritative state is the event log; `entity.json` is a derivative. This rule exists because:

- The log is the only structure that can record *when* a fact became true. A document at HEAD records only what is true now.
- The log is what an external party (a court, a registry, a counterparty) replays to settle disputes about what was true at a given moment.
- The log is the natural unit of replication: a follower can sync events incrementally, while a follower of a document at HEAD has to reload the entire state on every change.

The projection exists so that consumers who only need "what is true now" do not have to replay history. Verifiers MUST be able to fall back to replay; they SHOULD also accept stamped (signed) projections from trusted producers as a fast path.

## Entity

The `Entity` is the projection of the company at HEAD. Its definition lives in [`schema/2026-05-04/src/entity.ts`](../../schema/2026-05-04/src/entity.ts).

```json
{
  "$schema": "https://programmable-company.org/schema/2026-05-04/schema.json",
  "$specVersion": "2026-05-04",
  "id": "pc:ee:registrikood:14123456",
  "profile": "estonia",
  "legalForm": "OÜ",
  "jurisdiction": "EE",
  "name": "Created At OÜ",
  "formedAt": "2024-03-15",
  "identifiers": [
    { "type": "ee.registrikood", "value": "14123456", "scope": "EE" }
  ],
  "capabilities": [
    { "id": "core/identity", "version": "1.0.0" },
    { "id": "core/lifecycle", "version": "1.0.0" }
  ],
  "head": {
    "hash": "e3b0c442…",
    "hashAlg": "sha-256",
    "uri": "events/2026/2026-05-04-genesis.json"
  }
}
```

### Required fields

- `$specVersion` — MUST be `"2026-05-04"` for repositories conformant to this draft.
- `id` — stable identifier; recommended form is a `pc:` URN (see Conformance below).
- `profile` — the profile under which the entity is interpreted (`"estonia"` for the Estonia profile).
- `legalForm` — profile-defined. The Estonia profile's permitted values are listed in [`profiles/estonia/01-legal-forms.md`](../../profiles/estonia/01-legal-forms.md).
- `jurisdiction` — ISO 3166-1 alpha-2.
- `name` — current legal name.
- `formedAt` — set by the genesis event; immutable thereafter.
- `identifiers` — current active identifiers.
- `capabilities` — declared capabilities; MUST include `core/identity` and `core/lifecycle`.
- `head` — Reference to the most recent event applied to produce this projection.

### Identifier conventions

The recommended form for `Entity.id` is a URN in the `pc:` namespace, with a profile-specific subnamespace. The `pc:` namespace is owned by the Programmable Company project and is shared across all of the project's specifications, so an entity's `id` is stable across the introduction of the future programmable-layer specification — adopting that layer does not require re-identifying the entity. For Estonia, the form is:

```
pc:ee:registrikood:<8-digit registrikood>
```

This form is content-stable (does not change as the company is renamed) and globally unique within the Estonian registry. Profiles define their own analogues.

Implementations that need a globally-unique stable identifier independent of any registry MAY instead use a content-addressable form derived from the genesis event hash:

```
pc:genesis:<sha256-hex of canonicalized formed event>
```

Both forms are conformant. Profiles MAY restrict to one or the other.

### Conformance check

A repository's `entity.json` is conformant if and only if:

1. It validates against the `Entity` definition in `schema.json`.
2. Its `$specVersion` matches the spec under which it is being interpreted.
3. Its `head` resolves to an event whose canonicalized bytes match `head.hash`.
4. Replaying every event in `events/` from genesis up to and including `head`, by the rules in this section, produces an Entity equal to this document under JCS canonicalization.
5. Its `capabilities` includes both `core/identity` and `core/lifecycle` at major version 1.
6. Profile-specific requirements imposed by the `profile` named in the document are satisfied.

## Relationships, summarized

```
                ┌─────────────┐
                │  entity.json│  (projection at HEAD)
                └──────┬──────┘
                       │ head ─► Reference
                       ▼
                ┌─────────────┐
                │   Event N   │  (most recent committed event)
                └──────┬──────┘
                       │ parent ─► Reference
                       ▼
                       …
                       │
                       ▼
                ┌─────────────┐
                │   Event 0   │  (core.lifecycle.formed; genesis)
                └─────────────┘

  Documents are referenced from Events (or from each other) via Reference.
  Capabilities are declared on the Entity and (for negotiation) cached in
  .programmable-company/capabilities.json.
```

The structure is intentionally minimal: a chain of events, a projection, references, capabilities. Module specifications (accounting, compliance, people, etc.) will introduce richer types, but they will all reduce — at the substrate — to events, documents, and references like the ones defined here.
