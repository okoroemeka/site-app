import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const MapScreen = props => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigaton.getParam('readonly');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitiude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);
  useEffect(() => {
    props.navigation.setParams({ pickedLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);
  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};
MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('pickedLocation');
  if (navData.navigation.getParam('readonly')) {
    return {};
  }
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.SaveButton} onPress={saveFn}>
        <Text style={styles.SaveButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  SaveButton: {
    marginHorizontal: 20
  },
  SaveButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});
export default MapScreen;
