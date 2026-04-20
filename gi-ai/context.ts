// Collects all project context for AI generation

import { listScenes } from "../gi-project/store-scenes";
import { listTimeline } from "../gi-project/store-timeline";
import { getScript } from "../gi-project/store-scripts";

export async function gatherProjectContext(project_id: string) {
  const scenes = listScenes(project_id);
  const timeline = listTimeline(project_id);

  const scripts = scenes.map(s => ({
    scene_id: s.id,
    text: getScript(s.id).text
  }));

  return {
    scenes,
    timeline,
    scripts
  };
}

