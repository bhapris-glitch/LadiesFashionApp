import { Linking, Platform } from 'react-native';

export const handleDeepLink = (callback) => {
  // Add event listener
  Linking.addEventListener('url', callback);
  // Check initial URL
  Linking.getInitialURL().then((url) => {
    if (url && callback) callback({ url });
  });
};

export const addEventListener = (callback) => {
  Linking.addEventListener('url', callback);
};

export const getInitialURL = () => {
  return Linking.getInitialURL();
};
