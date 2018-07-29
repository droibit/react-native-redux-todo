import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationScreenOptions,
  NavigationScreenConfig
} from "react-navigation";
import I18n from "../../i18n";
import { Container, Content, List, ListItem, Text, Body } from "native-base";
import { CloseHeaderButton } from "../shared/headerItem";

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

class SettingsScreen extends Component<Props> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({
    navigation
  }) => {
    // const { disabledDoneButton, onDoneButtonPressed } = navigation.state.params as NavigationParams
    return {
      title: I18n.t("settings"),
      headerLeft: <CloseHeaderButton onPress={() => navigation.goBack(null)} />
    };
  };

  public render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <List>
            <ListItem itemHeader first>
              <Text>{I18n.t("appCategory")}</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text>{I18n.t("buildVersionTitle")}</Text>
                <Text note>
                  {I18n.t("buildVersionSubtitle") + "1.0.0"}
                </Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect()(SettingsScreen);
