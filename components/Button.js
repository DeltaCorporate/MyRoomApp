import React, {useContext, useEffect} from 'react';
import {View,TouchableOpacity,Text} from "react-native";
import {ThemeContext} from "../context/Theme";



function Button({children,onPress,touchableStyle,textStyle}){
    const {theme} = useContext(ThemeContext)
    return(
            <TouchableOpacity onPress={onPress} style={{
                backgroundColor:theme.primary,
                paddingHorizontal: 5,
                paddingVertical:8,
                borderRadius:4,
                ...touchableStyle
            }} activeOpacity={0.5}>
                <Text style={{
                    color: theme.bg,
                    textAlign: "center",
                    ...textStyle
                }}>
                    {children}
                </Text>
            </TouchableOpacity>
    )
}


export default Button;