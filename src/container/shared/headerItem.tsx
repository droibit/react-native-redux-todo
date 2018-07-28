import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderButtons, { HeaderButton } from "react-navigation-header-buttons";

type HeaderButtonProps = {
  onPress(): void;
};

type DoneHeaderButtonProps = {
  disabled: boolean;
} & HeaderButtonProps;

const NavHeaderButton: React.SFC = (props: any) => (
  <HeaderButton {...props} IconComponent={Icon} iconSize={23} />
);

export const CloseHeaderButton: React.SFC<HeaderButtonProps> = props => (
  <HeaderButtons left HeaderButtonComponent={NavHeaderButton}>
    <HeaderButtons.Item
      iconName="close"
      title="close"
      onPress={props.onPress}
    />
  </HeaderButtons>
);

export const DoneHeaderButton: React.SFC<DoneHeaderButtonProps> = props => (
  <HeaderButtons HeaderButtonComponent={NavHeaderButton}>
    <HeaderButtons.Item
      onPress={props.disabled ? undefined : props.onPress}
      iconName="done"
      title="done"
    />
  </HeaderButtons>
);

export const SettingsHeaderButton: React.SFC<HeaderButtonProps> = props => (
  <HeaderButtons HeaderButtonComponent={NavHeaderButton}>
    <HeaderButtons.Item
      {...props}
      iconName="settings"
      title="settings"
    />
  </HeaderButtons>
);
