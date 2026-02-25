import { NavigationContainer } from '@react-navigation/native';
import { LogBox, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { initRemoteConfig } from './src/config/remoteConfig';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    initRemoteConfig();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
          <StatusBar
            barStyle="light-content"
            translucent={false}
            backgroundColor={isDarkMode ? '#000' : '#FFF'}
          />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
