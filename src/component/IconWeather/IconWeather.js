import React from "react";
import { View } from "react-native";
import { Icon } from "native-base";

const IconWeather = props => {
  const { propIcon, styleIcon } = props;
  console.log(styleIcon);
  if (propIcon == "clear-day" || propIcon == "clear-night") {
    return (
      <View>
        <Icon
          name="weather-sunny"
          type="MaterialCommunityIcons"
          style={{ color: styleIcon }}
        />
      </View>
    );
  } else if (propIcon == "rain") {
    return (
      <View>
        <Icon
          name="weather-pouring"
          type="MaterialCommunityIcons"
          style={{ color: styleIcon }}
        />
      </View>
    );
  } else if (propIcon == "snow") {
    return (
      <View>
        <Icon
          name="weather-snowy"
          type="MaterialCommunityIcons"
          style={{ color: styleIcon }}
        />
      </View>
    );
  } else if (propIcon == "sleet") {
    return (
      <View>
        <Icon
          name="weather-snowy-rainy"
          type="MaterialCommunityIcons"
          style={{ color: styleIcon }}
        />
      </View>
    );
  } else if (propIcon == "wind") {
    return (
      <View>
        <Icon
          name="weather-windy"
          type="MaterialCommunityIcons"
          style={{ color: styleIcon }}
        />
      </View>
    );
  } else if (propIcon == "fog") {
    return (
      <View>
        <Icon
          name="weather-fog"
          type="MaterialCommunityIcons"
          style={{ color: styleIcon }}
        />
      </View>
    );
  } else if (
    propIcon == "cloudy" ||
    propIcon == "partly-cloudy-day" ||
    propIcon == "partly-cloudy-night"
  ) {
    return (
      <View>
        <Icon
          style={{ color: styleIcon }}
          name="weather-cloudy"
          type="MaterialCommunityIcons"
        />
      </View>
    );
  } else {
    return (
      <View>
        <Icon
          style={{ color: styleIcon }}
          name="weather-hurricane"
          type="MaterialCommunityIcons"
        />
      </View>
    );
  }
};

export default IconWeather;
