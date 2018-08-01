import { Content, Spinner } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  color?: string;
  label: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
  },
});

const Loading: React.SFC<Props> = props => {
  const { color, label } = props;
  return (
    <Content contentContainerStyle={styles.container}>
      <Spinner color={color} size="large" />
      <Text style={styles.label}>{label}</Text>
    </Content>
  );
};

export default Loading;
