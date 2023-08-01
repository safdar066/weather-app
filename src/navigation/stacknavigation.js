import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import WeatherDetailScreen from '../WeatherDetailScreen';
import OnboardingScreen from '../OnboardingScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
       
      />
      <Stack.Screen
        name="WeatherDetailScreen"
        component={WeatherDetailScreen}
       
      />
       <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
       
      />
   

    </Stack.Navigator>
  );
}
export default MyStack;