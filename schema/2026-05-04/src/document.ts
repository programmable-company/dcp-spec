import type { Iso8601DateTime, DocumentId } from "./primitives.js";
import type { Reference } from "./reference.js";

/**
 * Inline document content, encoded directly in the artifact.
 *
 * Suitable for short, JSON-native payloads (e.g. a structured resolution
 * body) or small binary attachments encoded as base64.
 */
export interface ContentInline {
  inline: true;
  /** Encoding of `data`. */
  encoding: "utf-8" | "base64";
  /** IANA media type of the decoded bytes. */
  mediaType: string;
  /** The encoded bytes. */
  data: string;
}

/**
 * Document content stored elsewhere and referenced by content hash.
 *
 * Required for any document large enough that inlining would bloat the
 * artifact, or for binary documents (e.g. PDFs) whose bytes are best kept
 * outside the JSON envelope.
 */
export interface ContentByReference {
  inline: false;
  ref: Reference;
}

/**
 * Provenance metadata for a document — who produced it, when, and what (if
 * anything) it supersedes.
 */
export interface Provenance {
  /** Time at which the document was produced. */
  createdAt: Iso8601DateTime;

  /**
   * Identity of the producer. The recommended form is a key identifier
   * (a `kid` value resolvable to a JWS key). Profiles MAY define richer
   * identity forms (e.g. an Estonian Mobile-ID phone number bound to a
   * personal identification code).
   */
  createdBy: string;

  /**
   * Reference to the prior version of this document, if any. A document
   * SHOULD NOT be edited in place; producing a new document with
   * `supersedes` pointing at the old one preserves the audit trail.
   */
  supersedes?: Reference;
}

/**
 * Generic signed-artifact wrapper.
 *
 * Documents are the unit of attached content in a DCP repository: bylaws,
 * resolutions, mandates, attachments to events, and any other artifact that
 * needs to be referenced by hash and verified by signature.
 *
 * Signatures are stored out-of-band by default (sidecar `.jws` files; see
 * `05-signing.md`). A document MAY embed signatures via the `_sig` field
 * for transports where sidecars are inconvenient; when both are present,
 * verifiers MUST ensure they agree.
 */
export interface Document {
  /** Identifier for the document, stable across the document's lifetime. */
  id: DocumentId;

  /**
   * Document type, namespaced. Examples: `core/bylaws`, `core/resolution`,
   * `core/mandate`, `attachments/pdf`. The semantics of each type are
   * defined by the introducing capability specification.
   *
   * @pattern ^[a-z][a-z0-9-]*(\/[a-z0-9][a-z0-9-]*)+$
   */
  type: string;

  /** Content of the document — either inline or referenced by hash. */
  content: ContentInline | ContentByReference;

  /** Provenance metadata. */
  provenance: Provenance;
}
