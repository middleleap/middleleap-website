# AI-DLC BrainKit RC.8 implementation handoff

Use this document as the complete prompt for a new Codex session working in:

`/Users/michartmann/Github/ai-dlc`

## Objective

Extend `middleleap-loom` so an adopting institution can generate, approve, mount, version and
mechanically validate an Institutional BrainKit across repositories.

The BrainKit is the institution-owned seed of the Loom's context brain. It gives repositories
binding institutional identity, terminology, architectural principles, technology constraints
and decision rights. It is not another public plugin family and it is not the MiddleLeap brand
installed into a client repository.

Implement this as Loom `2.0.0-rc.8`, composed through the RC.7 policy compiler, copy manifest,
adoption report, control catalog, gate runner and evidence seal.

## Verified baseline

The website review was performed against:

- Remote commit: `origin/main@267b606`
- Merged implementation commit: `c3f421b`
- Loom version: `2.0.0-rc.7`
- RC.7 theme: compiled control plans command execution

RC.7 currently provides:

- `harness/adopt.mjs`: idempotent installer and adoption report
- `harness/copy-manifest.json`: declared installation source of truth
- `core/policy-compiler.mjs`: base + jurisdiction + product profiles compile the control route
- `core/compiled-requirements.mjs`: aggregates mandatory gates and evidence
- `core/gate-runner.mjs`: compiled requirements make controls unskippable in their lane
- `scripts/doc-integrity-check.mjs`: generated copy table and scorecard drift gate
- Control catalog with 33 mechanically validated, 6 defined and 7 absent controls
- Zero platform-enforced and zero organisationally-enforced controls as shipped

Before implementing, fetch again and verify that `origin/main` has not advanced. If it has,
reconcile this plan with the new changes rather than forcing the recorded baseline.

## Repository safety

The previously inspected local checkout was behind `origin/main` and contained an untracked
`AGENTS.md`.

1. Read the current repository instructions and `git status`.
2. Preserve the untracked `AGENTS.md`; do not overwrite, delete or accidentally stage it.
3. Prefer an isolated worktree and branch from the latest `origin/main`, for example
   `codex/institutional-brainkit-rc8`.
4. Do not modify Open Finance canonical skills without first checking their provenance rules.
5. Do not merge, push or publish without explicit user authorization.

## Product and language boundaries

- **BrainKit:** portable, governed institutional seed.
- **Context brain:** the wider knowledge accumulated through repeated Loom cycles.
- **Regulated context:** remains the D6 data-risk-register seam.
- **Solution domain:** remains product contracts, data models, personas and evaluation assets.
- **Institutional DNA:** the BrainKit's primary scope.
- The BrainKit may reference regulated and domain sources; it must not duplicate them into a
  second compliance database.
- Say **institutionally conformant**, not **regulatorily compliant**.
- Public AI-DLC ships schemas, generation machinery, validators and fictional examples only.
  Real institutional BrainKits will normally be private.

## Workstream 1 — make RC.7's copy manifest real in CI

RC.7 says `copy-manifest.json` has three consumers, but the current marketplace adoption
dry-run in `.github/workflows/validate.yml` still uses a manually maintained sequence of `cp`
commands.

Fix this before BrainKit depends on the manifest:

1. Replace the dry-run's generic file-copy block with:
   `node plugins/middleleap-loom/skills/loom-adopt/harness/adopt.mjs --dest <temp-repo>`.
2. Keep only project-specific fixture adaptation and deliberate `ADOPT:` completion outside the
   installer.
3. Add a test proving a new copy-manifest entry lands in the adopted layout without adding a
   parallel CI copy line.
4. Preserve `doc-integrity-check.mjs` verification of the generated SKILL copy table.

Exit criterion: `copy-manifest.json` genuinely drives the installer, generated adoption
documentation and CI adopted-layout installation.

## Workstream 2 — define the canonical BrainKit

Add the method reference:

`plugins/middleleap-loom/skills/loom/references/brainkit.md`

Add neutral templates under:

```text
plugins/middleleap-loom/skills/loom-adopt/harness/brainkit/
├── manifest.template.json
├── identity/
│   └── design.md
├── terminology.md
├── architecture.md
├── technology-policy.json
├── governance.md
└── source-register.json
```

Adopt them into:

```text
institution/
└── brainkit/
    ├── manifest.json
    ├── identity/design.md
    ├── terminology.md
    ├── architecture.md
    ├── technology-policy.json
    ├── governance.md
    └── source-register.json
```

