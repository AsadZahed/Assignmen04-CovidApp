import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';
import MyButton from './components/button.js';
import History from './screens/History.js';
import App from './screens/HomeScreen.js';
import CS from './screens/CountryStatistics.js';
import Favourite from './screens/Favourite.js';
import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerType={'slide'}
      drawerStyle={{
        width: 200,
      }}>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          drawerLabel: 'World Statistics',
          drawerIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />

      <Drawer.Screen
        name="Search Countries"
        component={StackNavigator1}
        options={{
          drawerLabel: 'Search Countries',
          drawerIcon: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={StackNavigator2}
        options={{
          drawerLabel: 'Favourite Countries',
          drawerIcon: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const StackNavigator1 = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Feather
            name="menu"
            size={35}
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};
const StackNavigator2 = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Feather
            name="menu"
            size={35}
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen name="Favourite" component={Favourite} />
    </Stack.Navigator>
  );
};
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Feather
            name="menu"
            size={35}
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen
        name="Home"
        component={App}
        options={{
          title: 'Covid App',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Favourite" component={Favourite} />
      <Stack.Screen name="Country" component={CS} />
    </Stack.Navigator>
  );
};

function A() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
    width: '100%',
  },
  inputcontainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttoncontainer: {
    padding: 30,
  },
  textinput: {
    width: '70%',
    borderColor: 'Black',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 16,
    padding: 10,
    margin: 10,
  },
  paragraph: {
    margin: 14,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  paragraph1: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottomWidth: 2,
  },
  paragraph2: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  scrollviewtext: {
    fontSize: 18,
    color: 'white',
  },
  Scrollview1: {
    width: '100%',
  },
  ScrollViewItem: {
    width: '100%',
    backgroundColor: 'orange',
    alignSelf: 'center',
    padding: 20,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default A;
