import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { api } from "../api/client";

export default function SceneListScreen({ route, navigation }) {
  const { project } = route.params;
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    api(`/projects/${project.id}/scenes`).then(setScenes);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>{project.name} — Scenes</Text>
      {scenes.map(s => (
        <Button
          key={s.id}
          title={s.name}
          onPress={() =>
            navigation.navigate("Script", { project, scene: s })
          }
        />
      ))}
      <Button
        title="+ AI Scene"
        onPress={() => {
          const prompt = "New scene idea";
          api("/ai/scene", "POST", {
            user_id: project.user_id,
            project_id: project.id,
            prompt
          }).then(out => alert(out.output));
        }}
      />
    </View>
  );
}

