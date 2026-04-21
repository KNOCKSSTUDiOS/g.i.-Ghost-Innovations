import crypto from "crypto";

export interface GIPipelineStage {
  id: string;
  name: string;
  handler: Function;
  parallel?: boolean;
}

export interface GIPipelineResult {
  id: string;
  stage: string;
  ok: boolean;
  output?: any;
  error?: string | null;
  timestamp: number;
}

export class GI_PipelineEngine {
  stages: GIPipelineStage[];

  constructor() {
    this.stages = [];
  }

  addStage(name: string, handler: Function, parallel: boolean = false) {
    const stage: GIPipelineStage = {
      id: crypto.randomUUID(),
      name,
      handler,
      parallel
    };

    this.stages.push(stage);
    return stage;
  }

  removeStage(id: string) {
    this.stages = this.stages.filter(s => s.id !== id);
  }

  listStages() {
    return this.stages;
  }

  async run(input: any): Promise<GIPipelineResult[]> {
    const results: GIPipelineResult[] = [];
    let current = input;

    for (const stage of this.stages) {
      if (stage.parallel && Array.isArray(current)) {
        const parallelResults = await Promise.all(
          current.map(async (item: any) => {
            try {
              const out = await stage.handler(item);
              return {
                id: stage.id,
                stage: stage.name,
                ok: true,
                output: out,
                timestamp: Date.now()
              } as GIPipelineResult;
            } catch (err: any) {
              return {
                id: stage.id,
                stage: stage.name,
                ok: false,
                error: err?.message || "Unknown error",
                timestamp: Date.now()
              } as GIPipelineResult;
            }
          })
        );

        results.push(...parallelResults);
        current = parallelResults.map(r => r.output);
        continue;
      }

      try {
        const out = await stage.handler(current);
        results.push({
          id: stage.id,
          stage: stage.name,
          ok: true,
          output: out,
          timestamp: Date.now()
        });
        current = out;
      } catch (err: any) {
        results.push({
          id: stage.id,
          stage: stage.name,
          ok: false,
          error: err?.message || "Unknown error",
          timestamp: Date.now()
        });
        // fail-soft: continue pipeline with unchanged current
      }
    }

    return results;
  }
}

export function createGIPipelineEngine() {
  return new GI_PipelineEngine();
}

