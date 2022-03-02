import React, {useContext} from "react";
import {ActivityIndicator, Text, View} from "react-native";

import {ThemeContext} from "../context/Theme";
import {container} from "../assets/styles/theme";


export default function Loading(){
    const {theme} = useContext(ThemeContext)

    return(
        <View style={
            {
                flex:1,
                ...container,
                backgroundColor: theme.bg,
                alignItems:"center",
                justifyContent:"center"
            }
        }>
            <Text style={{
                color: theme.primary,
                marginBottom:50
            }}>
                Please wait
            </Text>

            <ActivityIndicator color={theme.primary} size={"large"}/>
        </View>
    );
}