# 05 — Signing

Declarative Company Protocol (DCP) artifacts are signed using JSON Web Signatures ([RFC 7515](https://www.rfc-editor.org/rfc/rfc7515), "JWS") in the JAdES profile ([ETSI TS 119 182-1](https://www.etsi.org/deliver/etsi_ts/119100_119199/11918201/), "JAdES"). JAdES is the JSON-form analogue of CAdES/XAdES; it is the format eIDAS-aligned trust services produce and verify.

This section specifies how those formats are applied to DCP artifacts.

## Signature placement

By default, signatures are stored as **sidecar files** alongside the artifacts they sign. For an artifact at `<path>`:

- A single signature lives at `<path>.jws`.
- Countersignatures live at `<path>.<kid-or-label>.jws`, one file per signatory, where `<kid-or-label>` is a stable, profile-defined slug derived from the signing key identifier or signer role.

Sidecar placement is preferred because it keeps the signed payload bytes pure JSON. The bytes that the signature binds to are therefore exactly the bytes a reader sees when opening the artifact, with no signature-stripping pre-processing required.

For transports where sidecars are inconvenient (single-file uploads, message envelopes), the signature MAY be **embedded** in a wrapper object:

```json
{
  "artifact": { /* canonicalized JSON of the signed object */ },
  "_sig": [
    "<JWS-compact-or-flattened-JSON-form>",
    "..."
  ]
}
```

Embedded form is permitted only at the boundary; the canonical representation in a DCP repository is the unwrapped artifact + sidecar `.jws`. Tooling that produces the embedded form for transport MUST be able to convert back to unwrapped form at the destination, and verifiers MUST treat embedded and sidecar signatures over the same canonicalized bytes as equivalent.

## JWS form

Sidecar signatures are written in **JWS Flattened JSON Serialization** (RFC 7515 §7.2.2):

```json
{
  "protected": "<base64url-encoded protected header>",
  "payload": "",
  "signature": "<base64url-encoded signature>",
  "header": { /* unprotected header, optional */ }
}
```

The signature is **detached**: `payload` MUST be the empty string `""`. The bytes that the signature binds to are the JCS-canonicalized bytes of the signed artifact (see [§04](04-canonicalization.md)), prepended by the standard JWS signing input construction (`BASE64URL(UTF8(protected_header)) || '.' || BASE64URL(canonicalized_artifact_bytes)`).

JWS Compact Serialization MAY be used in the embedded `_sig` form. Sidecar files MUST use the flattened form for tooling compatibility with JAdES annotations.

## Protected header requirements

The JWS `protected` header MUST contain at least:

| Header | Value |
| --- | --- |
| `alg` | One of the algorithms in the allowlist below. |
| `b64` | `false`. Indicates detached payload (RFC 7797). |
| `crit` | MUST include `"b64"` and any JAdES-specific headers used. |
| `kid` | Stable key identifier. Profiles bind the form to their identity infrastructure. |
| `cty` | `application/dcp+json` for DCP JSON artifacts. |

JAdES-specific headers are encoded under the `etsiU` (unsigned) and `etsiP` (signed/protected) namespaces per ETSI TS 119 182-1. The `2026-05-04` draft requires only the `etsiU.x5t#S256` (signing certificate digest) header at the **B-B** baseline; further levels are deferred (see *JAdES level* below).

## Algorithm allowlist

For the `2026-05-04` draft, the permitted JWS `alg` values are:

| `alg` | Use |
| --- | --- |
| `ES256` | ECDSA over P-256 with SHA-256. Recommended for new keys. |
| `ES384` | ECDSA over P-384 with SHA-384. Permitted for HSM-backed keys. |
| `RS256` | RSASSA-PKCS1-v1_5 with SHA-256. Permitted for legacy registry keys. |
| `PS256` | RSASSA-PSS with SHA-256. Permitted for newer RSA infrastructures. |

Other algorithms (HS-*, EdDSA over Ed25519, etc.) MUST NOT be used. They are excluded either because they are not symmetric-secret-free (HS-*) or because eIDAS qualified-signature service support is not yet ubiquitous enough to be safely required (EdDSA). Future drafts MAY add EdDSA and other curves; consumers MUST reject `alg` values not in the allowlist of the spec version they implement.

## Key identifiers

The `kid` claim is a stable identifier for the signing key. DCP itself imposes no internal structure on the `kid` string beyond uniqueness within a producer's signing infrastructure.

Profiles bind `kid` to their identity infrastructure. The Estonia profile (see [`profiles/estonia/`](../../profiles/estonia/)) defines `kid` forms for Smart-ID, Mobile-ID, and the Estonian eID card.

The `kid` is what `Document.provenance.createdBy` and `Event.actor` refer to. The mapping from `kid` to a legal person — natural or legal — is profile-defined. The core specification only requires that the mapping be deterministic and verifiable: given a `kid` and a trust anchor, a verifier can establish "the signer of this artifact is X" without consulting a private system.

## JAdES level

The `2026-05-04` draft requires **JAdES B-B** at minimum: a signature with the signing certificate digest in the protected header (`etsiU.x5t#S256`) and no archival timestamping.

Higher levels — **B-T** (with a trusted timestamp), **B-LT** (with revocation data captured at signing time), and **B-LTA** (with archive timestamping for long-term validity) — are RECOMMENDED for any artifact whose long-term verifiability matters (formation events, dissolution events, durable mandates).

TODO(SEP-XXXX): which JAdES level beyond B-B is appropriate for which artifact class. Candidates: requiring B-T for all events, B-LT for `core.lifecycle.formed` and `core.lifecycle.dissolved`, B-LTA optionally. The decision turns on whether timestamp authorities are reliably available across all profiles; for the Estonia profile, they are, but that does not generalize. Until the SEP resolves, conformant producers MAY produce signatures at any JAdES level B-B or higher; verifiers MUST accept any level B-B or higher.

## Verification procedure

To verify a single signed artifact:

1. **Locate the signature.** For an artifact at `<path>`, open `<path>.jws` (or the relevant countersignature sidecar). For embedded form, extract the JWS from the wrapper.
2. **Canonicalize the artifact.** Apply JCS per [§04](04-canonicalization.md) to the artifact bytes. The result is the *signing input payload*.
3. **Reconstruct the JWS signing input.** Concatenate `BASE64URL(UTF8(protected_header)) || '.' || BASE64URL(canonical_payload)`. Confirm `b64` is `false` in the protected header before computing.
4. **Resolve the key.** Use `kid` (and profile-bound resolution) to obtain the signing key and its certificate chain.
5. **Verify the signature** using the JWS algorithm in the protected header. Reject if `alg` is not in the allowlist.
6. **Validate the certificate chain** to a trust anchor recognized by the profile. Reject if the certificate was not valid at the artifact's `timestamp` (for events) or `provenance.createdAt` (for documents).
7. **Validate JAdES requirements** appropriate to the level claimed: certificate digest match for B-B; trusted-timestamp validity for B-T; revocation evidence for B-LT; archive timestamps for B-LTA.

A verifier that fails any of (1)–(7) MUST treat the signature as invalid and the artifact as unsigned. A verifier MUST NOT silently downgrade.

## Trust anchors

Trust anchors are profile-defined. The core specification does not enumerate them — to do so would either privilege a single jurisdiction or grow the specification unboundedly. Profiles list:

- The acceptable trust service providers (TSPs) for their jurisdiction.
- The acceptable certificate policies and policy OIDs.
- The acceptable timestamp authorities (TSAs) for B-T and higher.
- The mapping from `kid` to trust anchor.

For the Estonia profile, the acceptable TSPs are those listed on the Estonian Trusted List (and, by composition, the EU Trusted List per eIDAS). Other profiles will list their corresponding lists.

## What signatures protect, and what they do not

A valid DCP signature establishes:

- The signed bytes were produced by the holder of the key identified by `kid`.
- The signed bytes have not been altered since signing (within the bounds of the canonicalization rules).
- At the time of signing (per the timestamp authority, if B-T or higher), the signing certificate was valid and not revoked.

A valid signature does **not** establish:

- That the signer was authorized, in the company-law sense, to take the action described. Authorization is a property of the company's governance state at the time of the action, computed by replaying mandates and resolutions in the event log. Signatures bind authority to action, but do not by themselves confer authority.
- That the signer was a natural person or a legal person. The `kid` is profile-bound; profiles define the mapping.
- That the signed action is legally enforceable. That is a question of substantive law in the jurisdiction concerned; this specification provides the cryptographic substrate but does not opine on legal effect.

## Counter-signatures and multi-party signing

A document may need multiple signatures — a board resolution signed by every board member, a contract signed by both parties. DCP expresses these as **separate sidecar files**, one per signer:

```
documents/<doc-id>/document.json
documents/<doc-id>/document.json.<kid-1>.jws
documents/<doc-id>/document.json.<kid-2>.jws
documents/<doc-id>/document.json.<kid-3>.jws
```

Each sidecar is an independent JWS over the same canonicalized payload. The order of signatures is not implied by the file system; if order matters (e.g. because a chain of countersignatures is required by capability semantics), the order MUST be encoded explicitly in the document's `provenance` or in an event referencing the document.

Multi-signature schemes that bind signatures into a single JWS (the `signatures` array form, RFC 7515 §7.2.1) MAY be used in embedded form but MUST be expanded into per-signer sidecars when stored in a repository.
