import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  text: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 50
  },
  button: {
    backgroundColor: '#86DC3D',
    padding: 60,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default function DetailsScreen({ navigation }) {
    const [message, setMessage] = useState('');
    return (
      <View style={styles.container}>
            <TextInput
                style={styles.text}
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Type in your name..."></TextInput>
          <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                navigation.navigate('JDAN Enterprise, LLC')}}>
            <Text
                style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
}
