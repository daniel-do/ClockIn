import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

let startTimeClock = "";
let endTimeClock = "";

const HomeScreen = ({ navigation }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [mealStart, setMealStart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [time, setTime] = useState(new Date());

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
    setInterval(()=>setTime(new Date()),1000);
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
                        endTimeClock=time.toLocaleTimeString()
                    }}>
            <Text style={styles.buttonText}>Clock Out</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                onPress={() => {
                    handleClockIn();
                    navigation.navigate('Sign In');
                    startTimeClock=time.toLocaleTimeString();
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
        <Text style={styles.timerLabel}>{"Start"}</Text>
        <Text style={styles.timer}>{startTimeClock}</Text>
        <Text style={styles.timerLabel}>{"End"}</Text>
        <Text style={styles.timer}>{endTimeClock}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  timer: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  clickedButton: {
    backgroundColor: '#FF0000',
    padding: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default HomeScreen;