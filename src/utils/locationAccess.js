import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
const locationAccess = async () => {
  await LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: "<font color='#f1eb0a'>Включить локацию?</font>",
    ok: "ДА",
    cancel: "НЕТ",
    style: {
      backgroundColor: "#87a9ea", // (optional)

      positiveButtonTextColor: "#ffffff", // (optional)
      positiveButtonBackgroundColor: "#5fba7d", // (optional)

      negativeButtonTextColor: "#ffffff", // (optional)
      negativeButtonBackgroundColor: "#ba5f5f" // (optional)
    },
    enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
    showDialog: true, // false => Opens the Location access page directly
    openLocationServices: true, // false => Directly catch method is called if location services are turned off
    preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
    preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
    providerListener: true // true ==> Trigger locationProviderStatusChange listener when the location state changes
  });
};

export default locationAccess;
