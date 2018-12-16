import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground
} from "react-native";
import { Icon } from "native-base";

import { connect } from "react-redux";
import moment from "moment";
import IconWeather from "../IconWeather/IconWeather";

const Days = props => {
  const { summary, data } = props.dataDaily;
  return (
    <ScrollView
      contentContainerStyle={
        styles.container // pagingEnabled={true} // horizontal={true}
      }
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{summary}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.time.toString()}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Дата: {moment.unix(item.time).format("DD/M/YYYY")}
            </Text>
            <IconWeather propIcon={item.icon} styleIcon="white" />
            <Text style={[styles.contentText, styles.contentTextMain]}>
              {" "}
              {item.summary}
            </Text>

            <Text style={styles.contentText}>
              Мин.Температура : {Math.round(item.temperatureMin)}
              <Icon
                style={styles.iconStyle}
                type="MaterialCommunityIcons"
                name="temperature-celsius"
              />
            </Text>
            <Text style={styles.contentText}>
              Макс.Температура : {Math.round(item.temperatureMax)}
              <Icon
                style={styles.iconStyle}
                type="MaterialCommunityIcons"
                name="temperature-celsius"
              />
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DAE1E8"
  },
  title: {
    padding: 4,
    backgroundColor: "#EDB32E",
    marginBottom: 5
  },
  titleText: {
    color: "#323648",
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    alignSelf: "center",
    backgroundColor: "#20232A",
    elevation: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    opacity: 0.9,
    width: Dimensions.get("window").width - 10
  },
  contentText: {
    color: "#61DAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#61DAFB",
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 8
  },
  contentTextMain: {
    color: "orange",
    fontSize: 18
  },
  iconStyle: {
    color: "white",
    fontSize: 12
  }
});

const mapStateToProps = state => {
  return { dataDaily: state.dataLoadDaily.daily };
};

export default connect(mapStateToProps)(Days);
