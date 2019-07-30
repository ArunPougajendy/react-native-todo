import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
import { Provider } from 'mobx-react';
import TaskStore from './store/list';
import TaskPage from './Screens/TasksPage';

class AppHome extends PureComponent {
  public constructor(props: any) {
    super(props);
    this.state = {
      taskStore: TaskStore.create({ tasks: [] }),
    };
  }

  public render() {
    const { taskStore } = this.state;
    return (
      <Provider taskStore={taskStore}>
        <TaskPage />
      </Provider>
    );
  }
}

export default AppHome;
