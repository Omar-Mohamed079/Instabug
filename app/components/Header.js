import React from 'react';
import { View,StyleSheet } from 'react-native';
import {Appbar} from 'react-native-paper';
function Header({onPress}) {
 return (
   <View style={styles.container}>
     <Appbar.Header>
       <Appbar.Content title="Movies App" />
       <Appbar.Action icon={require('../assets/plus.png')} onPress={onPress} />
     </Appbar.Header>
   </View>
 );
}
const styles = StyleSheet.create({
container:{
}
})
export default Header;