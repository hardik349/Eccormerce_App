import { NavigationContainer } from '@react-navigation/native';
import { LogBox, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { initRemoteConfig } from './src/config/remoteConfig';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import colors from './src/styles/colors';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    initRemoteConfig();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView
              style={styles.container}
              edges={['right', 'top', 'left']}
            >
              <StatusBar barStyle="light-content" backgroundColor="#121212" />
              <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </GestureHandlerRootView>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
