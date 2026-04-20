import { GiModelRoute } from "./schema";

const routes: GiModelRoute[] = [];

export function addRoute(route: GiModelRoute) {
  routes.push(route);
  return route;
}

export function listRoutes() {
  return routes;
}

export function getRoutesFor(user_id: string, action: string, project?: string) {
  return routes.filter(r =>
    (!r.match_user || r.match_user === user_id) &&
    (!r.match_action || r.match_action === action) &&
    (!r.match_project || r.match_project === project)
  );
}

