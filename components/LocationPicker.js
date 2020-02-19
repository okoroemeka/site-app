import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
// import * as Permissions from "expo-permissions";
import {
  View,
  ActivityIndicator,
  Button,
  Text,
  Alert,
  StyleSheet
} from 'react-native';
import { Colors } from '../constants/Colors';
import { verifyPermission } from '../constants/verifyPermission';
import { LOCATION } from 'expo-permissions';
import MapPreview from './MapPreview';
const LocationPicker = props => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('pickedLocation');
  const { onLocationPicked } = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission('LOCATION');
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const userLocation = await Location.getCurrentPositionAsync({
        timeout: 500
      });
      setPickedLocation({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude
      });
      props.onLocationPicked({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude
      });
    } catch (error) {
      Alert.alert(
        'Could not get location',
        'Please try again later or pick location on the map.',
        [{ text: 'okay' }]
      );
    }
    setIsFetching(false);
  };
  const getMap = () => {
    props.navigation.navigate('Map');
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={getMap}
      >
        <View style={styles.mapPreview}>
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No location chosen yet!</Text>
          )}
        </View>
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button title="view map" color={Colors.primary} onPress={getMap} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
export default LocationPicker;
