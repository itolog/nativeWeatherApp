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
      activeTintColor: "white",
      activeBackgroundColor: "blue",
      style: {
        backgroundColor: "black"
      },
      labelStyle: {
        fontSize: 18
      },
      inactiveTintColor: "orange"
    }
  }
);

export default createAppContainer(TabNavigator);
