import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Image, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from './components/CustomHeader';
import SearchInput from './components/SearchInput';

const API_KEY = '361b0f227745476da6392300232807';
const BASE_URL = 'https://api.weatherapi.com/v1';
const LOCATION_ENDPOINT = '/forecast.json';
const AUTOCOMPLETE_ENDPOINT = '/search.json';

const HomeScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const handleWeatherContainerPress = () => {
    // Navigate to the WeatherDetailScreen when the currentWeather container is clicked
    navigation.navigate('WeatherDetailScreen', { city: weatherData.location.name });
  };
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
    fetchWeatherDataByLocation();
  }, []);

  const fetchWeatherDataByLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${LOCATION_ENDPOINT}?key=${API_KEY}&q=${latitude},${longitude}&days=7`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  const fetchWeatherDataByCity = async (location) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${LOCATION_ENDPOINT}?key=${API_KEY}&q=${location.lat},${location.lon}&days=7`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  const handleLocationSelect = (location) => {
    fetchWeatherDataByCity(location);
  };

  const renderWeatherItem = ({ item }) => {
    const date = new Date(item.date);
    const day = date.toLocaleDateString(undefined, { weekday: 'short' });
    const iconUrl = `https:${item.day.condition.icon}`;


    return (
      <TouchableOpacity style={styles.weatherItem}>
        <Text style={styles.dayText}>{day}</Text>
        <Image
          source={getWeatherImage(item.day.condition.text)}
          style={styles.weatherIcon1}
        />
        <Text style={styles.tempText}>{`${item.day.maxtemp_c}°C`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#2980b9' />
      {weatherData ? (
        <LinearGradient
          colors={['#2980b9', '#3498db']}
          style={styles.gradientContainer}
        >
          <Text style={styles.contact}>Contact with developer</Text>
          <Text style={styles.profileLNK}>linkedin.com/in/safdar066/</Text>
          <CustomHeader
            city={weatherData.location.name}
            country={weatherData.location.country}
          />
          <SearchInput onLocationSelect={handleLocationSelect} />

          <TouchableOpacity
            onPress={handleWeatherContainerPress}
            activeOpacity={0.5}
            style={styles.currentWeather}>
            <Text style={styles.heading}>Today weather at {weatherData.location.name} </Text>
            <View style={styles.weatherInfo}>
              <View style={styles.weatherText}>
                <Text style={styles.currentTemp}>
                  {`${weatherData.current.temp_c}°C`}
                </Text>
                <Text style={styles.currentCondition}>
                  {weatherData.current.condition.text}
                </Text>
              </View>
              <Image
                source={getWeatherImage(weatherData.current.condition.text)}
                style={styles.weatherIcon}
              />
            </View>
            <Text style={styles.currentDate}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
          <View style={styles.weeklyForecastContainer}>
            <Text style={styles.heading}>Weekly Weather Forecast</Text>
            <FlatList
              data={weatherData.forecast.forecastday}
              keyExtractor={(item) => item.date}
              renderItem={renderWeatherItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weatherList}
            />
          </View>
        </LinearGradient>
      ) : (
        <Text>Loading...</Text>
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
  contact:{
    color: '#FFF',
    fontWeight:'200',
    fontSize:11
  },
  profileLNK:{
    color: '#FFF',
    fontWeight:'300',
    fontSize:12
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWeather: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    // elevation: 5,
    borderWidth: 0.4,
    borderColor: '#FFF'
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherText: {
    flex: 1,
  },
  weatherIcon: {
    width: 130,
    height: 130,
    // Add any other custom styles for the weather icon
  },
  weatherIcon1: {
    width: 80,
    height: 70,
  },
  currentTemp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  currentCondition: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  currentDate: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  weatherList: {
    paddingHorizontal: 20,
  },
  weatherItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    width: 100,
    justifyContent: 'center',
    borderWidth:0.3,
    borderColor: '#FFF'
  },
  dayText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  tempText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weeklyForecastContainer: {
    height: 200, 
    paddingHorizontal:18
  }

});

export default HomeScreen;
