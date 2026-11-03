# Domain Docs

## Layout

This repo uses a single-context layout:

- `GLOSSARY.md` at the repo root.
- Architecture decision records in `docs/adr/`.

## Before exploring

Read the root glossary and any ADRs relevant to the area being explored.

If these files do not exist, proceed silently. The domain-modeling skill
creates them lazily when terms or decisions are resolved.

## Vocabulary

Use glossary terms when naming domain concepts in issues, proposals,
hypotheses, and tests. Follow the glossary's preferred terminology.

If a needed concept is missing, check whether it belongs to the domain
and note any real gap for domain-modeling.

## ADR conflicts

Explicitly identify any proposal that contradicts an existing ADR.
Reference the ADR and explain why the decision should be reconsidered.
