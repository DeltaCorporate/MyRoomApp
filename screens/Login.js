import React,{useContext} from "react";

import { Text, View } from "react-native";
import {ThemeContext} from "../context/Theme";


const Login = ()=>{
    const colors = useContext(ThemeContext)
    const {theme} = colors;

    return(
        <View style={{
            flex:1,
            backgroundColor: theme.bg
        }}>
            <Text>Login</Text>

        </View>
    );
}


export default Login;