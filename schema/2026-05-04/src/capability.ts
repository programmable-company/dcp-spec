import type { CapabilityId, SemVer } from "./primitives.js";

/**
 * Declaration that an entity supports a given capability.
 *
 * Capabilities are the unit of opt-in functionality in the Programmable
 * Company specification. The `core/identity` and `core/lifecycle`
 * capabilities are mandatory for every conforming entity; everything else
 * is opt-in.
 *
 * The semantics of each capability — the artifacts it requires, the events
 * it emits, the runtime interactions it implies — are defined by the
 * specification document that introduces the capability. The Capability
 * object only declares *that* the capability is exposed and at what
 * version; it does not by itself constrain behavior.
 */
export interface Capability {
  /**
   * Capability identifier in `<namespace>/<name>[/<sub>...]` form.
   *
   * - `core/identity` — entity identity, identifiers, naming. Mandatory.
   * - `core/lifecycle` — formation, name change, dissolution events. Mandatory.
   * - `accounting/*`, `compliance/*`, `people/*`, etc. — downstream module
   *   specifications, each defined by its own document.
   */
  id: CapabilityId;

  /**
   * Semantic version of the capability specification this entity claims
   * conformance to. Consumers MUST treat differing major versions as
   * incompatible.
   */
  version: SemVer;

  /**
   * Capability-specific configuration parameters. The shape is defined by
   * the capability specification. Programmable Company itself imposes no
   * constraint beyond JCS-canonicalizable JSON.
   */
  params?: Record<string, unknown>;
}
