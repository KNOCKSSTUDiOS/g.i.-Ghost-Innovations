// G.I. OS KERNEL
// Manages system apps, lifecycle, permissions, and updates.

export interface GiSystemApp {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  permissions: string[];
}

const systemApps: GiSystemApp[] = [];

export function registerSystemApp(app: GiSystemApp) {
  systemApps.push(app);
  return app;
}

export function listSystemApps() {
  return systemApps;
}

export function enableApp(id: string) {
  const app = systemApps.find(a => a.id === id);
  if (app) app.enabled = true;
  return app;
}

export function disableApp(id: string) {
  const app = systemApps.find(a => a.id === id);
  if (app) app.enabled = false;
  return app;
}
