import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/navigation/stacknavigation";
export default function App() {
  return(
  <NavigationContainer>
    <StatusBar backgroundColor='#2980b9' /> 
    <MyStack />
  </NavigationContainer>
  )
}