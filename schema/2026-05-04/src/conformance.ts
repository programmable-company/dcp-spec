import type { CapabilityId, SemVer, SpecVersion } from "./primitives.js";

/**
 * Repository-level conformance descriptor.
 *
 * Stored at `.programmable-company/conformance.json` in a conforming
 * repository. Tooling reads this file first to determine which
 * specification version, profile, and capability set to apply when
 * interpreting the rest of the repository.
 *
 * The conformance file is informational metadata for tooling; the
 * authoritative declarations live on the Entity document
 * (`$specVersion`, `profile`, `capabilities`). When the two disagree,
 * the Entity document wins and tooling SHOULD warn.
 */
export interface Conformance {
  /** Specification version this repository targets. */
  $specVersion: SpecVersion;

  /** Profile name (matches `Entity.profile`). */
  profile: string;

  /** Capability summary, mirroring `Entity.capabilities`. */
  capabilities: Array<{
    id: CapabilityId;
    version: SemVer;
  }>;
}
