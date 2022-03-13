import React, {useContext} from "react";

import {View, Text, TouchableOpacity} from "react-native"
import {ThemeContext} from "../context/Theme";

export default function TabBar({navigation}) {
    const {theme} = useContext(ThemeContext);
    return (
        <View style={{
            position: 'absolute',
            bottom: 80,
            right: 20,
            left: 20,
            elevation: 0,
            height: 70,
            borderRadius: 35,
            borderTopColor: "transparent",
            backgroundColor: theme.bgContrast,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-evenly"
        }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} >
                <Text style={{
                    color: theme.primary
                }}>
                    Hello
                </Text>
            </TouchableOpacity>

        </View>
    )
}