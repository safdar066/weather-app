import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ city, country }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="location-outline" size={24} color="white" />
      <View style={styles.cityCNT}>
        <Text style={styles.cityText} numberOfLines={2}>{city},</Text>
        <Text style={styles.countryText}>{country}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 80,
    width: '90%',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 0.4,
    borderColor: '#FFF',
    borderRadius: 4,
    padding:5
  },
  cityCNT: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap', // Allow the city name to wrap to the next line if needed
    flex: 1, // Take the available space
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    maxWidth: '80%', // Limit the width of the city name to 80% of the available space
  },
  countryText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
});

export default CustomHeader;
