export interface EngineConfig {
  mode: "dev" | "prod";
  port: number;
  flags?: Record<string, boolean>;
}

export const engineConfig: EngineConfig = {
  mode: "dev",
  port: Number(process.env.PORT || 3000),
  flags: {}
};

