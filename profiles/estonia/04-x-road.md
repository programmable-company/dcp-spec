# 04 — X-Road considerations (Estonia profile)

> **Status: skeleton.** This section sketches how the full Estonia profile will treat X-Road. Concrete normative content depends on the eventual programmable layer; the declarative layer can only describe the artifacts that X-Road interactions produce.

## What X-Road is

[X-Road](https://www.ria.ee/en/state-information-system/x-tee.html) is Estonia's data-exchange layer between state services and authorized non-state systems. It has been production infrastructure for over twenty years. From a DCP perspective, X-Road is significant because:

- Many state services that an Estonian legal person interacts with — RIK, EMTA, TÖR, e-Health, Police and Border Guard, the Land Register, others — are reachable as X-Road services.
- X-Road authorization is itself a form of capability declaration: a subsystem registered on X-Road has a stable identifier, a defined set of services it can call, and signed message exchanges that constitute its interactions.
- The cryptographic substrate X-Road uses is consistent with the eIDAS infrastructure DCP adopts for signing.

## What this section will specify

The Estonia profile, once expanded, will specify:

- **X-Road subsystem identification.** How a DCP repository that operates an X-Road subsystem declares it. Likely as a capability (`ee.x-road/v1`) whose `params` include the subsystem identifier (`<member-class>/<member-code>/<subsystem-code>`).
- **Service-call event semantics.** The event types that record outgoing X-Road service calls and incoming responses. Most of these will live in the `compliance/*` and `accounting/*` modules that exercise X-Road; the profile records the binding from those modules to the X-Road capability.
- **Identity handling.** How the personal-identification or legal-person identifier carried in an X-Road service-call header maps to `Event.actor` / `Document.provenance.createdBy`.
- **Mutual authentication.** How X-Road's service-call authentication artifacts are preserved and verifiable in the DCP event log.
- **Request and response retention.** How X-Road message bodies — typically substantial XML — are retained as `Document` content (most likely by reference, not inline).

## Where the boundary sits

The declarative-layer specification does not concern itself with the *act* of making an X-Road request. That belongs to the programmable layer, which is out of scope for the `2026-05-04` core draft. What the declarative layer (and this profile) does specify is the *artifact* that an X-Road interaction leaves behind:

- A signed request document.
- A signed response document.
- An event linking them.

Tooling that operates on a DCP repository can verify these artifacts after the fact without participating in the X-Road call itself. This separation is deliberate: it means archived DCP repositories remain auditable even after X-Road message-bus implementations evolve.

## Skeleton subsections (to be expanded)

### Subsystem registration

> **Skeleton.** How a DCP repository that intends to operate an X-Road subsystem records the registration. Probably a `core.lifecycle.capability-added` event introducing the `ee.x-road/v1` capability, with the subsystem identifier in `params`.

### Service-call artifacts

> **Skeleton.** The shape of the request, response, and linking event. Likely uses `Document` with `content: ContentByReference` for the request and response payloads, and an event of type `ee.x-road.call` whose `payload` references both.

### X-Road security server identity

> **Skeleton.** How the security server's certificate and the message signature relate to the JWS verification path used elsewhere in this specification. Both are eIDAS-aligned; the profile will specify the exact relationship.

### Replay and idempotency

> **Skeleton.** X-Road provides message-id semantics that are useful for de-duplicating service calls. The profile will specify whether and how those identifiers appear in the corresponding event.

## Open questions

- **Capability granularity.** A single `ee.x-road/v1` capability is convenient for declaration but coarse for negotiation. A consumer may care that an entity operates an X-Road subsystem capable of *receiving* RIK service calls, not that it operates an X-Road subsystem in general. The profile may need to introduce sub-capabilities or capability `params` enumerating the registered services.
- **Outgoing vs. incoming.** Most X-Road interactions a typical OÜ has are *outgoing* (it consumes state services). Some entities — banks, telcos, regulators — are also *providers*. The profile will need to distinguish; likely as separate capabilities (`ee.x-road/consumer/v1`, `ee.x-road/provider/v1`) or as `params` flags.
- **Long-term archival.** X-Road message bus retention is bounded; long-term archival of the messages themselves becomes the entity's responsibility. The profile will specify retention requirements for X-Road artifacts at JAdES level B-LTA. TODO(SEP-XXXX).
