import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Schedule from './Schedule';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Schedule navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
