import React,{useContext} from "react";

import { Text, View } from "react-native";
import { ThemeContext } from "../context/globalStyles";


const Login = ()=>{
    const colors = useContext(ThemeContext)
    return(
        <View style={{
            flex:1,
            backgroundColor: colors.theme.bg
        }}>
            <Text style={{
                    color: colors.theme.primary
                }}>Login</Text>
        </View>
    );
}


export default Login;