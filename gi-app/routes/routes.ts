import { RouteDefinition } from "../types";
import { jsonResponse } from "../../gi-core/http/response-builder";

export const routes: RouteDefinition[] = [
  {
    method: "GET",
    path: "/",
    handler: async (_req, res) => {
      jsonResponse(res, 200, { status: "ok" });
    }
  }
];
