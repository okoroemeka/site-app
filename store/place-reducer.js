import { ADD_PLACES, FETCH_PLACES } from './place-action';
import Places from '../model/Places';
const initialState = {
  places: []
};

const placesList = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PLACES:
      return {
        places: payload.map(
          place =>
            new Places(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        )
      };
    case ADD_PLACES:
      const newPlaces = new Places(
        new Date().toString(),
        payload.title,
        payload.image,
        payload.address,
        payload.coords.lat,
        payload.coords.lng
      );
      return {
        places: state.places.concat(newPlaces)
      };
    default:
      return state;
  }
};

export default placesList;
