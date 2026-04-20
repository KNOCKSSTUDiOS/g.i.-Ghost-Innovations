// Evaluates whether an action is allowed under Guardian policies

import { getPoliciesFor } from "./store";

export function guardianCheck(user_id: string, action: string, project?: string) {
  const policies = getPoliciesFor(user_id, project);

  for (const p of policies) {
    if (p.block_actions.includes(action)) {
      return { allowed: false, reason: `Blocked by policy: ${p.name}` };
    }
  }

  for (const p of policies) {
    if (p.allow_actions.includes(action)) {
      return { allowed: true };
    }
  }

  // Default allow
  return { allowed: true };
}

