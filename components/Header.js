import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../context/Theme";
import {Roboto_700Bold, useFonts} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import {Pressable, Text, View} from "react-native";
import {colors} from "../assets/styles/theme";
import {Feather} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';

const Header =()=>{
    const theme = useContext(ThemeContext);
    let [icon, setIcon] = useState('sun');
    let [fontsLoaded] = useFonts({
        Roboto_700Bold
    });

    if(!fontsLoaded){
        return <AppLoading/>
    }
    return (
        <View style={{
            paddingHorizontal: 20,
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

export default Header;