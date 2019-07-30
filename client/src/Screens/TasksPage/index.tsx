import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { inject, observer } from 'mobx-react';

import TaskStore, { TaskInfo } from './../../store/list';

interface TaskStoreProps {
  taskStore: typeof TaskStore.Type;
}

type TaskInfoType = typeof TaskInfo.Type;

const TaskItem = observer(({ item, onToggle, onDelete }) => {
  return (
    <View style={styles.container1}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.title}</Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          checkedColor="green"
          uncheckedColor="red"
          title={item.isDone ? 'Done' : 'Not Done'}
          checked={item.isDone}
          onPress={() => onToggle(item)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Remove Task" onPress={() => onDelete(item)} />
      </View>
    </View>
  );
});

class TasksPage extends Component<TaskStoreProps, { title: string }> {
  public constructor(props: TaskStoreProps) {
    super(props);
    this.state = {
      title: '',
    };
  }

  public componentDidMount() {
    const { taskStore } = this.props;
    taskStore.getAllTasks();
  }

  public _renderItem = ({ item }: { item: TaskInfoType }) => {
    return (
      <TaskItem
        item={item}
        onToggle={this._onToggle}
        onDelete={this._onDelete}
      />
    );
  };

  public _onDelete = (item: any) => {
    const { taskStore } = this.props;
    console.log('onDelete pressed');
    taskStore.removeTask(item);
  };

  public _onToggle = (item: any) => {
    item.toggleTask();
  };

  public onTaskAdd = (title: any) => {
    const { taskStore } = this.props;
    taskStore.addTodo(title);
    this.setState({ title: '' });
  };

  public keyExtractor = (item: TaskInfoType) => item.id;

  public render() {
    const { taskStore } = this.props;
    const listTasks = taskStore.tasks.toJSON();

    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            color: '#FDC200',
          }}
          value={this.state.title}
          placeholder="Enter the Task"
          onChangeText={text => this.setState({ title: text })}
        />
        <Button
          title={'Add'}
          onPress={() => this.onTaskAdd(this.state.title)}
        />
        <View style={styles.body}>
          {listTasks.length === 0 ? (
            <Text style={styles.emptyMessage}>No Items Found</Text>
          ) : (
            <FlatList
              data={listTasks}
              renderItem={this._renderItem}
              keyExtractor={this.keyExtractor}
            />
          )}
        </View>
      </View>
    );
  }
}

export default inject('taskStore')(observer(TasksPage));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  container1: {
    alignContent: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxContainer: {
    width: 150,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 0.8,
    justifyContent: 'space-between',
  },
  emptyMessage: {
    color: '#FDC200',
  },
  middlePart: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    alignContent: 'center',
    color: '#FDC200',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 15,
  },
});
