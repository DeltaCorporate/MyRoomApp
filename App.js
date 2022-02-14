import React, {useContext, useEffect, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tabs from './navigation/Tabs';
import {Pressable, Text, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_700Bold
} from '@expo-google-fonts/roboto';

import {colors, ThemeContext} from "./context/globalStyles";
import {Feather} from "@expo/vector-icons";

const Header = ({style}) => {
    const theme = useContext(ThemeContext);
    let [icon, setIcon] = useState('moon');
    let [fontsLoaded] = useFonts({
        Roboto_700Bold
    });
    if (!fontsLoaded) {
        return <AppLoading/>
    }
    return (
        <View style={{
            paddingHorizontal: 20,
            paddingTop: 28,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Text style={{
                color: theme.theme.primary,
                fontFamily: "Roboto_700Bold",
            }}>MyRoom</Text>
            <Pressable onPress={() => {
                setIcon(icon === 'moon' ? 'sun' : 'moon');
                theme.setTheme(icon === 'moon' ? colors.dark : colors.light);
            }}>
                <Feather name={icon} size={24} color={theme.theme.primary}/>
            </Pressable>
        </View>
    )
}


export default function App() {
    const [theme, setTheme] = useState(colors.light);
    useEffect(() => {
        console.log(theme);
    }, []);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <SafeAreaView style={{
                width: "100%",
                height: "100%",
                backgroundColor: theme.bg
            }}>
                <StatusBar hidden={true}/>
                <NavigationContainer>
                    <Header/>
                    <Tabs/>
                </NavigationContainer>
            </SafeAreaView>
        </ThemeContext.Provider>
    );
}

