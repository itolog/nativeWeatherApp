import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./src/store/store";

import requestLocationPermission from "./src/utils/locationPermission";
import AppNavigator from "./src/navigation/AppNavigator";

class App extends Component {
  async componentWillMount() {
    // Доступ к геолокации
    await requestLocationPermission();
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
