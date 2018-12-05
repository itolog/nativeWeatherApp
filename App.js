import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingTop: 50
  }
});

export default App;
