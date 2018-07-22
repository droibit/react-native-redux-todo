import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  close: {
    marginLeft: 16,
  },
  done: {
    marginRight: 16,
  }
})

type CloseHeaderButtonProps = {
  onPress(): void;
};

export const CloseHeaderButton: React.SFC<CloseHeaderButtonProps> = props => {
  return (
    <TouchableOpacity {...props}>
      <Icon name="close" size={24} style={styles.close} />
    </TouchableOpacity>
  );
};

type DoneHeaderButtonProps = {
  disabled: boolean;
  onPress(): void;
};

export const DoneHeaderButton: React.SFC<DoneHeaderButtonProps> = props => {
  return (
    <TouchableOpacity {...props}>
      <Icon name="done" size={24} style={styles.done} />
    </TouchableOpacity>
  );
};
