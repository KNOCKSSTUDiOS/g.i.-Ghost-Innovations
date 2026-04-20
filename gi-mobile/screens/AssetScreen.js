import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { api } from "../api/client";

export default function AssetScreen({ route }) {
  const { project } = route.params;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api(`/storage/list/${project.user_id}?project=${project.id}`).then(setFiles);
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Assets</Text>

      {files.map(f => (
        <View key={f.id} style={{ marginVertical: 10 }}>
          <Text>{f.filename}</Text>
          {f.mime.startsWith("image") && (
            <Image
              source={{ uri: `http://hollywoodimaging.studio/storage/file/${f.id}` }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

