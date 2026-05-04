/**
 * Generates schema.json from the TypeScript types in src/.
 *
 * The TypeScript source under src/ is normative; schema.json is a build product
 * intended for consumers that cannot run a TypeScript compiler. Regenerate with
 * `npm run build:schema` whenever the TypeScript source changes.
 */
import { createGenerator } from "ts-json-schema-generator";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const config = {
  path: resolve(root, "src/index.ts"),
  tsconfig: resolve(root, "tsconfig.json"),
  type: "*",
  expose: "export" as const,
  topRef: true,
  jsDoc: "extended" as const,
  skipTypeCheck: false,
};

const schema = createGenerator(config).createSchema(config.type);

const meta = {
  ...schema,
  $id: "https://programmable-company.org/schema/2026-05-04/schema.json",
  title: "Programmable Company — declarative schema (2026-05-04 draft)",
  description:
    "JSON Schema generated from the TypeScript source of truth at schema/2026-05-04/src. Do not edit by hand. Regenerate with `npm run build:schema`.",
};

const out = JSON.stringify(meta, null, 2) + "\n";
writeFileSync(resolve(root, "schema.json"), out);

const defs = (meta as { definitions?: Record<string, unknown> }).definitions ?? {};
console.log(
  `Wrote schema.json with ${Object.keys(defs).length} definitions.`,
);
