/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Immutable from "immutable";
import { Task, TaskList, TaskState } from "./module/model/task";
import {
  AppSettings,
  TaskSortSetting,
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from "./module/model/settings";
import { Result } from "./module/model/result";
import { TaskEntity } from "./module/data/source/task";
import { store, configurePersistStore } from "./module/state";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props: Props) {
    super(props);

    configurePersistStore(store, this.onPersitBootstrapped.bind(this));
  }

  public onPersitBootstrapped() {
    console.log("Bootstrapped.");
  }

  public render() {
    let t: Task = new Task({
      id: "hoge",
      title: "huga",
      description: "",
      timestamp: new Date(),
      completed: true
    });
    console.log(`${t}, ${t.id}, ${t.title}`);

    // t.completed = true;
    // {
    //   let s = Date.now();
    //   t = t.set("title", "piyo").set("description", "puyo") as Task;
    //   let e = Date.now();
    //   console.log(`set: ${t}, elapsed=${e - s}ms(e=${e}, s=${s})`);
    // }
    // {
    //   let s = Date.now();
    //   t = t.updateContent({ title: "kayo", description: "koyo" });
    //   let e = Date.now();
    //   console.log(`withMutation: ${t}, elapsed=${e - s}ms(e=${e}, s=${s})`);
    // }

    let te = new TaskEntity({
      id: "yes!!",
      title: "huga",
      description: "",
      timestamp: new Date().getUTCMilliseconds(),
      completed: true
    });
    console.log(`TaskEntity.src=${JSON.stringify(te)}`);
    te = Object.assign(te, { completed: false }) as TaskEntity;
    console.log(`TaskEntity.assigned1=$${JSON.stringify(te)}`);
    te = Object.assign(te, { title: "hoge" }) as TaskEntity;
    console.log(`TaskEntity.assigned2=$${JSON.stringify(te)}`);
    te = te.copyWith({ id: "no!!" });
    console.log(`TaskEntity.assigned3=$${JSON.stringify(te)}`);

    let r = new Result<Task>();
    console.log(`Result.empty: ${JSON.stringify(r)}, isSuccess: ${r.isSuccess}, isError: ${r.isError}`);
    r = r.asInProgress();
    console.log(`Result.inProgress: ${JSON.stringify(r)}, isSuccess: ${r.isSuccess}, isError: ${r.isError}`);
    r = r.asSuccess(new Task({
      id: "yes!!",
      title: "huga",
      description: "",
      timestamp: new Date(),
      completed: true
    }));
    // r.data!.id;
    console.log(`Result.success: ${JSON.stringify(r)}, isSuccess: ${r.isSuccess}, isError: ${r.isError}`);
    r = r.asError(new Error("error!"));
    console.log(`Result.error: ${JSON.stringify(r)}, isSuccess: ${r.isSuccess}, isError: ${r.isError}`);

    let tl = new TaskList({
      src: Immutable.Map([[t.id, t]])
    });
    tl = tl.addTask(
      new Task({
        id: "yes!!",
        title: "huga",
        description: "",
        timestamp: new Date(),
        completed: true
      })
    );

    let ts = new TaskState();
    console.log(`TaskState: ${JSON.stringify(ts)}`);
    ts = ts.withTasks(tl);
    console.log(`TaskState(tasks): ${JSON.stringify(ts)}`);
    ts = ts.withCreateResult(new Result({
      inProgress: false,
      data: new Task({
        id: "oh, yes!!",
        title: "huga",
        description: "",
        timestamp: new Date(),
        completed: true
      }),
    }));
    console.log(`TaskState(createResult): ${JSON.stringify(ts)}`);    

    // console.log(`update: ${
    //   tl.updateTask(t.with({title: "yeah!!!!!!!!!", completed: false}))
    //   }`);
    // console.log(`clearCompletedTasks: ${tl.clearCompletedTasks()}`);

    // console.log(`getById1: ${tl.getTaskById("yes!!")}`);
    // console.log(`getById2: ${tl.getTaskById("yes")}`);
    // console.log(`delete: ${tl.deleteTask("hoge")}`);

    // let as1 = new AppSettings({
    //   taskSortSetting: new TaskSortSetting({
    //     taskSortBy: TaskSortBy.TITLE,
    //     taskSortByOrder: TaskSortByOrder.ASC
    //   }),
    //   taskVisibilityFilter: TaskVisibilityFilter.ALL,
    // });
    // console.log(`${as1}`);
    // as1 = as1.with({
    //   taskSortSetting: as1.taskSortSetting.with({
    //     taskSortBy: TaskSortBy.TIMESTAMP
    //   })
    // });
    // console.log(`${as1}`);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Icon name="done" size={30} color="#900" />
      </View>
    );
  }

  public componentWillMount() {
    console.log("#componentWillMount()");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
