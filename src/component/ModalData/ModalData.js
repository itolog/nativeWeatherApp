import React from "react";
import { Modal, Text, Button, View, Alert } from "react-native";

import moment from "moment";
import Loader from "../Loader/Loader";

const ModalData = props => {
  const { summary, data } = props.dataHourly;
  console.log(props);
  if (props.dataHourly.length !== 0) {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>{summary}</Text>
              {data.map(val => {
                return console.log(
                  moment.unix(val.time).format("YYYY-MM-DD: HH")
                );
              })}
              <View>
                <Button
                  onPress={props.onModalClose}
                  title="Learn More"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
    return <Loader />;
  }
};

export default ModalData;
