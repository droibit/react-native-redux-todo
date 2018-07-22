import React, { Component } from "react";
import { Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Container, Content } from "native-base";

type Props = {
  title: string;
  description: string;
  onTitleChanged(title: string): void;
  onDescriptionChanged(title: string): void;
};

type State = {
  title?: string;
  description?: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: 18,
    marginTop: 16,
    marginLeft: 16,
    color: "black",
  },
  titleInput: {
    fontSize: 22,
    marginLeft: 16,
    marginRight: 16,
  },
  descriptionInput: {
    fontSize: 22,
    marginLeft: 16,
    marginRight: 16,
    textAlignVertical: "top",
  }
});

export default class EditTask extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { title, description } = props;
    this.state = { title, description };
  }

  public render() {
    const { title, description, onTitleChanged, onDescriptionChanged } = this.props;
    return (
      <Container>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={onTitleChanged}
            maxLength={60}
            multiline={false}
            autoFocus={true}
            style={styles.titleInput}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            placeholder="Enter your TO-DO here."
            onChangeText={onDescriptionChanged}
            maxLength={500}
            multiline={true}
            numberOfLines={5}
            style={styles.descriptionInput}
          />
        </ScrollView>
      </Container>
    );
  }
}
