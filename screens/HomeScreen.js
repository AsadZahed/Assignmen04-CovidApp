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
import MyButton from '../components/button.js';
import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App = ({ navigation, route }) => {
  const [getcoviddata, setcoviddata] = useState([[]]);
  const [gettpop, settpop] = useState([[]]);
  //-------------------------------------------------------

  const [geteditingitem, seteditingitem] = useState(0);
  useEffect(() => {
    // When returning from History Screen Update state
    if (route.params?.list) {
      setList(route.params.list);
      // Reste Parameters
      navigation.setParams({ list: undefined });
    }
  });
  navigation.setOptions({});

  useEffect(() => {
    getTotalData();
    getTotalpopulation();
  }, []);

  const getTotalpopulation = () => {
    return fetch('https://world-population.p.rapidapi.com/worldpopulation', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '63b978786amsh7dd8c3db33bf96fp1e4b92jsncfe61f57edc0',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        settpop(responseJson.body.world_population);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getTotalData = () => {
    return fetch('https://covid-19-data.p.rapidapi.com/totals', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '732a2643d3mshf3d16ace3a873aap16b12ajsn3c1d74acfcff',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        setcoviddata(responseJson);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(gettpop);
  return (
    <View style={styles.container}>
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
export default App;
