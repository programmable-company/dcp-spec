# Programmable Company

**Programmable Company** is the open project developing a family of specifications under which companies can be represented, governed, and operated as machine-readable, cryptographically-signed, version-controlled artifacts. The long-term vision — companies as first-class counterparties to the Agentic State, addressable by humans, agents, and government services through the same shared interfaces — is what gives the project its name.

The project is being drafted Estonia-first, building on existing European digital identity, signing, and registry infrastructure. It is explicitly not Estonia-exclusive; jurisdiction-specific bindings live in profiles, and the core specifications are jurisdiction-neutral.

> Programmable Company was previously known as the Agentic Company Protocol. The repository was also briefly named the Declarative Company Protocol during a renaming pass; both prior names refer to the same project. The current project name is **Programmable Company**.

## Two specifications, one project

Programmable Company is being developed in two layered specifications:

1. **Declarative Company** — the data layer. Defines what a company *looks like* as data at rest: the JSON shapes of its identity, its append-only event log, its signed documents, and its declared capabilities. The first draft, dated `2026-05-04`, is in this repository. Declarative Company is the intermediate step — the substrate on which the second layer will be built.
2. **Programmable Company** *(the specification of the same name as the project)* — the runtime layer. Will define how agents, humans, and state services *interact* with a Declarative Company at runtime: capability negotiation over the wire, mandate-checked actions, cross-jurisdictional message flows. Out of scope for this repository today; will be drafted once the declarative substrate stabilizes.

Naming convention: capital-letter **Programmable Company** without further qualification refers to the project / organization. Capital-letter **Declarative Company** refers to the data-layer specification. When the runtime layer is drafted, it will be referred to as the **Programmable Company specification** to disambiguate from the project name.

## Status

**Pre-alpha.** The first Declarative Company draft, dated `2026-05-04`, is the initial coherent shape of the data layer. It defines the substrate: how a company is identified, how its artifacts are canonicalized and signed, how its history is recorded, and how it declares which capabilities it exposes. It is expected to change as the data layer is exercised against real Estonian and EU integrations.

This draft is not a tagged version. It is frozen by date, but consumers should expect the next dated version to break with it as the model is refined.

## Repository layout

| Path | Purpose |
| --- | --- |
| [`specification/2026-05-04/`](specification/2026-05-04/) | Declarative Company specification, draft `2026-05-04`. Read [`00-introduction.md`](specification/2026-05-04/00-introduction.md) first. |
| [`schema/2026-05-04/`](schema/2026-05-04/) | TypeScript source of truth and generated JSON Schema for the Declarative Company entity model, draft `2026-05-04`. |
| [`profiles/estonia/`](profiles/estonia/) | Estonia-specific bindings: legal forms, identifier types, e-MTA and X-Road touchpoints. |
| [`seps/`](seps/) | Specification Enhancement Proposals — the change-control mechanism for the project's specifications. |
| [`VISION.md`](VISION.md) | Why the project exists. |
| [`PRINCIPLES.md`](PRINCIPLES.md) | Constraints on the project's specification decisions. |
| [`GOVERNANCE.md`](GOVERNANCE.md) | How the project is stewarded. |
| [`CHANGELOG.md`](CHANGELOG.md) | Dated history of repository-level changes. |

## Reading order

1. [`VISION.md`](VISION.md) — the thesis.
2. [`PRINCIPLES.md`](PRINCIPLES.md) — the constraints.
3. [`specification/2026-05-04/00-introduction.md`](specification/2026-05-04/00-introduction.md) — what the Declarative Company draft is and is not.
4. The remaining Declarative Company sections, in order.
5. [`profiles/estonia/`](profiles/estonia/) — if you are implementing against Estonian infrastructure.

A motivated reader should be able to finish the draft in roughly thirty minutes.

## Contributions

The contribution model is not yet open. See [`GOVERNANCE.md`](GOVERNANCE.md) for the current phase and the planned transition. Once the substrate stabilizes, change proposals will land through the [`seps/`](seps/) process.

## License

Released under the [MIT License](LICENSE).
