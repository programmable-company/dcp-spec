import type { EventId, Iso8601DateTime } from "./primitives.js";
import type { Reference } from "./reference.js";

/**
 * A single entry in the entity's append-only event log.
 *
 * Events are the canonical state record of a Programmable Company. Every
 * change to the entity — from formation to renaming to capability addition
 * to dissolution — is recorded as an event. The Entity document at HEAD is a
 * projection over this log; the log, not the projection, is authoritative.
 *
 * Each event MUST be signed (sidecar `.jws`, see `05-signing.md`). Events
 * MUST NOT be modified after they are committed; corrections take the form
 * of a new event whose `type` and `payload` describe the correction.
 */
export interface Event {
  /** Stable opaque identifier for this event. */
  id: EventId;

  /**
   * Event type, namespaced. The first segment denotes the capability that
   * defines the event semantics; the remainder names the event within
   * that capability.
   *
   * Core events defined by this specification:
   *   - `core.lifecycle.formed` — genesis event; MUST be the first event in
   *     the log and MUST NOT have a `parent`.
   *   - `core.lifecycle.renamed` — change to the entity's `name`.
   *   - `core.lifecycle.identifier-added` — new `Identifier` attached.
   *   - `core.lifecycle.identifier-revoked` — existing `Identifier` revoked.
   *   - `core.lifecycle.capability-added` — capability declared.
   *   - `core.lifecycle.capability-removed` — capability withdrawn.
   *   - `core.lifecycle.dissolved` — terminal event; no further events MAY
   *     reference this entity after `dissolved`.
   *
   * Downstream capability specifications introduce their own event types.
   *
   * @pattern ^[a-z][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$
   */
  type: string;

  /** Time at which the event was produced. */
  timestamp: Iso8601DateTime;

  /**
   * Identity of the actor responsible for the event. Same form as
   * `Document.provenance.createdBy`: typically a `kid` resolvable to a
   * JWS key, possibly enriched per profile.
   */
  actor: string;

  /**
   * Hash reference to the immediate predecessor event in the log. MUST be
   * absent on the genesis (`core.lifecycle.formed`) event, MUST be present
   * and resolvable on every other event. Together, the `parent` chain
   * forms a hash-linked log that detects out-of-order or omitted entries.
   */
  parent?: Reference;

  /**
   * Event-type-specific payload. The shape is defined by the specification
   * that introduces the `type`. Programmable Company itself only requires
   * that the payload be JCS-canonicalizable JSON.
   */
  payload: Record<string, unknown>;

  /**
   * References to documents or other artifacts associated with this event.
   * For example, a `core.lifecycle.formed` event SHOULD reference the
   * formation document; a resolution event references the resolution
   * Document.
   */
  refs?: Reference[];
}
