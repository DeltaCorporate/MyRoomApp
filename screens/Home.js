import React, {useContext, useEffect} from "react";

import {Text, View} from "react-native";
import {ThemeContext} from "../context/Theme";
import TabBar from "../components/TabBar";


const Home = ({navigation}) => {
    const colors = useContext(ThemeContext)
    return (

        <View style={{
            flex: 1,
            backgroundColor: colors.theme.bg
        }}>
            <TabBar navigation={navigation}/>
            <Text style={{
                color: colors.theme.primary
            }}>Home</Text>
        </View>
    )
}


export default Home;