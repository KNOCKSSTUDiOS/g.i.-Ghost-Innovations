import { resolveModel } from "../gi-routing/evaluator";

export function selectModel(user_id: string, action: string, project?: string) {
  return resolveModel(user_id, action, project);
}

