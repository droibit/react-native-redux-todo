import React from "react";
import { Text, StyleSheet } from "react-native";
import { Content, Fab } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
  text: string;
  onAddClick(): void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontSize: 14,
    paddingTop: 12
  }
});

const EmptyView: React.SFC<Props> = (props: Props) => {
  const { text, onAddClick } = props;
  return (
    <Content contentContainerStyle={styles.container}>
      <Icon name="done" size={52} />
      <Text style={styles.label}>{text}</Text>

      <Fab
        active={true}
        position="bottomRight"
        onPress={onAddClick}
      >
        <Icon name="add" />
      </Fab>
    </Content>
  );
};
export default EmptyView;
