import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button
} from 'react-native';
import { Colors } from '../constants/Colors';
import { addPlaces } from '../store/place-action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const [value, setValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();
  const handeValueChange = text => {
    setValue(text);
  };
  const imageTakenHandler = imageUri => {
    setSelectedImage(imageUri);
  };
  const handleSavePlace = () => {
    dispatch(addPlaces(value, selectedImage, selectedLocation));
    props.navigation.goBack();
  };
  const locationPickerHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={handeValueChange} />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickerHandler}
        />
        <Button
          title="Save Places"
          color={Colors.primary}
          onPress={() => handleSavePlace()}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add a Place'
};
const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});
export default NewPlaceScreen;
