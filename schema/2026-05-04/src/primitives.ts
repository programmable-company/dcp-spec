/**
 * Primitive types used throughout the Declarative Company Protocol (DCP) schema.
 *
 * These are nominal aliases over `string` chosen for documentation and
 * generated-schema clarity; they do not perform runtime validation.
 * Validators are expected to apply the documented `pattern` constraints.
 */

/**
 * RFC 3339 / ISO 8601 calendar date in `YYYY-MM-DD` form. UTC-anchored,
 * no time component.
 *
 * @pattern ^\d{4}-\d{2}-\d{2}$
 * @format date
 * @example "2026-05-04"
 */
export type Iso8601Date = string;

/**
 * RFC 3339 / ISO 8601 date-time with explicit timezone designator. DCP
 * timestamps MUST be UTC and SHOULD use the `Z` suffix.
 *
 * @pattern ^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$
 * @format date-time
 * @example "2026-05-04T09:30:00Z"
 */
export type Iso8601DateTime = string;

/**
 * Lowercase hexadecimal SHA-256 digest, exactly 64 characters.
 *
 * @pattern ^[0-9a-f]{64}$
 * @example "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
 */
export type Sha256Hex = string;

/**
 * RFC 3986 URI. Used for non-resolving identifiers and resolution hints.
 *
 * @format uri
 */
export type Uri = string;

/**
 * Specification version, expressed as the date the version was frozen, in
 * `YYYY-MM-DD` form. See `specification/<DATE>/07-versioning.md` for semantics.
 *
 * @pattern ^\d{4}-\d{2}-\d{2}$
 * @example "2026-05-04"
 */
export type SpecVersion = string;

/**
 * Stable identifier for a DCP entity. The recommended form is
 * a `pc:` URN — owned by the Programmable Company project and shared across
 * the project's specifications — with a content-addressable suffix derived
 * from the entity's genesis event. Profiles MAY define alternative forms
 * (e.g. registry-bound URNs) provided they are globally unique within the
 * profile's scope.
 *
 * @pattern ^[a-z][a-z0-9+.-]*:.+$
 * @example "pc:ee:registrikood:14123456"
 */
export type EntityId = string;

/**
 * Stable identifier for a single event in the entity's append-only log.
 * Recommended form: ULID, RFC 4122 UUIDv7, or any monotonic identifier whose
 * lexical order matches creation order. Validators MUST treat the value as
 * opaque.
 *
 * @minLength 1
 */
export type EventId = string;

/**
 * Stable identifier for a Document. Recommended form: a content-addressable
 * URN derived from the canonicalized document hash, optionally namespaced
 * by document type.
 *
 * @minLength 1
 */
export type DocumentId = string;

/**
 * Capability identifier. Lowercase, slash-separated namespace path. The first
 * segment denotes the namespace (`core`, `accounting`, `compliance`, etc.);
 * subsequent segments narrow the capability within that namespace.
 *
 * @pattern ^[a-z][a-z0-9-]*(\/[a-z0-9][a-z0-9-]*)+$
 * @example "core/identity"
 */
export type CapabilityId = string;

/**
 * Semantic version (`MAJOR.MINOR.PATCH`), per semver.org, optionally
 * followed by `-<pre-release>` and/or `+<build>` metadata. Used for
 * capability versions and for tooling versions recorded in provenance.
 *
 * @pattern ^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$
 * @example "1.0.0"
 */
export type SemVer = string;

/**
 * ISO 3166-1 alpha-2 country code, uppercase. Used to scope identifiers,
 * legal forms, and jurisdictions.
 *
 * @pattern ^[A-Z]{2}$
 * @example "EE"
 */
export type CountryCode = string;
