import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeClockApp = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleClockIn = () => {
    setStartTime(new Date());
    setClockedIn(true);
  };

  const handleClockOut = () => {
    if (startTime) {
      const endTime = new Date();
      const elapsedMilliseconds = endTime - startTime;
      setElapsedTime(elapsedMilliseconds);
      setClockedIn(false);
    }
  };

  useEffect(() => {
    let interval;
    if (clockedIn) {
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
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      {clockedIn ? (
        <TouchableOpacity style={styles.button} onPress={handleClockOut}>
          <Text style={styles.buttonText}>Clock Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleClockIn}>
          <Text style={styles.buttonText}>Clock In</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 36,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TimeClockApp;
