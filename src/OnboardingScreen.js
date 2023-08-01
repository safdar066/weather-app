import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Welcome to WeatherApp!',
    text: 'Get real-time weather forecasts for any city worldwide.',
    image: require('./assets/slide1.png'),
  },
  {
    key: '2',
    title: 'View Weekly Forecasts',
    text: 'Explore the 7-day weather forecast for your selected city.',
    image: require('./assets/slide2.png'),
  },
  {
    key: '3',
    title: 'Check Hourly Weather',
    text: 'Get detailed hourly weather information for the next 24 hours.',
    image: require('./assets/slide3.png'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    // Handle the "Get Started" button press or skip logic
    // In this example, we'll navigate to the main app screen
    navigation.navigate('Home');
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      showSkipButton
      onSkip={onDone} // Use the same logic for the "Skip" button
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    
  },
  image: {
    width: 270,
    height: 270,
    marginBottom: 24,
    borderWidth:0.4,
    borderColor:'#FFF'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default OnboardingScreen;
