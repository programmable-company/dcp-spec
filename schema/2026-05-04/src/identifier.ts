import type { CountryCode, Iso8601Date } from "./primitives.js";

/**
 * A typed identifier carried by an entity.
 *
 * Identifiers are namespaced by their `type` so that the same numeric or
 * alphanumeric value can coexist across registries without collision (e.g.
 * an Estonian registrikood and a German Handelsregisternummer are distinct
 * even if their digits happen to match).
 */
export interface Identifier {
  /**
   * Identifier type, in dotted lowercase namespace form.
   *
   * The first segment is the issuing namespace:
   *   - `ee.*` — Estonian state-issued identifiers (`ee.registrikood`,
   *     `ee.kmkr`, `ee.emtak`).
   *   - `eu.*` — EU-wide identifiers (`eu.euid`, `eu.lei`).
   *   - `iso.*` — ISO-defined identifiers (`iso.lei`, `iso.duns`).
   *
   * Profiles MUST register their identifier types in the corresponding
   * profile document; unregistered types MAY be used but consumers are not
   * required to interpret them.
   *
   * @pattern ^[a-z][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$
   * @example "ee.registrikood"
   */
  type: string;

  /**
   * Identifier value. Format is defined by the corresponding `type`. Profiles
   * SHOULD specify regular expressions or check-digit procedures for their
   * identifier types.
   */
  value: string;

  /**
   * Free-text issuer label. Informational; verifiers MUST NOT rely on this
   * field for trust decisions. Trust is established by the `type` namespace
   * and the profile that defines it.
   *
   * @example "Centre of Registers and Information Systems (RIK)"
   */
  issuer?: string;

  /**
   * Geographic or jurisdictional scope of the identifier. Either an ISO 3166-1
   * alpha-2 country code or one of the reserved values `EU` or `GLOBAL`.
   */
  scope?: CountryCode | "EU" | "GLOBAL";

  /** Date from which the identifier became valid for this entity. */
  validFrom?: Iso8601Date;

  /**
   * Date on which the identifier ceased to be valid for this entity. Absence
   * of this field MUST be interpreted as "still valid as of HEAD." Once set,
   * a future event MUST NOT reset it; expired identifiers are retained in the
   * Entity projection until purged by a separate revocation event.
   */
  validUntil?: Iso8601Date;
}
