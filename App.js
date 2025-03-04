import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/redux/store/getstore'
import { Provider } from 'react-redux'
import DrawerNavigator from './src/navigation/DrawerNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <DrawerNavigator />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
