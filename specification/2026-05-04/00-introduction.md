# 00 — Introduction

## What this specification is

This is **Declarative Company**, the data-layer specification published by the Programmable Company project. It defines an open format for representing companies as machine-readable, cryptographically-signed, version-controlled artifacts. A conforming Declarative Company is a Git repository whose contents — the entity's identity, its append-only log of signed events, its declared capabilities, and the documents attached to those events — describe the company precisely enough that humans, agentic systems, and government services can act on the same shared representation without bespoke integration.

The Programmable Company project is published under the MIT License. There is no licensing tier, no commercial gatekeeping, and no privileged implementation. See [`../../GOVERNANCE.md`](../../GOVERNANCE.md) for stewardship.

## How this specification fits in the project

Programmable Company — the project — is being developed in two layered specifications. Declarative Company, defined by this document, is the first; the second is deferred:

- **Declarative Company (this specification)** — the data layer. What a company *looks like* as data at rest: the file layout of a conforming repository, the JSON shapes of its entities, the canonicalization and signature rules, the capability declaration mechanism. The declarative layer is consumable by any tool that reads JSON and verifies JWS signatures. No runtime is required.
- **The programmable-layer specification** — deferred to a future draft of the project. Will define how agents, humans, and state services *interact* with a Declarative Company at runtime: capability negotiation over the wire, mandate-checked actions, cross-jurisdictional message flows.

The split exists so the data layer can stabilize independently. A representation that an agent can *read* and a registry can *verify* is useful long before any standardized runtime exists. Declarative Company is the intermediate step on the way to fully programmable companies; this specification is the contract for that step.

Where the prose below refers to "this specification" without qualification, it refers to the Declarative Company specification dated `2026-05-04`. References to "the project" mean Programmable Company.

## Out of scope for this draft

The following are **not** specified here. Several are anticipated as downstream specifications; some are explicit non-goals.

- Runtime / interaction protocols (deferred to the programmable-layer specification).
- Module-level capability semantics — accounting, compliance, people, payments, and similar — beyond defining the capability declaration mechanism itself. Each module is expected to be specified in its own document under its own SEP.
- Software development kits in any language. Only the schema package is published here.
- User interfaces. Declarative Company says nothing about how company data is displayed to humans.
- Replacement of legal systems. Where this specification and applicable law differ, applicable law governs.

## Audience

This specification is written for three audiences in parallel:

- **Engineers** building tools that read, write, sign, or verify Declarative Company artifacts.
- **Lawyers and registry staff** evaluating the specification's compatibility with company law and registry practice in their jurisdiction.
- **Policy reviewers** assessing whether the specification is aligned with the digital-state agendas it is intended to interoperate with.

Where these audiences need different things, the prose is structured so each can read only the sections relevant to it. Schema appendix references are given for engineers; legal-binding notes are flagged inline for lawyers; conformance and stewardship implications are surfaced where they bear on policy.

## Conformance levels

A Declarative Company artifact is **conformant** to this specification if and only if it satisfies, jointly:

1. The repository structure requirements of [§02](02-repository-structure.md).
2. The entity-model requirements of [§03](03-entity-model.md), validating against the schema in [`schema/2026-05-04/`](../../schema/2026-05-04/).
3. The canonicalization rules of [§04](04-canonicalization.md).
4. The signing requirements of [§05](05-signing.md), at JAdES baseline level **B-B** at minimum.
5. The capability-negotiation rules of [§06](06-capability-negotiation.md), declaring at least the mandatory `core/identity` and `core/lifecycle` capabilities.
6. The versioning rules of [§07](07-versioning.md), declaring `$specVersion: "2026-05-04"`.

All of (1)–(6) are required for **Core conformance**. A repository is **profile-conformant** to a profile (e.g. `estonia`) when, in addition to Core, it satisfies the additional requirements that profile imposes — typically constraints on `legalForm`, identifier types, and trust anchors.

A repository MAY declare additional capabilities beyond `core/identity` and `core/lifecycle`. Each declared capability brings its own conformance requirements, defined by the specification that introduces it. Consumers MAY choose which capabilities to act on; consumers MUST NOT reject a repository solely because it declares a capability they do not understand, but MAY refuse to act on artifacts that depend on such capabilities.

## Relationship to existing standards

Declarative Company composes existing standards rather than inventing new ones:

- **JSON** (RFC 8259) for artifact format.
- **JCS** (RFC 8785) for canonicalization of signed content.
- **JWS** (RFC 7515) and **JAdES** (ETSI TS 119 182-1) for signatures, in line with eIDAS.
- **JSON Schema** (draft-07, generated from TypeScript) for shape validation.
- **Git** for storage, history, and integrity at the repository level.
- **BCP 14** (RFC 2119 + RFC 8174) for normative keywords.

Where a conventional standard would suffice, this specification uses it. Where the existing standards leave choices, this specification narrows them only as far as interoperability requires.

## Document status

This draft is **pre-alpha**. It is frozen by date — the `2026-05-04` directory will not be modified once shipped — but the next dated draft is expected to break with this one. Do not treat this draft as a stable target for production tooling.

Issues that arise during implementation should be tracked through the [SEP process](../../seps/), once that process is open.

## How to read the rest of this specification

The remaining sections build up the substrate in the order a producer would construct it: conventions ([§01](01-conventions.md)) → repository layout ([§02](02-repository-structure.md)) → the entities that live in the repository ([§03](03-entity-model.md)) → how their bytes are canonicalized for signing ([§04](04-canonicalization.md)) → how those bytes are signed and verified ([§05](05-signing.md)) → how the entity tells consumers what it can do ([§06](06-capability-negotiation.md)) → how this specification itself versions ([§07](07-versioning.md)).

The schema package under [`schema/2026-05-04/`](../../schema/2026-05-04/) is referenced throughout. When the prose and the schema disagree, **the schema wins** for shape questions and **the prose wins** for behavioral questions; in practice they are designed not to disagree, and any divergence is a defect.
