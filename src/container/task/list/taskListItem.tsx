import { Body, Button, CheckBox, Icon, ListItem, Right } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Task } from "../../../module/model/task";

interface TaskListItemProps {
  task: Task;
  onItemPress(task: Task): void;
  onCompleteCheckBoxPress(task: Task): void;
}

interface DeleteTaskListItemButtonProps {
  task: Task;
  onItemDeletePress(task: Task): void;
}

const styles = StyleSheet.create({
  listItem: {
    height: 56,
  },
  title: {
    fontSize: 20,
    marginLeft: 16,
  },
  completeCheckBox: {
    marginLeft: 8,
    marginRight: 16,
  },
});

export const TaskListItem: React.SFC<TaskListItemProps> = props => {
  const { task, onItemPress, onCompleteCheckBoxPress } = props;
  return (
    <ListItem onPress={() => onItemPress(task)} style={styles.listItem}>
      <Body>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {task.title}
        </Text>
      </Body>
      <Right>
        <CheckBox
          checked={task.completed}
          onPress={() => onCompleteCheckBoxPress(task)}
          style={styles.completeCheckBox}
        />
      </Right>
    </ListItem>
  );
};

export const DeleteTaskListItemButton: React.SFC<
  DeleteTaskListItemButtonProps
> = props => {
  const { task, onItemDeletePress } = props;
  return (
    <Button full danger onPress={() => onItemDeletePress(task)}>
      <Icon active type="MaterialIcons" name="delete" />
    </Button>
  );
};
