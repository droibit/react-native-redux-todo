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
  Spinner,
} from 'native-base';

type Props = {
  color?: string;
  label: string;
}
export default class Loading extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { color, label } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Spinner
            color={color}
            size="large"
          />
          <Text style={styles.label}>{label}</Text>
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
  }
});