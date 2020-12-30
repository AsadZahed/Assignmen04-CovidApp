import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button,ScrollView ,TouchableOpacity} from 'react-native';

const MyButton = (props) =>{
  var color="grey"
  if ((props.oprice.length && props.dper.length &&props.text.length)<=0){
     var color="grey"
  }
  else{
     color ="#161b57"
  }
 

return(
  <TouchableOpacity disabled={(props.oprice.length && props.dper.length && props.text.length)<=0} onPress={props.onPressEvent}><View style={{backgroundColor:color,padding:10,borderRadius:50}}>
     <Text style={styles.scrollviewtext} >Save</Text>
     </View>
     </TouchableOpacity>
);
}
const styles = StyleSheet.create(
{
scrollviewtext:{
  flexDirection:"row",
fontSize:18,
color:"white",
},
}
)
export default MyButton;
