import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  text: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    paddingTop: 12,
  },
});

const EmptyView: React.SFC<Props> = props => {
  const { text } = props;
  return (
    <View style={styles.container}>
      <Icon name="done" size={52} />
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};
export default EmptyView;
