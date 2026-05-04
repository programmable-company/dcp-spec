import type {
  CountryCode,
  EntityId,
  Iso8601Date,
  SpecVersion,
  Uri,
} from "./primitives.js";
import type { Identifier } from "./identifier.js";
import type { Capability } from "./capability.js";
import type { Reference } from "./reference.js";

/**
 * The Entity document — the declarative projection of a Programmable Company.
 *
 * An Entity document at HEAD describes the company's *current state* as
 * derived from the append-only event log. It is provided for ergonomics:
 * consumers that do not wish to replay the entire log can read the
 * projection directly. The log, not this document, is the source of truth;
 * verifiers MUST be able to recompute this document by replaying every
 * signed event in `events/` and MUST reject any HEAD whose Entity
 * projection diverges from the replay result.
 *
 * The Entity document at HEAD is therefore mutable across commits but
 * deterministic given the event log up to that commit.
 */
export interface Entity {
  /**
   * JSON Schema URI. Optional; included by convention so that editors and
   * validators can resolve the schema without out-of-band configuration.
   */
  $schema?: Uri;

  /**
   * Specification version this entity claims conformance to. MUST match the
   * dated specification under which the document is interpreted. See
   * `07-versioning.md`.
   */
  $specVersion: SpecVersion;

  /** Stable identifier for the entity. */
  id: EntityId;

  /**
   * Profile under which the entity is interpreted. The core specification is
   * jurisdiction-neutral; jurisdictional bindings (legal forms, identifier
   * types, registry semantics) come from the profile. The profile name MUST
   * resolve to a profile document in `profiles/<profile>/`.
   *
   * @example "estonia"
   */
  profile: string;

  /**
   * Profile-defined legal form code. The set of permitted values is
   * specified by the profile (e.g. for `estonia`: `OÜ`, `AS`, `FIE`,
   * `MTÜ`).
   */
  legalForm: string;

  /**
   * ISO 3166-1 alpha-2 jurisdiction code under which the entity is
   * registered. MUST match the jurisdiction implied by `profile`; if a
   * profile spans multiple jurisdictions it MUST define the validation rule.
   */
  jurisdiction: CountryCode;

  /**
   * Human-readable legal name. Profiles MAY specify casing or character-set
   * constraints (e.g. Estonian registry-name conventions). Changes to
   * `name` MUST be recorded as `core.lifecycle.renamed` events.
   */
  name: string;

  /**
   * Date on which the entity was legally formed. Derived from the
   * `core.lifecycle.formed` event; immutable thereafter.
   */
  formedAt: Iso8601Date;

  /**
   * Date on which the entity was dissolved, if applicable. Set by a
   * `core.lifecycle.dissolved` event; once set, the entity MUST NOT emit
   * further events.
   */
  dissolvedAt?: Iso8601Date;

  /** Active typed identifiers attached to the entity. */
  identifiers: Identifier[];

  /**
   * Capabilities declared by the entity. MUST include `core/identity` and
   * `core/lifecycle`; MAY include any additional capabilities the entity
   * exposes.
   */
  capabilities: Capability[];

  /**
   * Reference to the most recent event applied to produce this projection.
   * Verifiers MUST replay events from genesis up to and including the
   * referenced event and confirm that the resulting projection equals this
   * Entity document.
   */
  head: Reference;
}
