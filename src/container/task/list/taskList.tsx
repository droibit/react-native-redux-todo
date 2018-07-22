import React, { Component } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import {
  Container,
  Content,
  Spinner,
} from 'native-base';

import { connect } from "react-redux";
import { Task } from "../../../module/model/task";

class TaskList extends Component {

  public render() {
    return (
      <Container>
      <Content>
      </Content>
    </Container>
    );
  }
}