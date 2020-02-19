import React from 'react';
import PlacesNavigation from './navigation/PlacesNavigation';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import placeListReducer from './store/place-reducer.js';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('connected to the database');
  })
  .catch(err => {
    console.log('failed to connect to database ');
  });
const rootRducer = combineReducers({
  places: placeListReducer
});
const store = createStore(rootRducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}
