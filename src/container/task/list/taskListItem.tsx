import React, { Component } from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import {
  ListItem,
  CheckBox,
  Body,
  Right,
} from 'native-base';
import { Task } from "../../../module/model/task";

type Props = {
  task: Task;
  onPress(task: Task): void;
  onChecBoxPress(task: Task): void;
};

const styles = StyleSheet.create({
  listItem: {
    height: 56,
  },
  title: {
    fontSize: 22,
    marginLeft: 8,
  },
  completeCheckBox: {
    marginLeft: 8,
    marginRight: 16,
  },
});

const TaskListItem: React.SFC<Props> = (props) => {
  const { task, onPress, onChecBoxPress, } = props;
  return (
    <ListItem
      onPress={() => onPress(task)}
      style={styles.listItem}>
      <Body>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.title}>{task.title}</Text>
      </Body>
      <Right>
        <CheckBox
          checked={task.completed}
          onPress={() => onChecBoxPress(task)}
          style={styles.completeCheckBox}
        />
      </Right>
    </ListItem>
  );
};

export default TaskListItem;