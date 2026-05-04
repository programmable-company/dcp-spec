# SEPs — Specification Enhancement Proposals

A **Specification Enhancement Proposal** (SEP) is the change-control mechanism for the Programmable Company project. Substantive changes to any of the project's specifications (currently: Declarative Company), to a schema, or to any profile are introduced through a SEP: the proposal is drafted, discussed, and resolved, and the resolution is what lands in the next dated draft.

The SEP process is modeled on Python's [PEP-1](https://peps.python.org/pep-0001/) and the Model Context Protocol's [SEP process](https://github.com/modelcontextprotocol/modelcontextprotocol). It is intentionally lightweight in this pre-alpha phase; it is expected to formalize as the specification matures.

## Status

**Pre-alpha.** SEPs are not yet open for community submissions. The template is published so that the maintainer's own change proposals can be drafted in the form that will be used once the process opens, and so that interested observers can see the intended structure.

See [`../GOVERNANCE.md`](../GOVERNANCE.md) for the broader governance context.

## When a SEP is required

A SEP is required when a change would:

- Alter normative requirements in the core specification (`MUST`, `SHOULD`, `MAY`).
- Introduce, remove, rename, or repurpose a field or type in the schema.
- Change canonicalization, signing, capability negotiation, or versioning rules.
- Introduce a new mandatory capability.
- Promote a profile-defined element to the core specification, or vice versa.
- Change the SEP process itself (a meta-SEP).

A SEP is **not** required for editorial changes (typos, clearer phrasing, examples, tests). Those land as ordinary commits.

## When a SEP is allowed without being required

Anything that affects how the project's specifications are implemented or perceived MAY be a SEP, even if not strictly required. New module specifications (`accounting/v1`, etc.) are SEPs by construction: each module is a substantive addition. The eventual programmable-layer specification will arrive through SEPs as well.

## Numbering

SEPs are numbered sequentially: `SEP-0001`, `SEP-0002`, … The template at [`SEP-0000-template.md`](SEP-0000-template.md) is reserved as the canonical template and is not a SEP itself.

The maintainer assigns numbers when a SEP is accepted into the discussion track. Until then, drafts may circulate without a number.

## Lifecycle

A SEP moves through these statuses:

| Status | Meaning |
| --- | --- |
| `Draft` | Authored but not yet under formal discussion. |
| `Discussion` | Under public discussion. The maintainer (and, post-foundation, the foundation) tracks the discussion and surfaces unresolved threads. |
| `Accepted` | Resolution agreed; awaiting incorporation into the next dated draft. |
| `Rejected` | Resolution against. The SEP remains in the repository as a record. |
| `Withdrawn` | The author(s) withdrew the SEP. The SEP remains in the repository. |
| `Superseded by SEP-NNNN` | A later SEP replaces this one. |

A SEP that is `Accepted` lands in the next dated specification draft. The SEP itself is not modified after acceptance; the modified specification is what becomes normative.

## Where SEPs land

Once accepted, the SEP's content is incorporated into the relevant section(s) of the next dated draft (`specification/<DATE>/`, `schema/<DATE>/`, `profiles/<profile>/`). The SEP itself remains in this directory as an immutable record of the change rationale.

## What a SEP must contain

See the template at [`SEP-0000-template.md`](SEP-0000-template.md). Briefly:

- **Title and number.**
- **Status.**
- **Author(s).**
- **Created, last-updated, and resolved dates.**
- **Abstract** — one paragraph.
- **Motivation** — why is the change needed?
- **Specification** — what exactly changes? With references to the relevant specification sections.
- **Rationale** — why this design over alternatives?
- **Backwards compatibility** — what breaks?
- **Security considerations.**
- **Discussion** — links to discussion venues.
- **Resolution** — the outcome and rationale.
