import React, { PureComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import { Icon } from "native-base";

import moment from "moment";
import { connect } from "react-redux";

import {
  dataLoadFetch,
  dataLoadHourly,
  dataLoadDaily
} from "../../store/actions/index";
import IconWeather from "../IconWeather/IconWeather";
import Loader from "../Loader/Loader";
import ModalData from "../ModalData/ModalData";
import locationAccess from "../../utils/locationAccess";

const sunday = require("../../assets/img/sunday.jpg");
const bunny = require("../../assets/img/bunny.jpg");
const cloud = require("../../assets/img/cloud.jpg");
const rain = require("../../assets/img/rain.jpg");
const smog = require("../../assets/img/smog.jpg");
const snow = require("../../assets/img/snow.jpg");

class Home extends PureComponent {
  state = {
    timeZona: "d",
    bgImg: bunny,
    modalVisible: false,
    errFetch: false,
    err: false
  };

  async componentDidMount() {
    await this.getPosition();
  }
  // Fetch DATA FROM API
  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const url =
          "https://api.darksky.net/forecast/0a4ae7350b397273c5c4559d4655d88a/";
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        fetch(`${url}${lat},${long}?lang=ru&units=si`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            // console.log("fetch data", data);

            // Cмена фона в зависимости от погоды
            this.bgChange(data.currently.icon);
            this.setState({ timeZona: data.timezone });
            //Redux добавления данных
            this.props.loadedData(data.currently);
            this.props.loadHourlyData(data.hourly);
            this.props.loadDailyData(data.daily);
          });
      },
      err => {
        // console.log(err);
        this.errGeoloc(err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Error Axios Geolocation fanction
  errGeoloc(err) {
    if (err.message == "No location provider available.") {
      this.setState({ errFetch: err.message, err: true });
      // Исправить ф-ция success не срабатывает
      // поэтому дублируется в error
      locationAccess()
        .then(success => {
          // Запрос на включение Геолокации
          this.getPosition();
        })
        .catch(error => {
          // Запрос на включение Геолокации
          this.getPosition();
        });
    } else if (err.code === 1) {
      this.setState({ errFetch: err.message, err: true });
    } else if (err.code === 2) {
      this.setState({ errFetch: err.message, err: true });
    } else if (err.code === 3) {
      this.setState({ errFetch: err.message, err: true });
    } else {
      this.setState({ err: false });
    }
  }

  bgChange = code => {
    switch (code) {
      case "rain":
        // Дождь
        this.setState({ bgImg: rain });
        break;
      case "snow":
        // Снегь
        this.setState({ bgImg: snow });
        break;
      case "fog":
        // Туман
        this.setState({ bgImg: smog });
        break;
      case "clear-day":
      case "clear-night":
        // Солнце
        this.setState({ bgImg: sunday });
        break;
      case "partly-cloudy-day":
      case "partly-cloudy-night":
      case "cloudy":
        // Облочно
        this.setState({ bgImg: cloud });
        break;
      default:
        this.setState({ bgImg: bunny });
        break;
    }
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  onModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const dataNow = this.props.dataList;
    const Celsius = Math.round(dataNow.temperature);
    const apparentTemperature = Math.round(dataNow.apparentTemperature);
    const windRound = Math.round(dataNow.windSpeed);
    const formattedDate = moment.unix(dataNow.time).format("YYYY-MM-DD");

    if (dataNow.length !== 0) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <ImageBackground
            source={this.state.bgImg}
            style={{ resizeMode: "stretch", ...styles.bgStyle }}
          >
            <View style={styles.content}>
              <Text style={styles.items}>{this.state.timeZona}</Text>
              <Text style={styles.items}>Дата : {formattedDate}</Text>
            </View>
            <View style={[styles.content, styles.centred]}>
              <Text style={styles.items}>{dataNow.summary}</Text>
              <IconWeather propIcon={dataNow.icon} styleIcon="white" />
            </View>
            <View style={styles.content}>
              <Text style={styles.items}>
                Температура : {Celsius}
                <Icon
                  style={styles.iconStyle}
                  type="MaterialCommunityIcons"
                  name="temperature-celsius"
                />
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.items}>
                Чувствуется как : {apparentTemperature}
                <Icon
                  style={styles.iconStyle}
                  type="MaterialCommunityIcons"
                  name="temperature-celsius"
                />
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.items}>
                Скорость ветра : {windRound} м/c.
              </Text>
            </View>
            <ModalData
              modalVisible={this.state.modalVisible}
              onModalClose={this.onModalClose}
              dataHourly={this.props.dataHourly}
            />
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text style={styles.btnText}>Подробнее</Text>
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      );
    } else if (this.state.err) {
      return (
        <View style={styles.errContainer}>
          <Text style={styles.errText}> {this.state.errFetch} </Text>
        </View>
      );
    } else {
      return <Loader />;
    }
  }
}

// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black"
  },
  bgStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  content: {
    width: Dimensions.get("window").width - 10,
    backgroundColor: "rgba(93, 47, 117, 0.9)",
    borderBottomWidth: 3,
    borderBottomColor: "white"
  },
  items: {
    color: "white",
    padding: 10,
    fontSize: 18,
    textShadowColor: "rgba(255, 255, 255, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  btn: {
    alignItems: "center",
    marginTop: 20,
    width: 200,
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  iconStyle: {
    color: "white",
    fontSize: 15
  },
  centred: {
    alignItems: "center"
  },
  errContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    padding: 10
    // backgroundColor: "black"
  },
  errText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold"
  }
});

//REDUX

const mapStateToProps = state => {
  return {
    dataList: state.dataLoad.currently,
    dataHourly: state.dataLoadHourly.hourly
  };
};

const mapDispatchToProps = dispatch => ({
  loadedData: val => dispatch(dataLoadFetch(val)),
  loadHourlyData: val => dispatch(dataLoadHourly(val)),
  loadDailyData: val => dispatch(dataLoadDaily(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
