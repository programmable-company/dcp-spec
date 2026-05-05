# 03 — e-MTA integration (Estonia profile)

> **Status: skeleton.** This section sketches the e-MTA touchpoints the full Estonia profile will specify. Concrete normative content is deferred until the corresponding `compliance/ee-tax/*` and `accounting/*` module specifications exist; the binding from those modules into DCP will live here.

## What e-MTA is

[e-MTA](https://www.emta.ee/en/business-client) is the Estonian Tax and Customs Board's electronic services platform. Most statutory tax interactions for Estonian legal persons — tax returns, VAT returns, employment registrations, payroll declarations, customs filings — flow through e-MTA, either directly or via X-Road.

For DCP, e-MTA is significant because it is the production realization of "the state expects machine-readable inputs and produces machine-readable outputs," for the largest single class of statutory obligations a typical Estonian entity has.

## Scope of this section

The Estonia profile will specify:

- **Identifier touchpoints.** Where e-MTA's identifiers (transaction IDs, decision references) appear in DCP artifacts. Most of these are not entity-level identifiers and do not register as `Identifier.type`; they appear in event payloads and document content for specific compliance capabilities.
- **Document classes for e-MTA submissions.** How an outgoing tax return, VAT return, employment registration, or customs filing is represented as a `Document` before submission, and how the e-MTA-issued receipt is recorded as a follow-on `Document` referencing the submission.
- **Event types for e-MTA-bound actions.** Names like `compliance.ee-tax.return-filed`, `compliance.ee-tax.return-accepted`, `compliance.ee-tax.return-rejected`. These live in the corresponding `compliance/ee-tax/*` capability specification, not in the core profile; the profile records the binding.
- **Trust handling.** e-MTA's responses are signed by EMTA infrastructure under the Estonian Trusted List. The profile will specify how those signatures resolve in the same JWS / JAdES verification path the rest of DCP uses.

## Skeleton subsections (to be expanded)

### Tax periods and calendars

> **Skeleton.** Estonian tax periods (monthly, quarterly, annual) interact with the event log in non-trivial ways: a reporting period closes at a calendar moment, but the events that constitute it accumulate before that moment. The profile must define how a DCP repository captures "this set of events constitutes the period's filings" without enabling backdating.

### VAT (käibemaks)

> **Skeleton.** Bindings for VAT registration status, VAT-period filings, and VAT receipts. Most of the substance lives in a future `compliance/ee-vat/v1` module; this section will register the e-MTA identifiers and document classes used by that module.

### Employment and payroll (TÖR + payroll declarations)

> **Skeleton.** The Employment Register (TÖR) and monthly payroll declarations (TSD). Most of the substance lives in a future `people/v1` module; this section will register the corresponding e-MTA touchpoints.

### Corporate income tax

> **Skeleton.** Estonia's distributed-profit corporate-income-tax model interacts with capital events in a way that will need careful capability design. The profile will reference the future `compliance/ee-cit/v1` module.

### Customs and excise

> **Skeleton.** For entities engaged in cross-border trade, customs and excise interactions flow through e-MTA. Likely a future `compliance/ee-customs/v1` module.

## Out of scope for this profile

- The internal procedural rules of e-MTA. The profile binds DCP artifacts to e-MTA's external interfaces; it does not specify EMTA's behavior.
- Tax law. Where this profile and Estonian tax law differ, applicable law governs.
- Tax advice. DCP is a representation, not a planning tool.

## Open questions

- **Submission channel.** e-MTA submissions can flow over X-Road (`compliance/ee-tax` capability binding to X-Road, see [§04](04-x-road.md)) or via the e-MTA front-end (a human or service producing a signed submission). The profile probably records the channel in the event payload, but may need to mandate a particular default. TODO(SEP-XXXX).
- **Acknowledgement linking.** When e-MTA acknowledges a submission, the resulting acknowledgement document needs to be linkable back to the submission. The natural primitive is `Document.provenance.supersedes` for amendments, but acknowledgements are a different relationship — possibly a new `provenance.acknowledges` field, or a capability-defined event linking submission to acknowledgement.
