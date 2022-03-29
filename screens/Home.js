import React, {useContext, useEffect, useState} from "react";

import {Button, Platform, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../context/Theme";
import TabBar from "../components/TabBar";
import DateTimePicker from "@react-native-community/datetimepicker";


const Home = ({navigation}) => {
const {theme} = useContext(ThemeContext);
    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.bg
        }}>
            <TabBar navigation={navigation}/>
        </View>
    )
}


export default Home;