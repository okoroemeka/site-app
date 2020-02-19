import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import HeaderButton from '../components/HeaderButton';
import { setPlaces } from '../store/place-action';

const PlaceListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaces());
  }, [dispatch]);
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          image={item.imageUri}
          title={item.title}
          address={item.address}
          onPress={() =>
            props.navigation.navigate('PlaceDetail', {
              placeTitle: item.title,
              placeId: item.id
            })
          }
        />
      )}
    />
  );
};

PlaceListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
export default PlaceListScreen;
