import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Schedule({navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Detail');
      }}>
      <View>
        <Text style={styles.textSubject}>He thong so</Text>
      </View>
      <View>
        <Text style={styles.textInfo}>7:00-10:00</Text>
        <Text style={styles.textInfo}>H1-210</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 10,

    backgroundColor: '#ffb3ff',
    borderRadius: 10,
  },
  textSubject: {
    fontSize: 20,
  },
  textInfo: {
    fontSize: 16,
  },
});
