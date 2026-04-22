# Vision

*This document is pre-alpha and subject to revision. It states intent, not commitment to specific technical choices.*

## The Agentic State needs an Agentic Company counterpart

A generation of digital-state infrastructure is being reframed, under the banner of the Agentic State, as a machine-actionable substrate: identity, registries, tax, and interoperability layers that agentic systems can interact with as natural counterparties, rather than as digitized versions of paper-era forms. This reframing only closes the loop if the *other* side of the interaction — the company — is also addressable in the same terms.

Today it is not. A company, as seen by any given system, is a fragmented bundle: a registry entry in one place, bylaws in a PDF somewhere, a list of signatories in a bank's CRM, mandate scopes in an accounting tool, compliance obligations in a spreadsheet, an event history scattered across email, minutes, and invoices. No two systems agree on what a company is or what it can do. Every integration re-models the same entity from scratch, and every agentic action against the state is bottlenecked on a human who can certify, on behalf of the company, that the action was authorized.

The Agentic Company Protocol exists to remove this bottleneck by giving the company itself a machine-readable, cryptographically-verifiable representation — one that is portable across systems, grounded in the same identity primitives the state already uses, and legible to agentic systems without bespoke integration.

## What an agentic company is

An agentic company, in the sense this protocol uses the term, is a company whose governance, authority relationships, and state exist as signed artifacts rather than as the backend of a particular product.

Concretely, this means:

- The company's identity is a cryptographic reference, not a row in any vendor's database.
- Its bylaws, roles, mandates, and delegations are documents signed by legally recognized signatories, verifiable independently of any platform.
- Actions taken on its behalf — contracts signed, filings made, payments authorized, resolutions adopted — are recorded as events in an append-only log, each event itself a signed artifact whose signatory and scope can be checked.
- Its current state — who its directors are, what mandates are active, what obligations are outstanding — is a projection over that event log, computable by any conforming implementation.
- Its interaction with state services, counterparties, and agentic systems happens through conventions defined by the protocol, not through platform-specific APIs.

An agentic company is not a company run by AI. It is a company whose structure is *available* to agentic systems: one whose authority can be checked mechanically, whose acts can be signed and verified mechanically, and whose history can be audited mechanically. Whether any given act is performed by a human or by an agent is a property of the signatory, not of the company.

## Why Estonia first

Estonia is the only jurisdiction where the preconditions for this protocol are already operational rather than aspirational.

Legal-person identity exists at the state level as the registrikood, and e-Residency extends company formation to non-residents. Personal identity is cryptographic and universally deployed: Smart-ID, Mobile-ID, and the eID card provide qualified electronic signatures backed by EU regulation. Document signing is standardized through BDOC and ASiC-E, already the default format for legally binding digital documents across the Estonian public and private sector. State interoperability is not a roadmap item; X-Road has been production infrastructure for over two decades. The commercial registry is API-accessible. Tax declarations, employment registration, and invoicing flow through state-operated services that already assume machine-to-machine interaction.

In most jurisdictions, a protocol of this kind would require inventing primitives that do not yet exist — a qualified signature stack, a registry API, a notion of machine-verifiable mandate. In Estonia, those primitives already exist and are legally binding. The protocol's job is to compose them, not to bootstrap them.

This is why the specification is being drafted Estonia-first. It is explicitly not Estonia-exclusive. The data model, signature abstractions, and event semantics are intended to map onto any jurisdiction with comparable digital identity infrastructure, and the EU's broader eIDAS framework is the longer-term portability target.

## What the protocol aims to standardize

The specification, once drafted, will cover at minimum:

- **Company identity** — how a legal person is canonically referenced across systems.
- **Governance artifacts** — the shape of bylaws, role definitions, mandates, delegations, and resolutions as signed documents.
- **Signatures** — how acts of the company are authorized and verified, binding to existing qualified-signature formats rather than inventing new ones.
- **Event log semantics** — the append-only record of company-level actions that is treated as the canonical history.
- **State projections** — how queryable present-tense state (current directors, active mandates, outstanding obligations) is derived from the log.
- **State-interaction conventions** — how a conforming company presents itself to state services and other agentic counterparties.

Each of these will be specified as conventions and schemas. None of them will mandate a particular runtime, storage system, or programming language.

## Non-goals

The protocol is not a product. It will not be sold, licensed, or gated. There is no hosted offering that "is" the Agentic Company Protocol.

The protocol is not a runtime. It does not prescribe how an implementation should be built, deployed, or operated. Conforming implementations may be libraries, services, SaaS products, or bespoke in-house systems.

The protocol is not a UI framework. It says nothing about how company data is displayed to humans.

The protocol is not a replacement for legal systems. It operates within existing company law and existing signature law; it does not attempt to codify either, and where the specification and applicable law differ, applicable law governs.

The protocol is not an attempt to define what a company should be. It is a convention for representing companies as they already are, in a form that agentic systems can work with.

## What comes next

Over the coming months, specification drafts will be published in the [`specification/`](specification/) directory. Each draft will be marked as such and will be subject to change without backward-compatibility guarantees until the specification reaches a tagged version.

Substantive community contributions are not yet invited. The protocol needs an initial coherent shape before collaborative drafting is productive. That shape will emerge from a small number of drafts over the coming months, at which point the contribution model will be defined and opened.

The goal of this repository, for now, is narrow: to plant a public flag, state the thesis, and establish the principles and governance model under which the specification will be developed. Everything beyond that is to be specified.
