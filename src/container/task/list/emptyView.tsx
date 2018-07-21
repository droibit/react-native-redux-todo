import React, {
  Component
} from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import {
  Container,
  Content,
} from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
  text: string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    paddingTop: 12
  }
});

const EmptyView: React.SFC<Props> = (props: Props) => {
  const { text } = props;
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <Icon
          name="done"
          size={52}
        />
        <Text style={styles.label}>{text}</Text>
      </Content>
    </Container>
  ); 
};
export default EmptyView;