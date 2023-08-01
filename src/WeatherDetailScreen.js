// WeatherDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';

const API_KEY = '361b0f227745476da6392300232807';
const BASE_URL = 'https://api.weatherapi.com/v1';
const DAILY_INTERVALS_ENDPOINT = '/forecast.json';
const HOURLY_INTERVALS_ENDPOINT = '/forecast.json';

const WeatherDetailScreen = ({ route }) => {
    const { city } = route.params; // Get the selected city from the navigation params
    const [dailyData, setDailyData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [loading, setLoading] = useState(true);
     const getWeatherImage = (conditionText) => {
        switch (conditionText.toLowerCase()) {
          case 'clear':
            return require('./assets/clear.png');
          case 'partly cloudy':
          case 'cloudy':
            return require('./assets/cloudy.png');
          case 'rain':
            return require('./assets/rain.png');
          case 'thunderstorm':
            return require('./assets/thunderstorm.png');
          case 'snow':
            return require('./assets/snow.png');
          default:
            return require('./assets/partlycloudy.png'); // Default image for unknown conditions
        }
      };
    useEffect(() => {
      fetchWeatherData();
    }, []);
  
    const fetchWeatherData = async () => {
      try {
        // Fetch daily intervals weather data
        const dailyResponse = await axios.get(
          `${BASE_URL}${DAILY_INTERVALS_ENDPOINT}?key=${API_KEY}&q=${city}&days=7`
        );
  
        // Fetch hourly intervals weather data
        const hourlyResponse = await axios.get(
          `${BASE_URL}${HOURLY_INTERVALS_ENDPOINT}?key=${API_KEY}&q=${city}&hours=24`
        );
  
        setDailyData(dailyResponse.data.forecast.forecastday);
        setHourlyData(hourlyResponse.data.forecast.forecastday[0].hour);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching weather data:', error);
        setLoading(false);
      }
    };
  
    if (loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#2980b9" />
          </View>
        );
      }
    
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Weather Details for {city}</Text>
    
          <Text style={styles.subHeading}>Hourly Intervals:</Text>
    
          {/* Wrap the FlatList in a parent ScrollView */}
          <View style={styles.flatListContainer}>
        <FlatList
         showsVerticalScrollIndicator={false} // Hide vertical scrollbar
         showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
          data={hourlyData}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.weatherItem}>
              <Text style={styles.dayText}>{item.time}</Text>
              <Image
                source={getWeatherImage(item.condition.text)}
                style={styles.weatherIcon}
              />
              <Text style={styles.currentTemp}>{`${item.temp_c}°C`}</Text>
              <Text style={styles.weatherText}>{item.condition.text}</Text>
              {/* Display other hourly weather information */}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.time}
          numColumns={3} // Display the FlatList in 3 columns
          contentContainerStyle={styles.weatherList}
        />
      </View>
        </View>
      );
    };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2980b9',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#FFF',
  
    },
    subHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color:'#FFF'
    },
    weatherListContainer: {
      paddingHorizontal: 10, // Adjust the horizontal padding for better spacing between columns
      alignItems: 'center', // Center the content horizontally
    
    },
    weatherItem: {
      alignItems: 'center',
      margin: 5, // Adjust the margin to create spacing between items
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: 15,
      width: 100,
      justifyContent: 'center',
      borderWidth:0.35,
    borderColor: '#FFF',
    
    
    },
    dayText: {
      color: 'white',
      fontSize: 14,
      marginBottom: 5,
      alignSelf:'center'
    },
    weatherIcon: {
      width: 50,
      height: 50,
    },
    weatherText: {
      color: 'white',
      fontSize: 12,
    },
    weatherListContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        
      },
      flatListContainer: {
        flex: 1,
       // Add some padding at the top to create space
        // paddingBottom: 10, // Add some padding at the bottom to create space
      },
    });
    
    export default WeatherDetailScreen;