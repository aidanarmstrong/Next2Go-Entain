import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/services/redux/store';


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
