import React, { Component } from "react";
import {
  FlatList,
} from "react-native";
import { Content } from 'native-base';
import TaskListItem from "./taskListItem";
import { Task } from "../../../module/model/task";
import TaskListHeader, { TaskListHeaderProps } from "./taskListHeader";

type Props = {
  tasks: ReadonlyArray<Task>;
  onItemPress(task: Task): void;
  onCompleteChecBoxPress(task: Task): void;
} & TaskListHeaderProps;

const TaskList: React.SFC<Props> = (props) => {
  const { tasks, onItemPress, onCompleteChecBoxPress } = props;
  return (
    <Content>
      <TaskListHeader {...props} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={(info) => (
          <TaskListItem
            task={info.item}
            onPress={onItemPress}
            onChecBoxPress={onCompleteChecBoxPress} />
        )}
      />
    </Content>
  );
}

export default TaskList;