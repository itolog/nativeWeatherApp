import React, { Component } from "react";
import { Container, Tab, Tabs, TabHeading, Icon } from "native-base";
import HomeScreen from "../component/Home/Home";
import DaysScreen from "../component/Days/Days";
export default class TabNavigator extends Component {
  render() {
    return (
      <Container>
        <Tabs tabBarPosition="bottom">
          <Tab
            heading={
              <TabHeading>
                <Icon name="home" />
              </TabHeading>
            }
          >
            <HomeScreen />
          </Tab>
          <Tab heading="Days">
            <DaysScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
