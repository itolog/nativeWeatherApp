import React, { PureComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";

import { dataLoadFetch } from "../../store/actions/index";
import requestLocationPermission from "../../utils/locationPermission";

const fone = require("../../assets/img/snow.jpg");

class Home extends PureComponent {
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
            // console.log(
            //   Math.round(((data.currently.apparentTemperature - 32) * 5) / 9) +
            //     " C"
            // );
            console.log(data.daily);
            this.props.loadedData(data.currently);
          });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    const dataNow = this.props.dataList.currently;
    console.log("render props : ", dataNow);
    return (
      <ScrollView
        // horizontal={true}
        // pagingEnabled={true}
        contentContainerStyle={styles.container}
      >
        <ImageBackground
          source={fone}
          style={{ resizeMode: "stretch", ...styles.bgStyle }}
        >
          <View style={styles.content}>
            <Text style={styles.items}>{dataNow.summary}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.items}>
              kvn dn iurnvuirn uirnv uirnvuirvnnruivnreui nreuiv nreuiv rn
              rnviurnvuirnvuirvn reuiv nruivn
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    );
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
    alignItems: "center"
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
  }
});

//REDUX

const mapStateToProps = state => {
  return { dataList: state.dataLoad };
};
const mapDispatchToProps = dispatch => ({
  loadedData: val => dispatch(dataLoadFetch(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
