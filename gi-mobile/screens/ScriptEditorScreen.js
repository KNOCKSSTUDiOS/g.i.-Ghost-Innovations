import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { api } from "../api/client";

export default function ScriptEditorScreen({ route }) {
  const { project, scene } = route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    api(`/projects/${project.id}/script/${scene.id}`).then(d => setText(d.text));
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>{scene.name}</Text>

      <TextInput
        multiline
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 10, minHeight: 300 }}
      />

      <Button
        title="Save"
        onPress={() =>
          api(`/projects/${project.id}/script/${scene.id}`, "POST", { text })
        }
      />

      <Button
        title="+ AI Expand"
        onPress={() =>
          api("/ai/script", "POST", {
            user_id: project.user_id,
            project_id: project.id,
            scene_id: scene.id,
            prompt: "Expand this scene"
          }).then(out => setText(text + "\n\n" + out.output))
        }
      />
    </ScrollView>
  );
}

