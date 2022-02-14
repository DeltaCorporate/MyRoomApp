import React,{useContext, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tabs from './navigation/Tabs';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  
} from '@expo-google-fonts/inter';

import { colors,ThemeContext } from "./context/globalStyles";

const Header = ({style}) => {
  const colors = useContext(ThemeContext);
  return (
    <View style={{
      paddingHorizontal:20,
      paddingTop:20,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
    }}>
      <Text style={{
        color:colors.theme.primary
      }}>MyRoom</Text>
    </View>
  )
}




export default function App() {
  const [theme,setTheme] = useState(colors.light);

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <SafeAreaView style={{
        width: "100%",
        height: "100%",
        backgroundColor:theme.bg
      }}>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <Header />
          <Tabs />
        </NavigationContainer>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

