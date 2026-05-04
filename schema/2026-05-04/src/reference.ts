import type { Sha256Hex, Uri } from "./primitives.js";

/**
 * A content-addressed pointer to another artifact.
 *
 * The `hash` is the digest of the canonicalized bytes of the referenced
 * artifact (see `04-canonicalization.md`). Two references with identical
 * `hash` and `hashAlg` MUST be treated as referring to the same content.
 *
 * `uri` is a resolution hint, not part of identity. Verifiers MUST recompute
 * the hash from the resolved bytes; they MUST NOT trust a URI to certify
 * that the referenced bytes are the bytes that were signed.
 */
export interface Reference {
  /** Hexadecimal SHA-256 digest of the canonicalized referenced artifact. */
  hash: Sha256Hex;

  /**
   * Hash algorithm. The 2026-05-04 draft requires `sha-256` for all references.
   * Future drafts MAY broaden this set; consumers MUST reject references whose
   * `hashAlg` they do not recognize.
   */
  hashAlg: "sha-256";

  /**
   * Optional resolution hint. May be a relative path within the same
   * Programmable Company repository (e.g. `events/2026/2026-05-04-genesis.json`)
   * or any RFC 3986 URI. Resolvers MUST verify the resolved bytes against
   * `hash` before treating them as authoritative.
   */
  uri?: Uri;

  /** Optional IANA media type of the referenced artifact. */
  mediaType?: string;
}
