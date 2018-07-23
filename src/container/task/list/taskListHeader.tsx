import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TaskSortSetting, TaskVisibilityFilter, TaskSortByOrder } from "../../../module/model/settings";
import { resolveSortByText, resolveVisiblFilterLongText } from "../filter/textResolover";

const styles = StyleSheet.create({
  header: {
    height: 48,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    // ref. http://masarufuruya.hatenadiary.jp/entry/2018/01/26/160238
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  headerFilter: {
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 18.5,
    fontWeight: "bold",
    marginRight: 4,
  },
  headerSort: {
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  sortLabel: {
    fontSize: 18.5,
    marginRight: 4,
  },
});

type FilterButtonProps = {
  taskVisibilityFilter: TaskVisibilityFilter;
  onFilterPress(): void;
};
const FilterAndSortButton: React.SFC<FilterButtonProps> = (props) => {
  const { taskVisibilityFilter, onFilterPress } = props;
  return (
    <TouchableOpacity
      onPress={onFilterPress}
      style={styles.headerFilter}>
      <Text style={styles.filterLabel}>{resolveVisiblFilterLongText(taskVisibilityFilter)}</Text>
      <Icon name="filter-list" size={20} />
    </TouchableOpacity>
  )
};

type SortLabelProps = {
  taskSortSetting: TaskSortSetting;
  onSortPress(): void;
};
const SortLabel: React.SFC<SortLabelProps> = (props) => {
  const { taskSortSetting, onSortPress } = props;
  return (
    <TouchableOpacity
      onPress={onSortPress}
      style={styles.headerSort}>
      <Text style={styles.sortLabel}>{resolveSortByText(taskSortSetting.taskSortBy)}</Text>
      <Icon name={resolveSortByOrderIconName(taskSortSetting.taskSortByOrder)} size={20} />
    </TouchableOpacity>
  );
};

function resolveSortByOrderIconName(order: TaskSortByOrder): string {
  switch (order) {
    case TaskSortByOrder.ASC: return "arrow-downward";
    case TaskSortByOrder.DESC: return "arrow-upward";
  }
}

export type TaskListHeaderProps = FilterButtonProps & SortLabelProps;
const TaskListHeader: React.SFC<TaskListHeaderProps> = (props) => {
  return (
    <View style={styles.header}>
      <FilterAndSortButton {...props} />
      <SortLabel {...props} />
    </View>
  );
};
export default TaskListHeader;
