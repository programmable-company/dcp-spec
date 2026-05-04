# 04 — Canonicalization

Signatures over JSON require a deterministic byte-level encoding: any two implementations that serialize "the same JSON value" must produce identical bytes, or signatures will fail to verify across implementations. Declarative Company adopts JSON Canonicalization Scheme ([RFC 8785](https://www.rfc-editor.org/rfc/rfc8785), "JCS") for this purpose.

## What gets canonicalized

The following artifacts are signed and therefore canonicalized:

- Every **Event** under `events/`.
- Every **Document** envelope (`document.json`).
- The **Entity** projection (`entity.json`), when stamped.

Bytes referenced by `Reference.hash` are the **canonicalized** bytes of the referenced artifact. When `Reference` points at a non-JSON resource (e.g. a PDF stored under `documents/<id>/content/`), the hash is over the resource's raw bytes; canonicalization does not apply to non-JSON content, but the JSON envelope that references it is still canonicalized.

The `Conformance` and `Capabilities` discovery files under `.programmable-company/` are **not** signed and **not** canonicalized for signing purposes. They are caches; their integrity follows the integrity of `entity.json`.

## What JCS does

JCS specifies, briefly:

- UTF-8 output, no byte-order mark.
- Object keys sorted lexicographically by their UTF-16 code units.
- Strings escaped per the most compact RFC 8259 form (only the characters that must be escaped are escaped, and `\u` escapes are lowercase).
- Numbers serialized per ECMAScript `Number.prototype.toString` for finite values; `NaN` and infinities are not permitted in JCS output.
- No insignificant whitespace (no spaces, no newlines).
- Arrays preserve their input order.

For the precise rules, refer directly to [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785). This specification does not restate them; it adopts them.

## Producer requirements

A producer MUST canonicalize an artifact via JCS before computing its hash, before computing its signature, and before storing it on disk if the producer wishes the on-disk bytes to match the signed bytes (this is RECOMMENDED for events and documents; it makes verification a byte comparison rather than a re-canonicalization).

Producers MUST NOT include `NaN`, `+Infinity`, or `-Infinity` in any artifact field. Producers MUST NOT use numbers that cannot be represented exactly as IEEE 754 double-precision (in particular, integer fields that may exceed 2⁵³ MUST be encoded as strings).

Producers SHOULD NOT use floating-point numbers in artifact bytes at all. The `2026-05-04` schema does not introduce any floating-point fields; if a downstream capability needs decimal precision (currency amounts, share counts), it SHOULD encode them as strings (e.g. `"1234.56"`) and document the parsing rule in the capability specification.

## Verifier requirements

A verifier given the bytes of an artifact MUST canonicalize them via JCS and MUST use the canonicalized bytes for hash computation and signature verification, regardless of the on-disk form. This means a producer that writes pretty-printed JSON does not break verification; it only forces the verifier to re-canonicalize.

A verifier given a `Reference.hash` MUST:

1. Resolve the referenced bytes (by the `uri` hint or by repository search).
2. Re-canonicalize them under JCS if they are JSON.
3. Compute the SHA-256 digest of the canonicalized bytes.
4. Compare the digest against `hash`. Mismatch is fatal: the reference does not resolve.

## Worked example

Given an event written by a producer for human review:

```json
{
  "id": "01HXKZS3F4XK6Q2C7H5PA3RZ7M",
  "type": "core.lifecycle.formed",
  "timestamp": "2026-05-04T09:30:00Z",
  "actor": "kid:ee:smart-id:PNOEE-12345678901#1",
  "payload": {
    "name": "Created At OÜ",
    "legalForm": "OÜ",
    "jurisdiction": "EE"
  }
}
```

The JCS-canonicalized bytes are (single line, no whitespace, keys sorted at every level):

```
{"actor":"kid:ee:smart-id:PNOEE-12345678901#1","id":"01HXKZS3F4XK6Q2C7H5PA3RZ7M","payload":{"jurisdiction":"EE","legalForm":"OÜ","name":"Created At OÜ"},"timestamp":"2026-05-04T09:30:00Z","type":"core.lifecycle.formed"}
```

The SHA-256 digest of those bytes is the value carried in any `Reference` to this event. The bytes signed by the JWS sidecar are these same bytes.

(Informative note: the `Ü` characters above are encoded as the two-byte UTF-8 sequence `0xC3 0x9C`, and JCS does not introduce a `\u` escape for them. Verifiers that process JSON via libraries that re-encode strings into ASCII MUST disable that behavior, or canonicalization will not round-trip.)

## Edge cases

### Duplicate keys

JCS forbids duplicate object keys. Any producer that emits an artifact with duplicate keys produces non-conformant bytes, regardless of whether the underlying JSON parser tolerates them.

### Unicode normalization

JCS does not perform Unicode normalization. Two strings that compare equal under NFC but differ at the code-point level produce different canonical forms. Producers SHOULD normalize human-readable string fields (especially `name` and identifier values) to NFC before constructing artifacts. This specification does not currently mandate NFC at the JCS layer; TODO(SEP-XXXX) will revisit.

### Empty optional fields

A field that is `undefined` in the producer's source MUST be omitted from the JSON (not emitted as `null`). The schema marks omittable fields as optional (`?:`); JCS will not include omitted keys in the output. Emitting `"field": null` for an absent value changes the canonical bytes and is therefore a different artifact.

### Numerical precision

Integer fields MUST fit within IEEE 754 double-precision (i.e. magnitude ≤ 2⁵³). For values that may exceed this range — for example, large integer identifiers from external registries — encode the value as a string and document the parser rule in the field's specification.

## Library guidance (informative)

Implementations need a JCS library that meets RFC 8785 exactly. As of this draft, recommended libraries include:

- JavaScript / TypeScript: [`canonicalize`](https://www.npmjs.com/package/canonicalize) (Erdtman) or any fork tracking RFC 8785.
- Python: [`jcs`](https://pypi.org/project/jcs/).
- Go: [`gowebpki/jcs`](https://github.com/gowebpki/jcs).
- Java / Kotlin: [`webpki.org JSONCanonicalizer`](https://github.com/cyberphone/json-canonicalization).

Producers and verifiers MUST treat the library as part of their conformance surface: a non-conformant JCS implementation produces non-conformant artifacts.

## Why JCS, not alternatives

JCS is one of several deterministic-JSON proposals. The `2026-05-04` draft adopts JCS because it is the only one published as an RFC, it is the canonicalization used in JWS/JAdES toolchains aligned with eIDAS, and it round-trips trivially through standard JSON parsers (it is a strict subset of RFC 8259). Alternatives (CBOR, Protobuf-binary, custom canonicalizations) were considered and rejected on those grounds.
