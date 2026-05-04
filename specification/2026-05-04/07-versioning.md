# 07 — Versioning

This section defines how the Programmable Company specification itself is versioned, how repositories declare conformance to a version, and how versions are deprecated.

## Date-based, MCP-style versioning

Each draft of this specification is identified by the date on which it was frozen, in ISO 8601 form: `YYYY-MM-DD`. The current draft is `2026-05-04`.

A specification version corresponds to a directory pair:

```
specification/<YYYY-MM-DD>/
schema/<YYYY-MM-DD>/
```

Once a directory is published — committed to the project's primary branch and announced in the [`CHANGELOG.md`](../../CHANGELOG.md) — its contents are **frozen**. No commit may modify a published dated directory, except to:

- Correct typographical or factual errors that do not change normative meaning. (Erratum-class changes.)
- Add cross-references to later drafts that supersede or amend the directory's content.
- Update generated build products (`schema.json`) when their TypeScript source has been demonstrated to produce different bytes due to generator changes; the generation must be reproducible from the committed `src/`.

Substantive changes go in a **new dated directory**. The new directory is published, the old one stays put. Implementations that target the old version continue to work against the old directory.

Date-based versioning was chosen to mirror the [Model Context Protocol](https://github.com/modelcontextprotocol/modelcontextprotocol) approach. Semantic versioning is reserved for capability versions ([§06](06-capability-negotiation.md)), where its compatibility semantics carry their usual meaning. The specification itself is not bumped on a `MAJOR.MINOR.PATCH` axis; it is dated.

## How a repository declares conformance

A repository declares its conformance in three places, in order of authority:

1. **`Entity.$specVersion`** in `entity.json` — authoritative.
2. **`Conformance.$specVersion`** in `.programmable-company/conformance.json` — repository-level cache.
3. **`README.md`** at the repository root, by convention — human-readable.

Tooling interprets the repository under the version named in `Entity.$specVersion`. A tool that supports multiple versions selects the matching specification directory; a tool that supports only one version refuses to operate on repositories that declare a different one.

A repository MUST declare exactly one `$specVersion`. Mixing versions across artifacts within a single repository is non-conformant.

## Compatibility expectations

Across dated drafts, the only formally guaranteed property is that the **format of the conformance declaration itself** does not break. That is:

- `Entity.$specVersion` will continue to exist as a string field on the entity document.
- The location of `.programmable-company/conformance.json` will continue to be respected.
- The relationship "specification directory and schema directory share a date" will continue to hold.

Everything else MAY change between drafts. In particular, future drafts MAY:

- Rename, repurpose, or remove fields on existing types.
- Tighten or loosen the algorithm allowlist in [§05](05-signing.md).
- Promote optional capabilities to mandatory, or split mandatory capabilities into smaller pieces.
- Replace JSON Schema draft-07 with a more recent dialect.
- Replace JCS with a different canonicalization, if one becomes preferable.

Each substantive change is expected to come through the [SEP process](../../seps/) so that consumers learn of it before it lands. The change itself becomes effective only when a new dated draft is published.

## Migrations between dated drafts

This specification does not prescribe a migration mechanism between dated drafts. A repository that wants to move from draft *A* to draft *B*:

1. Picks a commit at which to migrate.
2. Updates `Entity.$specVersion` in a `core.lifecycle.*` event whose semantics include a version bump (the precise event type for this is TODO(SEP-XXXX)).
3. Updates the repository structure to satisfy draft *B*'s requirements.

Migration produces a single repository conformant to draft *B* from that commit forward. The history before the migration commit is interpreted under draft *A*; verifiers walking the history backward MUST switch interpretation rules at the migration boundary.

The `2026-05-04` draft is the first; there is no earlier draft to migrate from. Migration semantics are deferred until at least one further draft exists.

## Deprecation policy

A field, type, capability, or rule may be **deprecated** in a future draft. Deprecation in draft *N* means:

- The deprecated element remains valid in draft *N*; existing repositories at draft *N* are not invalidated.
- Producers SHOULD NOT use the deprecated element in new artifacts.
- The deprecated element MAY be removed in any later draft *> N*.

Deprecation notices live in the dated directory of the draft that introduces them. They MUST identify (a) what is deprecated, (b) the recommended replacement, (c) the earliest draft in which removal is contemplated.

The `2026-05-04` draft introduces no deprecations.

## Profile versioning

Profiles ([`profiles/<profile>/`](../../profiles/)) are versioned independently of the core specification. Each profile carries its own `README.md` stating which core spec versions it is compatible with, and tracks its own changes in its own changelog. A repository's `Entity.profile` field names the profile by string; the profile document at the repository's `$specVersion` is the binding interpretation.

When a profile is updated in a way that requires repository changes, profile authors are expected to publish a new profile version and provide a migration note. The relationship between profile versioning and core specification versioning is otherwise loose: profiles can advance independently, provided they remain compatible with at least one supported core version.

## Tooling guidance (informative)

Tools implementing Programmable Company should:

- Vendor the schema at the version they target. Do not fetch `schema.json` over the network at runtime; it is meant to be embedded.
- Refuse to operate on repositories declaring a `$specVersion` the tool does not implement, rather than attempting best-effort interpretation.
- Surface the `$specVersion` prominently in any human-facing UI. The version is part of what the entity is, not a configuration detail.

A future draft may formalize a registry of well-known `$specVersion` values and the libraries that implement each; until then, tooling tracks versions out of band.
