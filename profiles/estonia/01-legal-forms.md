# 01 — Legal forms (Estonia profile)

> **Status: skeleton.** This section enumerates the legal-form bindings the full Estonia profile will define. Each form below will receive a normative subsection.

## Permitted `Entity.legalForm` values

A repository declaring `Entity.profile = "estonia"` MUST set `Entity.legalForm` to one of the values below. The values are the Estonian-language abbreviations as used in the [Estonian Commercial Code](https://www.riigiteataja.ee/en/eli/ee/513052022004/consolide/current) and on RIK records.

| Value | Meaning | English gloss | Status in this draft |
| --- | --- | --- | --- |
| `OÜ` | Osaühing | Private limited company | Skeleton |
| `AS` | Aktsiaselts | Public limited company | Skeleton |
| `FIE` | Füüsilisest isikust ettevõtja | Sole proprietorship | Skeleton |
| `MTÜ` | Mittetulundusühing | Non-profit association | Skeleton |
| `SA` | Sihtasutus | Foundation | Reserved (not in first profile draft) |
| `TÜ` | Täisühing | General partnership | Reserved |
| `UÜ` | Usaldusühing | Limited partnership | Reserved |
| `KÜ` | Korteriühistu | Apartment association | Reserved |
| `Tulundusühistu` | Tulundusühistu | Commercial association | Reserved |

The first four (`OÜ`, `AS`, `FIE`, `MTÜ`) are scoped for the first complete profile draft. The remainder are reserved — they MAY be used, but the full profile will not define their bindings until a later revision.

## What each binding will specify

For each legal form, the full profile will define:

- **Required identifiers.** Which of the identifier types in [§02](02-identifiers.md) MUST appear on a conformant entity of this form. (E.g. an `OÜ` MUST carry an `ee.registrikood`; an `FIE` MUST carry an `ee.registrikood` *and* an `ee.isikukood` of the proprietor.)
- **Required capabilities.** Whether the legal form implies any capabilities beyond the mandatory `core/identity` and `core/lifecycle`. (E.g. a `MTÜ` may be required to declare a `governance/v1` capability for board events.)
- **Required documents.** Which classes of `Document` are mandatory. (E.g. an `OÜ`'s articles of association.)
- **Lifecycle event constraints.** Which `core.lifecycle.*` payload variants are valid for this form, and which are nonsensical (e.g. you cannot rename a `FIE` independently of renaming the underlying natural person).
- **Termination semantics.** What `core.lifecycle.dissolved` means for this form, and whether intermediate states (e.g. liquidation under `OÜ`) need to be modeled.

## Skeleton sections

### `OÜ` — Osaühing (Private limited company)

> **Skeleton.** The most common Estonian legal form, including most e-Residency-formed companies. Required identifiers will include `ee.registrikood`. Required capabilities expected to include `governance/v1` once governance is specified.

### `AS` — Aktsiaselts (Public limited company)

> **Skeleton.** The standard form for share-capital companies above OÜ scale. Will require the same baseline as `OÜ` plus extensions for share registry binding (Nasdaq CSD or RIK depository, depending on listing).

### `FIE` — Füüsilisest isikust ettevõtja (Sole proprietorship)

> **Skeleton.** Distinguished by the entity being a natural person operating in commercial capacity. The `Entity.id` form, identifier requirements, and dissolution semantics differ materially from the corporate forms; the full profile will need to address whether a `FIE`'s Declarative Company identity is separable from the underlying natural person.

### `MTÜ` — Mittetulundusühing (Non-profit association)

> **Skeleton.** Differs from `OÜ` primarily in its statutory purpose and its members-not-shareholders structure. Required documents will include the association's articles (`põhikiri`).

## Open questions

- **Form changes.** Estonian law permits some inter-form transitions (e.g. `OÜ` → `AS`). Does Declarative Company model this as a `core.lifecycle.legalForm-changed` event, or as a dissolution-and-reformation? The full profile will need to take a position. TODO(SEP-XXXX).
- **Branches.** Foreign-company branches registered in Estonia have a `registrikood` but are not themselves Estonian legal persons. The profile will need to decide whether they appear as Estonian-profile entities or as identifiers on foreign-profile entities.
