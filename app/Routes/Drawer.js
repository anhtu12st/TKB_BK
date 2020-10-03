import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStackScreen from './HomeStack';
import SignInScreen from '../Screens/SignInScreen';
import AuthProvider from '../contexts/AuthContext';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {isSignedIn ? (
          <>
            <Drawer.Screen name="Home" component={HomeStackScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="SignIn" component={SignInScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
