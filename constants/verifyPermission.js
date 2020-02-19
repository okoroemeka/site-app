import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

export const verifyPermission = async permissionName => {
  const result = await Permissions.askAsync(Permissions[permissionName]);
  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      `You need to grant ${permissionName.toLowerCase()} permissions to use this app.`,
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};
