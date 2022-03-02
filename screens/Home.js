import React, {useContext, useEffect} from "react";

import {Text, View} from "react-native";
import {ThemeContext} from "../context/Theme";


const Home = () => {
    const colors = useContext(ThemeContext)
    return (

        <View style={{
            flex: 1,
            backgroundColor: colors.theme.bg
        }}>
            <Text style={{
                color: colors.theme.primary
            }}>Home</Text>
        </View>
    )
}


export default Home;