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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

const History = ({ navigation, route }) => {
  const [getcountrylist, setcountrylist] = useState([]);
  const [getsearchedlist, setsearchedlist] = useState([]);
  const [getnc, setnc] = useState([]);
  const [getList, setList] = useState();
  const [geterror, seterror] = useState();
  const [getsearchtext, setsearchtext] = useState('');
  const [favlist, setfavlist] = useState([]);
  const removeItem = (a) => {
    const list1 = getList.filter((item) => item.key != a);
    setList(list1);
  };

  const search = () => {
    if (getcountrylist.indexOf(getsearchtext.toUpperCase()) >= 0) {
      seterror(0);
      setsearchedlist([getsearchtext.toUpperCase()]);
      // setfavlist([...favlist,getsearchtext.toUpperCase()])
    } else {
      seterror(1);
    }
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
        setnc(responseJson.body.countries);
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
        title="Favourite"
        size={24}
        color="black"
        onPress={() =>
          navigation.navigate('Favourite', { favlist1: favlist })
        }></Button>
    ),
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    getTotalpopulation();
    if (route.params?.favlist1) {
      setfavlist(route.params.favlist1);
      navigation.setParams({ favlist: undefined });
    }
  }, [isFocused]);

  const errorcomp = (
    <ScrollView style={styles.Scrollview1}>
      <TouchableOpacity onPress={console.log()}>
        <View style={styles.ScrollViewItem}>
          <TouchableOpacity style={{ color: 'black' }}>
            <Text style={styles.scrollviewtext}>Error Country Not Found </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
  const removefavourite = (a) => {
    const list1 = favlist.filter((item) => item != a);
    setfavlist([...favlist, list1]);
    console.log('Removed Favourites', a, list1);
  };
  const addfavourite = (a) => {
    if (favlist.indexOf(a.toUpperCase()) >= 0) {
      console.log('Already Favourite');
    } else {
      setfavlist([...favlist, a]);
      console.log('Added Favourites', a, favlist);
    }
  };
  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(
        '@storage_Key_' + data,
        JSON.stringify({ value: data })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Country Name"
          onChangeText={(text) => {
            setsearchtext(text);
          }}
          value={getsearchtext}
        />
        <TouchableOpacity onPress={search}>
          <Text
            style={{
              ...styles.scrollviewtext,
              padding: 10,
              borderRadius: 50,
              color: 'black',
              backgroundColor: '#5eff89',
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      {geterror > 0 ? errorcomp : console.log()}
      <ScrollView style={styles.Scrollview1}>
        {getsearchedlist.map((item) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Country', { cname: item, clist: getnc })
            }>
            <View style={styles.ScrollViewItem}>
              <TouchableOpacity style={{ color: 'black' }}>
                <Text style={styles.scrollviewtext}>{item} </Text>
              </TouchableOpacity>
              <AntDesign
                name="staro"
                size={26}
                color="black"
                onPress={() => addfavourite(item)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.Scrollview1}>
        {getcountrylist.map((item) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Country', { cname: item, clist: getnc })
            }>
            <View style={styles.ScrollViewItem}>
              <TouchableOpacity style={{ color: 'black' }}>
                <Text style={styles.scrollviewtext}>{item} </Text>
              </TouchableOpacity>
              <AntDesign
                name="staro"
                size={26}
                color="black"
                onPress={() => saveData(item)}
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

export default History;
