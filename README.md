# Programmable Company

Programmable Company is an open specification for representing companies as machine-readable, cryptographically-signed, version-controlled artifacts. A conforming company is a Git repository whose contents — identity, governance documents, signed events, declared capabilities — describe the company precisely enough that humans, agentic systems, and government services can act on the same shared representation, without bespoke integration.

The specification is being drafted Estonia-first, building on existing European digital identity, signing, and registry infrastructure. It is explicitly not Estonia-exclusive; jurisdiction-specific bindings live in profiles, and the core specification is jurisdiction-neutral.

> Programmable Company was previously known as the Agentic Company Protocol. The repository was also briefly named the Declarative Company Protocol during a renaming pass; both prior names refer to the same project. The current name is **Programmable Company**.

## Status

**Pre-alpha.** The first specification draft, dated `2026-05-04`, is the initial coherent shape of the data layer. It defines the substrate: how a company is identified, how its artifacts are canonicalized and signed, how its history is recorded, and how it declares which capabilities it exposes. It is expected to change as the data layer is exercised against real Estonian and EU integrations.

This draft is not a tagged version. It is frozen by date, but consumers should expect the next dated version to break with it as the model is refined.

## Declarative now, programmable later

Programmable Company is being specified in two layers:

- **Declarative layer (this draft).** What a company *looks like* as data: signed artifacts at rest, a content-addressable event log, declared capabilities, and the identity primitives that bind them. The declarative layer can be consumed by any tool that reads JSON and verifies JWS signatures. No runtime is required.
- **Programmable layer (future spec).** How agents, humans, and state services *interact* with a company at runtime: capability negotiation over the wire, mandate-checked actions, cross-jurisdictional message flows. The programmable layer builds on the declarative substrate but is out of scope for this draft.

The split exists so the declarative layer can stabilize independently. A company representation that an agent can *read* and a registry can *verify* is useful long before any standardized runtime exists.

## Repository layout

| Path | Purpose |
| --- | --- |
| [`specification/2026-05-04/`](specification/2026-05-04/) | Normative prose for the `2026-05-04` draft. Read [`00-introduction.md`](specification/2026-05-04/00-introduction.md) first. |
| [`schema/2026-05-04/`](schema/2026-05-04/) | TypeScript source of truth for the core entity types and the generated JSON Schema. |
| [`profiles/estonia/`](profiles/estonia/) | Estonia-specific bindings: legal forms, identifier types, e-MTA and X-Road touchpoints. |
| [`seps/`](seps/) | Specification Enhancement Proposals — the change-control mechanism. |
| [`VISION.md`](VISION.md) | Why this exists. |
| [`PRINCIPLES.md`](PRINCIPLES.md) | Constraints on specification decisions. |
| [`GOVERNANCE.md`](GOVERNANCE.md) | How the specification is stewarded. |
| [`CHANGELOG.md`](CHANGELOG.md) | Dated history of repository-level changes. |

## Reading order

1. [`VISION.md`](VISION.md) — the thesis.
2. [`PRINCIPLES.md`](PRINCIPLES.md) — the constraints.
3. [`specification/2026-05-04/00-introduction.md`](specification/2026-05-04/00-introduction.md) — what the draft is and is not.
4. The remaining specification sections, in order.
5. [`profiles/estonia/`](profiles/estonia/) — if you are implementing against Estonian infrastructure.

A motivated reader should be able to finish the draft in roughly thirty minutes.

## Contributions

The contribution model is not yet open. See [`GOVERNANCE.md`](GOVERNANCE.md) for the current phase and the planned transition. Once the substrate stabilizes, change proposals will land through the [`seps/`](seps/) process.

## License

Released under the [MIT License](LICENSE).
