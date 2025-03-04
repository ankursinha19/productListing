import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/reducers/slices/themeSlice';
import { Switch, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigation from './BottomNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import LoginScreen from '../screens/LoginScreen';
import { refreshTokenCreator, sliceActions } from '../redux/reducers/slices/authSlice';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const theme = useSelector((state) => state.theme.theme);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const loadingApi = useSelector((state) => state.auth.loading);
  const authToken = useSelector((state) => state.auth.token);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem('token');
      if (!userToken) {
        setToken(null);
      } else {
        setToken(userToken);
        if (authToken) {
          dispatch(refreshTokenCreator());
        }
      }
    };

    checkAuth();
  }, [authToken, refreshToken, loadingApi]);

  const handleLogout = async () => {

    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      dispatch(sliceActions.loggedInUser({}));
      dispatch(sliceActions.loginSuccess(null));
      dispatch(sliceActions.logout());
      setToken(null);
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };


  if (loadingApi) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        screenOptions={{
          headerRight: () => (
            <>
              <View style={styles.switchContainer}>
                <Text style={{ color: darkMode ? '#fff' : '#000', marginRight: 5 }}>
                  {darkMode ? 'Dark' : 'Light'}
                </Text>
                <Switch value={darkMode} onValueChange={() => dispatch(toggleTheme())} />
              </View>
              {token && (
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={{ marginHorizontal: '1%' }}>Logout</Text>
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      >
        {token ? (
          <>
            <Drawer.Screen name="HomeTabs" component={BottomTabNavigation} options={{ title: 'Home' }} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          </>
        ) : (
          <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

