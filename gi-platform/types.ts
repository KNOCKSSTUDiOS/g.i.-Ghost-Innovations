export interface PlatformConfig {
  port: number;
}

export interface RouteDefinition {
  method: string;
  path: string;
  handler: any;
}

