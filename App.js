import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./src/store/store";

import AppNavigator from "./src/navigation/AppNavigator";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
