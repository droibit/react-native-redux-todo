import { Body, Container, Content, List, ListItem, Right } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  NavigationRoute,
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationScreenProp,
} from "react-navigation";
import { connect } from "react-redux";
import I18n from "../../../i18n";
import {
  TaskSortBy,
  TaskVisibilityFilter,
} from "../../../module/model/settings";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import * as Actions from "../../../module/state/settings/actionCreator";
import { AppSettingsStateProps } from "../../../module/state/stateType";
import { CloseHeaderButton } from "../../shared/headerItem";
import {
  resolveSortByText,
  resolveVisibleFilterShortText,
} from "./textResolover";

interface NavigationParams {
  onDoneButtonPressed(): void;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  taskSortBy: TaskSortBy;
  visibilityFilter: TaskVisibilityFilter;
  updateTaskSortBy(sortBy: TaskSortBy): void;
  updateTaskVisibilityFilter(filter: TaskVisibilityFilter): void;
}

interface State {
  taskSortBy: TaskSortBy;
  visibilityFilter: TaskVisibilityFilter;
}

const styles = StyleSheet.create({
  headerLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemLabel: {
    fontSize: 18,
  },
});

class TaskFilterChooserScreen extends Component<Props, State> {
  // noinspection JSUnusedGlobalSymbols
  public static navigationOptions: NavigationScreenConfig<
    NavigationScreenOptions
    > = ({ navigation }) => {
      // const { disabledDoneButton, onDoneButtonPressed } = navigation.state.params as NavigationParams
      return {
        title: I18n.t("filterAndSortTask"),
        headerLeft: <CloseHeaderButton onPress={() => navigation.goBack(null)} />,
      };
    };

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: State,
  ): Partial<State> | null {
    // console.log(`getDerivedStateFromProps(
    //   nextProps=${JSON.stringify(nextProps)},
    //   prevState=${JSON.stringify(prevState)},
    // )`);

    if (
      prevState.taskSortBy !== nextProps.taskSortBy ||
      prevState.visibilityFilter !== nextProps.visibilityFilter
    ) {
      const { taskSortBy, visibilityFilter } = nextProps;
      return { taskSortBy, visibilityFilter };
    }
    return null;
  }

  constructor(props: Props) {
    super(props);

    const { taskSortBy, visibilityFilter } = props;
    this.state = { taskSortBy, visibilityFilter };

    this.props.navigation.setParams({
      onDoneButtonPressed: this.onDoneButtonPressed.bind(this),
    });
  }

  private onDoneButtonPressed() {
    console.log("#onDoneButtonPressed()");
  }

  public render() {
    const { taskSortBy, visibilityFilter } = this.state;
    return (
      <Container>
        <Content>
          <List>
            <ListItem itemDivider first>
              <Text style={styles.headerLabel}>{I18n.t("filterTask")}</Text>
            </ListItem>
            {this.createVisibilityFilterItems({ selected: visibilityFilter })}
            <ListItem itemDivider>
              <Text style={styles.headerLabel}>{I18n.t("sortTask")}</Text>
            </ListItem>
            {this.createSortByiItems({ selected: taskSortBy })}
          </List>
        </Content>
      </Container>
    );
  }

  private createVisibilityFilterItems(filter: {
    selected: TaskVisibilityFilter;
  }): Array<JSX.Element> {
    return [
      TaskVisibilityFilter.ALL,
      TaskVisibilityFilter.ACTIVE,
      TaskVisibilityFilter.COMPLETED,
    ].map(v => {
      return (
        <ListItem key={v} onPress={() => this.onVisibilityFilterChanged(v)}>
          <Body>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.itemLabel}>
              {resolveVisibleFilterShortText(v)}
            </Text>
          </Body>
          <Right>
            {filter.selected === v ? <Icon name="done" size={20} /> : <View />}
          </Right>
        </ListItem>
      );
    });
  }

  private onVisibilityFilterChanged(newFilter: TaskVisibilityFilter) {
    console.log(`#onVisibilityFilterChanged(${newFilter})`);
    this.props.updateTaskVisibilityFilter(newFilter);
  }

  private createSortByiItems(sortBy: {
    selected: TaskSortBy;
  }): Array<JSX.Element> {
    // TODO: refactoring.
    return [TaskSortBy.TIMESTAMP, TaskSortBy.TITLE].map(v => {
      return (
        <ListItem key={v} onPress={() => this.onTaskSortByChanged(v)}>
          <Body>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.itemLabel}>
              {resolveSortByText(v)}
            </Text>
          </Body>
          <Right>
            {sortBy.selected === v ? <Icon name="done" size={20} /> : <View />}
          </Right>
        </ListItem>
      );
    });
  }

  private onTaskSortByChanged(newSortBy: TaskSortBy) {
    console.log(`#onTaskSortByChanged(${newSortBy})`);
    this.props.updateTaskSortBy(newSortBy);
  }
}

const mapStateToProps = (state: AppSettingsStateProps): Partial<Props> => {
  return {
    taskSortBy: state.appSettings.taskSortSetting.taskSortBy,
    visibilityFilter: state.appSettings.taskVisibilityFilter,
  };
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch): Partial<Props> => {
  return {
    updateTaskSortBy: (sortBy: TaskSortBy) => {
      dispatch(Actions.updateTaskSortBy(sortBy));
    },
    updateTaskVisibilityFilter: (filter: TaskVisibilityFilter) => {
      dispatch(Actions.updateTaskVisibilityFilter(filter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(TaskFilterChooserScreen);
