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

            <Text style={{
                color: colors.theme.primary
            }}>Home</Text>
            <TabBar navigation={navigation} bottom={0}/>
        </View>
    )
}


export default Home;