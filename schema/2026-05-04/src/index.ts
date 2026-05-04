/**
 * Programmable Company schema, draft 2026-05-04.
 *
 * This module re-exports every type that constitutes the declarative entity
 * model. The TypeScript source under this directory is the normative source
 * of truth; `schema.json` at the package root is generated from it.
 */

export type {
  CapabilityId,
  CountryCode,
  DocumentId,
  EntityId,
  EventId,
  Iso8601Date,
  Iso8601DateTime,
  SemVer,
  Sha256Hex,
  SpecVersion,
  Uri,
} from "./primitives.js";

export type { Reference } from "./reference.js";
export type { Identifier } from "./identifier.js";
export type { Capability } from "./capability.js";
export type {
  ContentByReference,
  ContentInline,
  Document,
  Provenance,
} from "./document.js";
export type { Event } from "./event.js";
export type { Entity } from "./entity.js";
export type { Conformance } from "./conformance.js";
