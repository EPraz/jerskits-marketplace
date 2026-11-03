# Triage Labels

Map canonical triage roles to these local ticket status strings.

| Canonical role | Local status | Meaning |
| --- | --- | --- |
| needs-triage | needs-triage | Maintainer needs to evaluate the issue |
| needs-info | needs-info | Waiting on the reporter for information |
| ready-for-agent | ready-for-agent | Fully specified, ready for an agent |
| ready-for-human | ready-for-human | Requires human implementation |
| wontfix | wontfix | Will not be actioned |

When a skill applies a triage role, write its mapped string in the
ticket's `Status:` line.