Add the BrainKit directory to `copy-manifest.json`. Template files must land as
`adopt-pending`; the installer must never invent or auto-approve institutional content.

The manifest should require:

- `schema_version`
- `brainkit_id`
- `institution_id`
- Semantic `version`
- Lifecycle `status`: `draft | approved | retired`
- `effective_at` and optional `expires_at`
- Accountable owners by section
- Approved source references
- Section digests and whole-package digest
- Compatibility-projection metadata
- Approval identities that resolve against the Loom identity registry

## Workstream 3 — add the institution profile to the compiler

Extend the compiler's profile model:

```text
profiles/
├── regulated-bank.json
├── jurisdictions/
├── products/
└── institutions/
    └── <institution>.json
```

Add `profiles/institutions` to `PROFILE_DIRS`. A governed change in a BrainKit-enabled
repository must name the institution profile in `required_profiles`.

An institutional profile should be able to contribute:

- Gate family: `brainkit-conformance`
- Evidence type: `brainkit-provenance`
- Approver role: `institutional-context-owner`
- Institution-specific PA1/PA2 requirements where justified
- Conditional additions for customer-facing, artifact-bearing or architecture-material changes

Backward compatibility: a generic repository with no institution profile must continue to work.
Once an envelope names the institution profile, its BrainKit requirements become
mandatory-when-compiled.

## Workstream 4 — bind plans to exact profile content

RC.7's compiled plan records profile names but not the exact version or digest of their source
content. BrainKit needs stronger binding.

Extend the compiled plan with profile bindings:

```json
{
  "profile_bindings": [
    {
      "profile": "acme-bank",
      "kind": "institution",
      "version": "1.3.0",
      "digest": "sha256:..."
    }
  ]
}
```

The plan hash must include these bindings. A BrainKit or profile change must make a stored plan
stale and force recompilation.

Important implementation detail: the current `planHash` uses a top-level JSON replacer array.
Nested binding objects would not be safely canonicalized by merely adding them. Implement a
recursive canonical JSON serializer, or encode bindings in a canonical flat representation,
and add deterministic-hash tests.

Negative test: change one byte in the approved BrainKit, leave the stored control plan
unchanged, and prove `change-envelope-check` blocks it.

## Workstream 5 — create `brainkit-init`

Add:

`plugins/middleleap-loom/skills/brainkit-init/SKILL.md`

The skill must:

1. Inspect the repository and user-provided approved institutional sources.
2. Generate a draft BrainKit and institution profile.
3. Record provenance for every generated section.
4. Produce a gap register for missing decisions.
5. Never invent policy, regulatory interpretation, approval authority or brand rules.
6. Reconcile an existing BrainKit rather than overwriting it.
7. Keep the package `draft` until accountable owners approve it.
8. Generate or refresh the D7 compatibility projection.
9. Report exactly what was generated, inferred, missing and awaiting approval.

Update `loom-adopt` so it detects whether a BrainKit is present and routes the adopter through
`brainkit-init` when appropriate.

## Workstream 6 — connect repository instructions safely

Install a canonical instruction fragment:

`institution/brainkit/repository-instructions.md`

It should require agents to read the BrainKit before creating or modifying:

- Code
- PRDs and discovery artifacts
- ADRs and architecture documents
- Interfaces and prototypes
- Reports and evidence packs

Do not overwrite an existing `AGENTS.md`, `CLAUDE.md`, `.cursorrules` or equivalent file.
`loom-adopt` should inspect the repository and propose a concise reference to the canonical
instruction fragment. Existing files may be patched only after user confirmation.

## Workstream 7 — add mechanical BrainKit enforcement

Create:

- `harness/scripts/brainkit-check.mjs`
- `harness/scripts/brainkit-check.test.mjs`

The gate should fail on:

- Missing or malformed manifest
- Draft, expired or retired BrainKit used by a compiled change
- Missing accountable owners
- Owners that do not resolve against the identity registry
- Package or section digest mismatch
- Missing approved source references
- Broken regulated-context or solution-domain references
- Required artifact with no BrainKit provenance
- Artifact referencing the wrong BrainKit version or digest
- Stale D7 compatibility projection
- Unresolvable institutional profile

Wire it into:

- Control catalog
- Policy-compiler gate vocabulary
- Compiled requirements
- Gate runner
- Evidence-seal required types
- CODEOWNERS
- `control-plane-check.mjs`
- Routine-change absolute floor
- Reference CI
- Marketplace negative-bypass suite

