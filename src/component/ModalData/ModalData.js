import React from "react";
import {
  Modal,
  Text,
  Button,
  View,
  Alert,
  StyleSheet,
  FlatList,
  ScrollView
} from "react-native";
import { Icon } from "native-base";

import IconWeather from "../IconWeather/IconWeather";
import actualData from "../../utils/filterDate";
import Loader from "../Loader/Loader";
import moment from "moment";

const ModalData = props => {
  const { summary, data } = props.dataHourly;

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
          <ScrollView style={styles.content}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>{summary}</Text>
              </View>
              <View>
                <FlatList
                  data={actualData(data)}
                  keyExtractor={item => item.time.toString()}
                  renderItem={({ item }) => (
                    <View id={item.time} style={styles.blockView}>
                      <Text style={styles.blockViewText}>
                        Время: {moment.unix(item.time).format("HH:mm")}
                      </Text>
                      <View>
                        <Text style={styles.blockViewText}>
                          Описание: {item.summary}
                        </Text>
                        <IconWeather propIcon={item.icon} styleIcon="black" />
                      </View>
                      <Text
                        style={[
                          styles.blockViewText,
                          item.temperature < 0
                            ? styles.tempMinus
                            : styles.tepmPlus
                        ]}
                      >
                        Температура: {Math.round(item.temperature)}
                        <Icon
                          style={styles.iconStyle}
                          type="MaterialCommunityIcons"
                          name="temperature-celsius"
                        />
                      </Text>
                      <Text style={styles.blockViewText}>
                        Скорость ветра: {Math.round(item.windSpeed)} м/с
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
          <View>
            <Button
              onPress={props.onModalClose}
              title="Назад"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Modal>
      </View>
    );
  } else {
    return <Loader />;
  }
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#663399"
  },
  title: {
    backgroundColor: "white",
    padding: 5
  },
  titleText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  blockView: {
    padding: 5,
    borderColor: "#4FACE4",
    borderWidth: 2,
    backgroundColor: "#E6F4FE"
  },
  blockViewText: {
    color: "#006699",
    fontSize: 15,
    fontWeight: "bold"
  },
  iconStyle: {
    color: "blue",
    fontSize: 12
  },
  tempMinus: {
    color: "#05A5D1"
  },
  tepmPlus: {
    color: "orange"
  }
});

export default ModalData;
