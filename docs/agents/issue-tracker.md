# Issue tracker: Local Markdown

Issues and specs live as markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- Implementation tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`,
  numbered from `01`, with one file per ticket.
- Record triage state in a `Status:` line near the top of each ticket.
  Use the strings in `triage-labels.md`.
- Append comments and conversation history under `## Comments`.

## Publishing and fetching

When publishing a spec or ticket, create its file at the corresponding
path above, creating directories as needed.

When fetching a ticket, read the referenced file. Resolve a ticket number
within the feature directory identified by the user or current task.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md`, containing Notes, Decisions-so-far,
  and Fog.
- Child tickets: `.scratch/<effort>/issues/NN-<slug>.md`, numbered
  from `01`, with the question in the body.
- Record ticket type with `Type: research`, `prototype`, `grilling`,
  or `task`.
- Record dependencies with `Blocked by: NN, NN`. A ticket is unblocked
  when every listed ticket is resolved.
- Frontier: open, unblocked, unclaimed tickets, ordered by number.
- Claim: save `Status: claimed` before starting work.
- Resolve: append the answer under `## Answer`, set `Status: resolved`,
  and add a gist and link to Decisions-so-far in the map.

Wayfinding uses its own open/claimed/resolved lifecycle; ordinary triage
uses the roles in `triage-labels.md`.
