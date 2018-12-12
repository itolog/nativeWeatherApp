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

import moment from "moment";
import { connect } from "react-redux";

import { dataLoadFetch, dataLoadHourly } from "../../store/actions/index";
import requestLocationPermission from "../../utils/locationPermission";
import Loader from "../Loader/Loader";
import ModalData from "../ModalData/ModalData";
import toCelsius from "../../utils/toCelsius";

const fone = require("../../assets/img/snow.jpg");

class Home extends PureComponent {
  state = {
    timeZona: "d",
    modalVisible: false
  };

  async componentWillMount() {
    await requestLocationPermission();
  }

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

        fetch(`${url}${lat},${long}?lang=ru`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            // console.log("fetch data", data);

            this.setState({ timeZona: data.timezone });
            this.props.loadedData(data.currently);
            this.props.loadHourlyData(data.hourly);
          });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  onModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const dataNow = this.props.dataList;
    const Celsius = toCelsius(dataNow.temperature);
    const formattedDate = moment.unix(dataNow.time).format("YYYY-MM-DD");

    if (dataNow.length !== 0) {
      return (
        <ScrollView
          contentContainerStyle={
            styles.container // pagingEnabled={true} // horizontal={true}
          }
        >
          <ImageBackground
            source={fone}
            style={{ resizeMode: "stretch", ...styles.bgStyle }}
          >
            <View style={styles.content}>
              <Text style={styles.items}>{this.state.timeZona}</Text>
              <Text style={styles.items}>Дата : {formattedDate}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.items}>{dataNow.summary}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.items}>Температура : {Celsius}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.items}>
                Скорость ветра : {dataNow.windSpeed} м/с.
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
    backgroundColor: "rgba(93, 47, 117, 0.7)",
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
  loadHourlyData: val => dispatch(dataLoadHourly(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
