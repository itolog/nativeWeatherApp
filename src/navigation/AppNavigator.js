import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../component/Home/Home";
import DaysScreen from "../component/Days/Days";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Days: DaysScreen
  },
  {
    tabBarOptions: {
      activeTintColor: "tomato",
      style: {
        backgroundColor: "blue"
      },
      labelStyle: {
        fontSize: 16
      },
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(TabNavigator);
