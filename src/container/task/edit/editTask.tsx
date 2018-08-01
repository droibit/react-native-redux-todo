import { Container } from "native-base";
import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import I18n from "../../../i18n";

interface Props {
  title: string;
  description: string;
  onTitleChanged(title: string): void;
  onDescriptionChanged(title: string): void;
}

interface State {
  title?: string;
  description?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: "black",
    fontSize: 18,
    marginLeft: 16,
    marginTop: 16,
  },
  titleInput: {
    fontSize: 22,
    marginLeft: 16,
    marginRight: 16,
    ...Platform.select({
      ios: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
      },
    }),
  },
  descriptionInput: {
    fontSize: 22,
    marginLeft: 16,
    marginRight: 16,
    textAlignVertical: "top",
    ...Platform.select({
      ios: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingBottom: 4,
      },
    }),
  },
});

export default class EditTask extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { title, description } = props;
    this.state = { title, description };
  }

  public render() {
    const {
      title,
      description,
      onTitleChanged,
      onDescriptionChanged,
    } = this.props;
    return (
      <Container>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>{I18n.t("editTaskTitleLabel")}</Text>
          <TextInput
            value={title}
            onChangeText={onTitleChanged}
            maxLength={60}
            multiline={false}
            autoFocus={true}
            style={styles.titleInput}
          />
          <Text style={styles.label}>{I18n.t("editTaskDescLabel")}</Text>
          <TextInput
            value={description}
            placeholder={I18n.t("editTaskDescHint")}
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
