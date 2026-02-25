import remoteConfig from '@react-native-firebase/remote-config';

export const initRemoteConfig = async () => {
  await remoteConfig().setDefaults({
    BASE_URL: 'https://dummyjson.com',
  });

  //fetch the latest values from server
  await remoteConfig().fetch(0);
  await remoteConfig().fetchAndActivate();
};

export const getBaseUrl = () => {
  return remoteConfig().getValue('BASE_URL').asString();
};
