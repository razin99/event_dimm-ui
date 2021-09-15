import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const CenterText = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      margin: 16,
      borderRadius: 10,
    },
  });
  return (
    <View style={style.container}>
      <Text>{children}</Text>
    </View>
  );
};
