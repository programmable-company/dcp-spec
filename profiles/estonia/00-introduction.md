# 00 — Introduction (Estonia profile)

## Profile mechanics

A profile binds the jurisdiction-neutral core specification to a specific legal and infrastructural context. A repository selects the Estonia profile by setting `Entity.profile = "estonia"` in `entity.json`; from that point, all profile-defined constraints apply in addition to the core specification.

This document is the entry point. The remaining sections in this directory cover legal-form bindings ([§01](01-legal-forms.md)), identifier types ([§02](02-identifiers.md)), e-MTA integration ([§03](03-emta-integration.md)), and X-Road ([§04](04-x-road.md)).

## Relationship to the core specification

The core specification — under [`specification/<DATE>/`](../../specification/) — is the substrate. It defines the data shapes, canonicalization, signing, capability negotiation, and versioning. The Estonia profile does **not** modify the core specification. It only:

- Restricts where the core specification leaves freedom (e.g. enumerating permitted `Entity.legalForm` values for Estonian entities).
- Names trust anchors and key-resolution rules where the core specification defers to profiles (e.g. `kid` forms for Smart-ID, Mobile-ID, ID-card).
- Adds requirements specific to Estonian context (e.g. mandating that a DCP repository corresponding to a registered Estonian legal person carries an `ee.registrikood` identifier).

A repository conformant to the Estonia profile is conformant to the core specification by construction. The reverse is not true: a core-conformant repository declaring a different profile (or no profile) is not subject to Estonia profile rules.

## eIDAS context

> Skeleton. To be filled in once the core signing rules ([§05](../../specification/2026-05-04/05-signing.md)) are exercised against Estonian Trusted List data.

Topics this section will cover:

- The Estonian Trusted List as the trust-anchor source for the profile.
- The relationship between the Estonian Trusted List and the EU Trusted List under eIDAS.
- Which qualified-trust-service providers (QTSPs) produce `kid`-resolvable certificates for Smart-ID, Mobile-ID, and ID-card signatures.
- Required JAdES levels for different artifact classes (formation, governance, transactional). TODO(SEP-XXXX), tracked in the core spec.
- Time-stamping authority selection for B-T and higher.

## Identity binding (informative outline)

> Skeleton. Each row will be expanded into a normative subsection.

| Estonian identity primitive | `Event.actor` / `Document.provenance.createdBy` form |
| --- | --- |
| ID-card | `kid:ee:idcard:<personal-identification-code>#<key-id>` |
| Mobile-ID | `kid:ee:mobile-id:<personal-identification-code>#<key-id>` |
| Smart-ID | `kid:ee:smart-id:<personal-identification-code>#<key-id>` |
| e-Residency card | Same form as ID-card; the e-Residency card is an ID-card variant. |
| Legal-person seal (digital company stamp) | `kid:ee:seal:<registrikood>#<key-id>` (binding rules deferred) |

Resolution from `kid` to a verifiable certificate is via Estonian Trusted List endpoints; the precise URL pattern and caching rules are deferred to the full profile.

## Open questions for the full profile

These questions are deferred. They are surfaced here so reviewers can flag any that would be a blocker:

- Should the profile mandate that every event be signed at JAdES level B-T or higher (i.e. with a trusted timestamp)? Estonia has reliable TSAs; the answer is "probably yes, with TSA selection deferred to the operator," but it deserves a SEP-level discussion before being normative.
- Should the profile require that a registered Estonian legal person's `Entity.id` be the `pc:ee:registrikood:<code>` form, or permit the `pc:genesis:<hash>` form? Probably the former for any entity that *has* a registry entry; the latter for pre-registration drafts. TODO(SEP-XXXX).
- How does the profile express e-Residency? An e-resident-formed OÜ is structurally identical to a resident-formed OÜ, but some downstream consumers may want to distinguish. Probably as an Identifier (`ee.e-residency`) on the founder, not the company.
- How does X-Road's authorization model map to DCP's capability model? Probably as a capability (`ee.x-road/v1`) declaring the X-Road subsystem identifier. TODO(SEP-XXXX).