The compiler should make the gate and evidence mandatory only when the institution profile is
part of the change envelope.

## Workstream 8 — preserve D7 compatibility

Do not remove or rename `discovery/brand/design.md` in RC.8.

Treat it as a generated compatibility projection of:

`institution/brainkit/identity/design.md`

Preserve the existing D7 brand marker so current templates, renderers and adopted repositories
continue to work. Add BrainKit ID, version and digest alongside it in:

- Markdown frontmatter
- HTML metadata/comments
- DOCX properties
- PPTX properties
- XLSX properties

Negative tests must prove:

- Existing D7 examples remain valid.
- A stale compatibility projection fails.
- A correct visual with the wrong BrainKit digest fails.

## Workstream 9 — multi-repository distribution

Use this initial operating model:

1. The institution owns one private canonical BrainKit.
2. BrainKit releases are semantically versioned and approved.
3. Each product repository mounts a digest-pinned snapshot.
4. CI validates the local snapshot without depending on a live network service.
5. A repository adopts a new BrainKit version through an explicit reviewed PR.
6. Rollback means remounting the last approved version and recompiling affected plans.

Do not place real institutional content in the public AI-DLC repository.

## Workstream 10 — neutral example and documentation

Use Meridian Trust or another fictional institution as the end-to-end example.

Update:

- Loom `SKILL.md` context-brain explanation
- New `references/brainkit.md`
- `loom-adopt/SKILL.md`
- Plugin README
- Copy manifest and generated copy table
- Control catalog and generated scorecard
- Loom stream visualization where it improves understanding
- Adoption and activation runbooks

Do not present `middleleap-brand` as a client BrainKit. It remains an independent technical
reference plugin.

## Verification

At minimum run:

```bash
node scripts/validate-marketplace.mjs
node plugins/middleleap-loom/skills/loom-adopt/harness/scripts/doc-integrity-check.mjs
node --test plugins/middleleap-loom/skills/loom-adopt/harness/discovery/gates/*.test.mjs
node --test plugins/middleleap-loom/skills/loom-adopt/harness/discovery/render/*.test.mjs
node --test plugins/middleleap-loom/skills/loom-adopt/harness/scripts/*.test.mjs
node --test plugins/middleleap-loom/skills/loom-adopt/harness/core/*.test.mjs
```

Also execute:

- The manifest-driven adopted-layout dry-run
- BrainKit positive adoption
- Unapproved-BrainKit negative test
- BrainKit-tamper negative test
- Stale-plan negative test
- Wrong-artifact-provenance negative test
- D7 backward-compatibility tests
- Idempotent installer second run
- Local marketplace installation smoke test

## Release

After all tests pass:

1. Bump `plugins/middleleap-loom/.claude-plugin/plugin.json` to `2.0.0-rc.8`.
2. Bump the matching entry in `.claude-plugin/marketplace.json`.
3. Update the recorded baseline and generated scorecard.
4. Confirm public descriptions do not claim platform or organisational enforcement.
5. Commit on the RC.8 branch.
6. Do not push or open a pull request without explicit authorization.

## Definition of done

The work is complete only when all of the following are true:

1. The marketplace dry-run installs from `copy-manifest.json` through `adopt.mjs`.
2. Adoption can generate a neutral draft BrainKit without inventing institution-specific facts.
3. Accountable owners can approve and version the BrainKit.
4. The institution profile composes with base, jurisdiction and product profiles.
5. The compiled plan binds the exact BrainKit version and digest.
6. A compiled BrainKit requirement cannot be skipped by path scoping.
7. Missing, draft, stale or tampered BrainKit content blocks the relevant change.
8. Generated artifacts carry verifiable BrainKit provenance.
9. Existing D7 behavior remains backward compatible.
10. Existing repositories without a BrainKit continue to function.
11. A private BrainKit can be pinned consistently across multiple repositories.
12. Public examples contain no real institutional data.
13. Every positive claim has a negative bypass test.
14. Both marketplace manifests report `2.0.0-rc.8`.

## Non-goals

- Do not build a public BrainKit registry in RC.8.
- Do not claim regulatory compliance from brand or artifact conformance.
- Do not merge the D6 register or domain packs into the BrainKit.
- Do not remove the existing D7 seam.
- Do not auto-approve institutional context.
- Do not auto-edit repository instruction files without confirmation.
- Do not claim platform-enforced or organisationally-enforced maturity from bundled gates.
