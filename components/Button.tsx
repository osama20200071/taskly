import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { theme } from "../theme";

type ButtonProps = { children: ReactNode; onClick?: () => void };

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
    // width: "auto",
    // alignSelf: "center",
    marginVertical: 10,
  },
  text: {
    color: theme.colorWhite,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
