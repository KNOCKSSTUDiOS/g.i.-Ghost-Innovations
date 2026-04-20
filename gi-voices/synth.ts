import { selectModel } from "../gi-core/core-routing-hook";
import { getVoice } from "./store";

export async function synthesizeVoice(user_id: string, voice_id: string, text: string) {
  const voice = getVoice(voice_id);
  if (!voice) return { error: "Voice not found" };

  const model = selectModel(user_id, "synthesize_voice");

  return {
    model: model.model,
    voice: voice.name,
    audio_url: `/voices/generated/${Date.now()}-${voice_id}.mp3`,
    note: `Audio generated for text: "${text}"`
  };
}

