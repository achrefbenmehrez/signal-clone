import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import AddChat from './screens/AddChat';
import Chat from './screens/Chat';

const Stack = createNativeStackNavigator()

export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initializeRouteName="Home" screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="AddChat" component={AddChat}/>
        <Stack.Screen name="Chat" component={Chat}/>

      </Stack.Navigator>
    </NavigationContainer>
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
