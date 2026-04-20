import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>G.I. Mobile</Text>
      <TextInput
        placeholder="User ID"
        value={user}
        onChangeText={setUser}
        style={{ borderWidth: 1, marginVertical: 20, padding: 10 }}
      />
      <Button
        title="Enter"
        onPress={() => navigation.navigate("Projects", { user_id: user })}
      />
    </View>
  );
}

