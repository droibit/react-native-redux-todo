import { Content, List } from "native-base";
import React from "react";
import { ListView } from "react-native";
import { Task } from "../../../module/model/task";
import { DeleteTaskListItemButton, TaskListItem } from "./taskListItem";

interface Props {
  tasks: ReadonlyArray<Task>;
  onItemPress(task: Task): void;
  onCompleteCheckBoxPress(task: Task): void;
  onItemDeletePress(task: Task): void;
}

const ds = new ListView.DataSource({
  rowHasChanged: (lhs, rhs) => lhs !== rhs,
});
const TaskList: React.SFC<Props> = props => {
  const { tasks } = props;
  return (
    <Content>
      <List
        disableRightSwipe={true}
        rightOpenValue={-75}
        dataSource={ds.cloneWithRows(tasks)}
        renderRow={(data: Task) => <TaskListItem {...props} task={data} />}
        renderRightHiddenRow={(data: Task) => (
          <DeleteTaskListItemButton {...props} task={data} />
        )}
      />
    </Content>
  );
};

export default TaskList;
