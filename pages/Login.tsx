import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login({ navigation }: NativeStackScreenProps<any,any>) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleButtonClick = () => {
    console.log(username, password);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <View style={styles.inputGroup}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={handleButtonClick}
        style={styles.button}
      >
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    paddingLeft: 8,
    margin: 8,
    textAlign: "left",
  },
  input: {
    borderWidth: 3,
    borderRadius: 15,
    paddingLeft: 16,
    minWidth: 300,
  },
  inputGroup: {
    marginTop: 16,
  },
  button: {
    backgroundColor: "#eeb300",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 32,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
