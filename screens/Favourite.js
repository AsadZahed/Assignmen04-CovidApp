import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  Keyboard,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

const Favourite = ({ navigation, route }) => {
  const [favlist, setfavlist] = useState([
    'Pakistan',
    'India',
    'China',
    'Indonesia',
  ]);
  const [getcountrylist, setcountrylist] = useState([]);
  const [getsearchedlist, setsearchedlist] = useState([]);
  const [getList, setList] = useState();
  const [geterror, seterror] = useState();
  const [getsearchtext, setsearchtext] = useState('');
  const [favilist, setfavilist] = useState([]);
  const loadData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('Keys' + keys);
      var list = [];
      for (let i = 0; i < keys.length; i++) {
        var value = await AsyncStorage.getItem(keys[i]);
        const cont = JSON.parse(value).value;
        console.log('I reached async', cont);
        if (value !== null) {
          list.push(cont);
        }
      }
      console.log('I reached async');
      setfavilist(list);
      console.log(list);
    } catch (e) {
      console.error(e);
    }
  };
  const saveData = async (key) => {
    try {
      await AsyncStorage.removeItem('@storage_Key_' + key);
    } catch (e) {
      console.error(e);
    }
  };
  const search = () => {
    if (getcountrylist.indexOf(getsearchtext.toUpperCase()) >= 0) {
      setsearchedlist([getsearchtext.toUpperCase()]);
    } else {
      setsearchedlist(['Error not found !!!']);
    }
  };
  const removeItem = (a) => {
    const list1 = getList.filter((item) => item.key != a);
    setList(list1);
  };
  const getTotalpopulation = () => {
    return fetch('https://world-population.p.rapidapi.com/allcountriesname', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '63b978786amsh7dd8c3db33bf96fp1e4b92jsncfe61f57edc0',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var m = responseJson.body.countries.map(function (x) {
          return x.toUpperCase();
        });
        setcountrylist(m);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Countries"
        size={24}
        color="black"
        onPress={() =>
          navigation.navigate('History', { favlist1: favlist })
        }></Button>
    ),
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    getTotalpopulation();
    loadData();
  }, []);
  const removefavourite = (a) => {
    const list1 = favlist.filter((item) => item != a);
    setfavlist(list1);
    console.log('Removed Favourites', a, list1);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.Scrollview1}>
        {favlist.map((item) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Country', { cname: item })}>
            <View style={styles.ScrollViewItem}>
              <TouchableOpacity>
                <Text style={styles.scrollviewtext}>{item}</Text>
              </TouchableOpacity>
              <AntDesign
                name="star"
                size={24}
                color="black"
                onPress={() => removefavourite(item)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: '8%',
    flex: 1,
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    // padding: 8,
    width: '100%',
  },
  InputContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollviewtext: {
    fontSize: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  Scrollview1: {
    paddingTop: '5%',
    paddingBottom: '5%',
    width: '80%',
    borderBottomWidth: 2,
  },
  textinput: {
    width: '70%',
    borderColor: 'Black',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 16,
    padding: 10,
  },
  ScrollViewItem: {
    paddingRight: '5%',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#5eff89',
    padding: 3,
    color: 'black',
    margin: 1,
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default Favourite;
