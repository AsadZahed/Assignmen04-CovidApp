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
import { useIsFocused } from '@react-navigation/native';
import MyButton from '../components/button.js';
import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

const CS = ({ navigation, route }) => {
  const [getcoviddata, setcoviddata] = useState([[]]);
  const [gettpop, settpop] = useState([[]]);

  var nameee = route.params.cname;
  nameee = nameee.toLowerCase();
  const [getname, setname] = useState(
    nameee[0].toUpperCase() + nameee.slice(1)
  );
  var name = nameee[0].toUpperCase() + nameee.slice(1);
  console.log('.......', getname, ',,,,,,,,,');

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Countries"
        size={24}
        color="black"
        onPress={() => navigation.navigate('History')}></Button>
    ),
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    getTotalData();
    getTotalpopulation();
  }, [isFocused]);

  const getTotalpopulation = () => {
    return fetch(
      'https://world-population.p.rapidapi.com/population?country_name=' + name,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '63b978786amsh7dd8c3db33bf96fp1e4b92jsncfe61f57edc0',
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        settpop(responseJson.body.population);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTotalData = () => {
    return fetch('https://covid-19-data.p.rapidapi.com/country?name=' + name, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '76fbc2515fmsh24b70e9528313cep14c311jsn24f8b29de26a',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('I am name:' + name);
        //console.log(responseJson)
        setcoviddata(responseJson);
        console.log(responseJson);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View tyle={styles.container}>
        <Text style={styles.scrollviewtext}>
          Want to add this country to favourites?
        </Text>
        <AntDesign
          name="staro"
          size={26}
          color="black"
          onPress={() => console.log('')}
        />
      </View>
      <ScrollView style={styles.Scrollview1}>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>Total Population: {gettpop}</Text>
        </View>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>
            Affected Population:
            {((getcoviddata[0].confirmed * 100) / gettpop).toFixed(3)}
          </Text>
        </View>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>
            Confirmed Cases: {getcoviddata[0].confirmed}
          </Text>
        </View>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>
            Recovered Cases: {getcoviddata[0].recovered}
          </Text>
        </View>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>
            Critical Cases: {getcoviddata[0].critical}
          </Text>
        </View>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>
            Deaths: {getcoviddata[0].deaths}
          </Text>
        </View>
        <View style={styles.ScrollViewItem}>
          <Text style={styles.scrollviewtext}>
            Last Updated: {getcoviddata[0].lastUpdate}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
    width: '100%',
  },
  scrollviewtext: {
    fontSize: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  Scrollview1: {
    width: '100%',
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
export default CS;
