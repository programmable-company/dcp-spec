# Principles

*These principles are pre-alpha and subject to revision. They are intended to constrain specification decisions, not to pre-empt them. The protocol underlying this project was originally drafted as the Agentic Company Protocol and then renamed to the Declarative Company Protocol; with this draft the project takes the umbrella name Programmable Company and Declarative Company Protocol (DCP) becomes the name of its first specification. References to the older names in external material refer to the same body of work.*

1. **Open specification.** Programmable Company is published under the MIT License. There are no licensees, no tiers of access, and no commercial gatekeeping. Anyone may implement, extend, or build products on it.

2. **Legal persons as the identity foundation.** The specification addresses companies and the natural or legal persons authorized to act on their behalf. It does not model "accounts," "users," or platform-scoped identities as primitives.

3. **Cryptographic identity tied to existing infrastructure.** Identity and signature primitives bind to the identity systems that already carry legal weight — in the first instance, Estonian and EU qualified-signature infrastructure (Smart-ID, Mobile-ID, eID, eIDAS) — rather than defining new identity systems.

4. **Machine-verifiable compliance artifacts.** Governance documents, mandates, resolutions, and acts of the company are expressed as signed artifacts whose authority and scope can be checked mechanically, without reliance on a trusted platform.

5. **Append-only event semantics; state as projection.** The canonical record of a company under this specification is an append-only log of signed events. All queryable state is derived from the log, not stored as an independent source of truth.

6. **Conventions over runtimes.** The specification defines data models, schemas, signature bindings, and semantics. It does not mandate a runtime, storage system, programming language, or deployment model. Conforming implementations may take any form.

7. **European digital sovereignty as a design constraint.** The specification is designed to work end-to-end on European digital infrastructure, with no required dependencies on systems operating outside EU jurisdictional control. This is a design constraint, not a marketing position.

8. **Grounded in working infrastructure.** The specification binds to primitives that are already operational and legally recognized, rather than primitives that would need to be invented or standardized first.

9. **Foundation-stewarded future.** Long-term stewardship of Programmable Company will be vested in an independent Estonian Sihtasutus (foundation), to be formed in 2027. The current maintainer has committed not to serve as that foundation's executive director. Foundation governance will be independent from day one.

10. **Commercial implementations welcome and unprivileged.** Products and services built on Programmable Company are expected and encouraged. No commercial implementation — including any operated by the current maintainer or affiliated entities — has or will have a privileged relationship with the specification or its future foundation.

11. **Legible to humans, executable by machines.** Specification documents are written to be readable by lawyers, engineers, and regulators, and structured to be processed by agentic systems. Neither audience takes precedence over the other.
