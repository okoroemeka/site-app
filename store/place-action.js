import * as FileSystem from 'expo-file-system';
export const ADD_PLACES = 'ADD_PLACES';
export const FETCH_PLACES = 'FETCH_PLACES';
import { insertPlaces, fetchPlaces } from '../helpers/db';
import { googleApiKey } from '../Env/env';

export const addPlaces = (title, image, location) => async dispatch => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${googleApiKey}`
  );
  if (!response.ok) {
    throw new Error('Something went wrong.');
  }
  const resData = await response.json();
  if (!resData.results) {
    throw new Error('Something went wrong!');
  }
  console.log('resData', resData);
  const address = resData.results[0].formatted_address;
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath
    });
    const place = await insertPlaces(
      title,
      newPath,
      address,
      location.lat,
      location.lng
    );
    dispatch({
      type: ADD_PLACES,
      payload: {
        id: place.id.toString(),
        title,
        image: newPath,
        address,
        coords: { lat: location.lat, lng: location.lng }
      }
    });
  } catch (error) {
    throw error;
  }
};
export const setPlaces = () => async dispatch => {
  try {
    const {
      rows: { _array: places }
    } = await fetchPlaces();
    dispatch({ type: FETCH_PLACES, payload: places });
  } catch (error) {}
};
