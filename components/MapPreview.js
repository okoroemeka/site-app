import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { googleApiKey } from '../Env/env';

const MapPreview = props => {
  let imageUrl;
  if (props.location) {
    imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${googleApiKey}`;
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imageUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
