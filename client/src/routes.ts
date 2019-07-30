import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import TasksPage from './Screens/TasksPage/index';

const Home = createStackNavigator(
  {
    TasksPage,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: 'none',
    cardStyle: {
      shadowColor: 'transparent',
    },
  }
);

const routes = (initialRouteName: string) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        Home,
      },
      {
        initialRouteName,
      }
    )
  );
};

export default routes;
