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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
});

const Loading: React.SFC<Props> = (props: Props) => {
  const { color, label } = props;
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
};

export default Loading;