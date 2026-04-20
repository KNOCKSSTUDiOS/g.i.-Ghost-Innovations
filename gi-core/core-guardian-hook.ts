import { guardianCheck } from "../gi-guardian/evaluator";

export function enforceGuardian(user_id: string, action: string, project?: string) {
  const check = guardianCheck(user_id, action, project);
  if (!check.allowed) {
    return {
      blocked: true,
      reason: check.reason
    };
  }
  return { blocked: false };
}

