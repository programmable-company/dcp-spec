# 02 — Identifier types (Estonia profile)

> **Status: skeleton.** This section enumerates the Estonian identifier types the full profile will register. Each type below will receive a normative subsection covering format, validation, and resolution.

## Identifier types registered by the profile

The Estonia profile registers the following `Identifier.type` values. A repository under the Estonia profile MUST validate identifiers of these types per the rules in this section.

| `type` | Subject | Issuer | Scope | Status |
| --- | --- | --- | --- | --- |
| `ee.registrikood` | Estonian commercial / non-profit registry code | RIK (Centre of Registers and Information Systems) | `EE` | Skeleton |
| `ee.kmkr` | VAT registration number (KMKR-number) | EMTA (Estonian Tax and Customs Board) | `EE` | Skeleton |
| `ee.emtak` | EMTAK economic-activity classification code | Statistics Estonia | `EE` | Skeleton |
| `ee.isikukood` | Personal identification code (only when carried by a `FIE`) | Estonian state | `EE` | Skeleton |
| `eu.euid` | EU Business Registers Interconnection System (BRIS) identifier | EU member state registry | `EU` | Skeleton |
| `iso.lei` | Legal Entity Identifier | GLEIF | `GLOBAL` | Skeleton |

`iso.lei` is jurisdiction-neutral and so will likely move to a shared profile module in a future draft; it is listed here because its presence is common on Estonian legal persons.

## What each binding will specify

For each identifier type, the full profile will define:

- **Format.** Regular expression and (where applicable) check-digit procedure.
- **Issuer.** The authoritative source of the identifier; not the same as the value of `Identifier.issuer`, which is informational.
- **Scope.** The geographic or jurisdictional scope at which the identifier is unique.
- **Resolution.** Where, in machine-readable form, a value of this type can be resolved to its source record. (E.g. RIK's [Avaandmete API](https://avaandmed.ariregister.rik.ee/) for `ee.registrikood`.)
- **Pairing rules.** Which identifier types MUST or MUST NOT co-occur on the same entity.
- **Lifecycle.** When the identifier becomes valid, when it can be revoked, and how revocation interacts with the entity's lifecycle events.

## Skeleton sections

### `ee.registrikood`

> **Skeleton.** 8-digit numeric code assigned by RIK to every entity entered in the Commercial Register, the Non-profit Associations and Foundations Register, the State Register, or the Self-employed Register. The first digit indicates the register; values are stable across a registered entity's lifetime.

The full profile will specify:

- The exact pattern (`^\d{8}$`).
- The mapping from leading digit to register.
- The relationship between `Entity.id` and `ee.registrikood`: every Estonia-profile entity that is registered MUST carry this identifier; the recommended `Entity.id` form is `pc:ee:registrikood:<code>`.
- The resolution endpoint and caching expectations.

### `ee.kmkr`

> **Skeleton.** VAT registration number issued by EMTA. Format: `EE` followed by nine digits (`^EE\d{9}$`). Optional — many small Estonian entities are not VAT-registered. When present, MUST be issued for the same legal person identified by `ee.registrikood`.

### `ee.emtak`

> **Skeleton.** EMTAK is the Estonian classification of economic activities, derived from NACE. An entity may carry zero or more `ee.emtak` identifiers, one per declared activity. Format: 5-digit numeric code per the EMTAK 2008 (or successor) classification.

### `ee.isikukood`

> **Skeleton.** Personal identification code (11 digits, with embedded date-of-birth and check digit) of the natural person operating under a `FIE` legal form. The full profile will specify when this identifier appears on the entity itself versus on a related-party `Document`.

### `eu.euid`

> **Skeleton.** The EU-wide BRIS identifier for cross-border legal-person identification. Form: `EE.<registry-code>.<registrikood>`, where `<registry-code>` is the BRIS-assigned code for the relevant Estonian register. RECOMMENDED for entities that interact with non-Estonian EU counterparties.

### `iso.lei`

> **Skeleton.** 20-character ISO 17442 Legal Entity Identifier issued by a GLEIF-accredited Local Operating Unit. Required for any entity participating in financial-market-infrastructure obligations that mandate LEI; otherwise optional.

## Identifier-bound capabilities

Some identifier types imply capabilities. For example, an entity carrying an `ee.kmkr` is a VAT-registered entity, and a future `compliance/ee-vat/v1` capability would presume the presence of `ee.kmkr`. These bindings will be specified by the corresponding capability documents, not here. This section only registers the identifier types themselves.

## Open questions

- **Historical identifiers.** When an entity transitions between forms (`OÜ` → `AS`), the `ee.registrikood` MAY change in some legal cases. The profile must define whether a changed code is recorded as identifier-revoked + identifier-added, or whether it requires a different lifecycle event.
- **Privacy.** `ee.isikukood` is sensitive personal data under GDPR. The profile must clarify when and how it appears in artifact bytes; the safest default is *never directly*, with `kid`-bound resolution to the personal code via Trusted-List-anchored certificate lookup.
