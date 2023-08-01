import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_KEY = '361b0f227745476da6392300232807';
const BASE_URL = 'https://api.weatherapi.com/v1';
const AUTOCOMPLETE_ENDPOINT = '/search.json';

const SearchInput = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${AUTOCOMPLETE_ENDPOINT}?key=${API_KEY}&q=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.log('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);
    fetchSuggestions(text);
  };

  const handleLocationSelect = (location) => {
    setQuery(location.name);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleLocationSelect(item)}
    >
      <Ionicons name="location-outline" size={24} color="gray" />
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationText}>{item.name}</Text>
        <Text style={styles.locationCountry}>{item.country}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#2980b9" />
      <TextInput
        style={styles.input}
        placeholder="Search for a city..."
        value={query}
        onChangeText={handleInputChange}
      />
      <FlatList
        data={suggestions}
        renderItem={renderSuggestionItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.suggestionsList}
      />
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
        backgroundColor: '#fff',
        height: 50,
        width: '90%',
        borderRadius: 4,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        elevation: 5,
        padding: 10,
        position: 'relative', // Make the container position relative
        zIndex: 1, // Add a higher zIndex to appear on top of other elements
      },
      input: {
        flex: 1,
        fontSize: 14,
        color: '#2980b9',
        paddingHorizontal: 10,
      },
      suggestionsList: {
        position: 'absolute',
        width: '107%', // Adjust the width to match the container
        top: 51, // Adjust the vertical position to avoid overlap with currentWeather container
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        elevation: 5,
        zIndex: 2, // Add a higher zIndex to appear on top of other elements
      },
      suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      locationTextContainer: {
        marginLeft: 10,
      },
      locationText: {
        fontSize: 16,
      },
      locationCountry: {
        color: 'gray',
      },
});

export default SearchInput;
