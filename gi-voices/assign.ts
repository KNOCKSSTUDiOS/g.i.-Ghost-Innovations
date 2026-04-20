const assignments: Record<string, string> = {}; 
// key: scene_id, value: voice_id

export function assignVoice(scene_id: string, voice_id: string) {
  assignments[scene_id] = voice_id;
  return { scene_id, voice_id };
}

export function getAssignedVoice(scene_id: string) {
  return assignments[scene_id] || null;
}

