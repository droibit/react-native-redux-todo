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

export default class EmptyView extends Component {

  public render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Icon
            name="done"
            size={52}
          />
          <Text style={styles.label}>No TO-DOs.</Text>
        </Content>
      </Container>
    );      
  }
}

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