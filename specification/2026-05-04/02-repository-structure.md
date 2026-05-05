# 02 — Repository structure

A Declarative Company Protocol (DCP) repository is a Git repository. The repository is the unit of conformance: tooling that reads, validates, or signs artifacts operates over a repository, and a repository's history is part of its identity.

This section defines the file and directory layout that makes a Git repository a conformant DCP repository.

## Required layout

A conformant repository MUST contain, at minimum:

```
/
├── entity.json                                # current declarative projection
├── .programmable-company/
│   ├── conformance.json                       # repository-level metadata
│   └── capabilities.json                      # capability discovery cache
└── events/
    └── <YYYY>/
        └── <YYYY-MM-DD>-<event-id>.json       # signed events, one per file
```

A repository MAY contain, in addition:

```
/
├── documents/
│   └── <document-id>/
│       ├── document.json                      # the Document envelope
│       └── content/                           # by-reference content blobs
└── README.md                                  # human-readable summary
```

Tooling MUST treat any other top-level files (license files, governance documents, dotfiles related to the host hosting platform, etc.) as opaque. They are not part of conformance and are not interpreted by this specification.

## File semantics

### `entity.json`

The declarative projection of the entity at HEAD. Its shape is defined by the `Entity` type in [`schema/2026-05-04/src/entity.ts`](../../schema/2026-05-04/src/entity.ts).

`entity.json` MUST exist at every commit on the repository's primary branch. It is **derived data**: a verifier MUST be able to reconstruct it by replaying every signed event under `events/` from the genesis event up to the event named by `entity.json`'s `head` field. If reconstruction does not yield the file's bytes, byte-for-byte after JCS canonicalization (see [§04](04-canonicalization.md)), the repository is non-conformant.

`entity.json` MAY itself be signed. When signed, the signature is a sidecar at `entity.json.jws`. A signed `entity.json` is a *stamped projection*: a producer's attestation that, at this commit, the projection is the result of replaying the log. The signature does not make the projection authoritative; the log remains authoritative. Verifiers MAY trust the stamped projection as a fast path but MUST be able to fall back to replay.

### `events/<YYYY>/<YYYY-MM-DD>-<event-id>.json`

The append-only log. Each file is a single `Event` artifact. The shape is defined by the `Event` type in [`schema/2026-05-04/src/event.ts`](../../schema/2026-05-04/src/event.ts).

Naming requirements:

- The directory MUST be the four-digit year (`<YYYY>`) of the event's `timestamp` field.
- The filename MUST begin with the event's date (`<YYYY-MM-DD>`) drawn from the event's `timestamp`, followed by `-` and the event's `id`, and end with `.json`.
- Filenames MUST be unique within the repository.

Each event file MUST be accompanied by a sidecar JWS signature (see [§05](05-signing.md)) at `events/<YYYY>/<YYYY-MM-DD>-<event-id>.json.jws`.

The first event in the log MUST have type `core.lifecycle.formed` and MUST NOT have a `parent` field. Every subsequent event MUST have a `parent` field whose `hash` resolves to the canonicalized bytes of an earlier event in the same repository.

Events, once committed, MUST NOT be modified. A correction takes the form of a new event whose `type` and `payload` describe the correction. Tooling MUST reject any commit that rewrites or deletes a previously committed event file.

### `.programmable-company/conformance.json`

Repository-level metadata. The shape is defined by the `Conformance` type in [`schema/2026-05-04/src/conformance.ts`](../../schema/2026-05-04/src/conformance.ts).

`conformance.json` is consumed by tooling as a fast index into the repository: it identifies the specification version, profile, and capability set without forcing a full parse of `entity.json`. The authoritative declarations live on the Entity document. When the two disagree, `entity.json` wins and tooling SHOULD warn.

### `.programmable-company/capabilities.json`

A discovery cache mirroring the `capabilities` field of `entity.json`. Tooling that wants to learn what an entity exposes — for capability negotiation — reads this file. It contains no information not present in `entity.json`; it exists so consumers can act without parsing the full Entity document. Tooling MUST regenerate this file whenever `entity.json.capabilities` changes.

### `documents/<document-id>/`

Optional. Stores document envelopes (`document.json`) and their by-reference content blobs (under `content/`). The `Document` type is defined in [`schema/2026-05-04/src/document.ts`](../../schema/2026-05-04/src/document.ts).

A document referenced by an event MAY live anywhere a `Reference` can resolve to (including outside the repository), provided the resolved bytes match the reference's `hash`. The `documents/` directory is the recommended location for documents the entity wishes to keep alongside its event log.

## Commit conventions

A conformant repository's Git history is **append-only** with respect to events: a commit MAY add a new event under `events/`, MAY update `entity.json` and `.programmable-company/` to reflect new events, and MAY add or supersede documents under `documents/`. A commit MUST NOT modify or delete a previously committed event file.

History rewrites — `git commit --amend` on a published commit, `git rebase` of a published branch, force-push to a shared branch — produce non-conformant repositories. Tooling SHOULD reject repositories whose history shows that a previously published event file was modified.

Commit messages SHOULD reference the event(s) added in the commit by event id. The recommended message form is:

```
<event-type>: <one-line summary>

Adds: events/2026/2026-05-04-<event-id>.json
```

Commits SHOULD be cryptographically signed at the Git layer (e.g. with the same eIDAS-aligned signing infrastructure used for event signatures), but Git-level commit signing is **not** the conformance signature for events. Event signatures live in the JWS sidecars described in [§05](05-signing.md). Git signing protects the repository's integrity at the storage layer; JWS signing protects the artifacts' authenticity in the data layer.

## The HEAD-versus-history relationship

At any commit:

- The **history** of the repository — the Git log up to and including that commit — is the audit trail. It records *when* events were added to the repository.
- The **events under `events/`** at that commit are the canonical record of state. They record *what* happened to the entity.
- The **`entity.json` at that commit** is the projection: the answer to *what is true now*.

These three views are linked. A consumer who wants to know what is true now reads `entity.json`. A consumer who wants to verify that what is true now is consistent with what has happened replays `events/`. A consumer who wants to detect repository tampering inspects the Git history.

Implementations are not required to make all three views available to every consumer; conformance only requires that the views, when reconstructed, agree.

## What MUST NOT appear in a DCP repository

To keep the repository surface unambiguous, conformant repositories MUST NOT include any of the following at paths reserved by this specification:

- Files under `events/` that are not events or their sidecar signatures.
- Files under `.programmable-company/` other than those defined here or by future drafts.
- An `entity.json` whose `head` does not resolve to an event file in `events/`.
- A `documents/<id>/` directory containing a `document.json` whose `id` does not match `<id>`.

TODO(SEP-XXXX): the reserved-namespace list is expected to grow as capabilities are introduced. The current list is a floor, not a ceiling.
