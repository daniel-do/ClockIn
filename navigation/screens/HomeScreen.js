/**import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
        </View>
    );
}**/

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [mealStart, setMealStart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleClockIn = () => {
    setStartTime(new Date());
    setClockedIn(true);
  };

  const handleClockedIn = () => {
    if (startTime) {
      const endTime = new Date();
      const elapsedMilliseconds = endTime - startTime;
      setElapsedTime(elapsedMilliseconds);
      setClockedIn(false);
    }
  };

  const handleMealStart = () => {
    setStartTime(new Date());
    setMealStart(true);
  };

  const handleMealStarted = () => {
    if (startTime) {
      /**const endTime = new Date();
      const elapsedMilliseconds = endTime - startTime;
      setElapsedTime(elapsedMilliseconds);**/
      setMealStart(false);
    }
  };

  useEffect(() => {
    let interval;
    if (clockedIn) {
        setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (mealStart) {
        setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [clockedIn]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedTime =
      hours.toString().padStart(2, '0') +
      ':' +
      (minutes % 60).toString().padStart(2, '0') +
      ':' +
      (seconds % 60).toString().padStart(2, '0');

    return formattedTime;
  };

  return (
    <View style={styles.container}>
        <Text style={styles.timer}>{global.name}</Text>
        {clockedIn ? (
            <TouchableOpacity 
                    style={styles.clickedButton} 
                    onPress={() => {
                        handleClockedIn()
                    }}>
            <Text style={styles.buttonText}>Clock Out</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                onPress={() => {
                    handleClockIn();
                    navigation.navigate('Sign In');
                } }
                style={styles.button}>
                <Text style={styles.buttonText}>Clock In</Text>
            </TouchableOpacity>
        )}
        {mealStart ? (
            <TouchableOpacity style={styles.clickedButton} onPress={handleMealStarted}>
            <Text style={styles.buttonText}>End Meal</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleMealStart}>
            <Text style={styles.buttonText}>Start Meal</Text>
            </TouchableOpacity>
        )}
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 50,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 80,
    borderRadius: 10,
    marginBottom: 30,
  },
  clickedButton: {
    backgroundColor: '#FF0000',
    padding: 80,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default HomeScreen;