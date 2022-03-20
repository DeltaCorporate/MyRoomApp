import React, {useContext, useEffect} from "react";

import {View, Text, TouchableOpacity} from "react-native"
import {ThemeContext} from "../context/Theme";
import {Dimensions} from 'react-native';
import {useRoute} from "@react-navigation/native";
import {AntDesign, Entypo} from "@expo/vector-icons";

export default function TabBar({navigation,bottom}) {
    const {theme} = useContext(ThemeContext);
    const route = useRoute();


    return (
        <View style={{
            position: 'absolute',
            bottom:bottom||0 ,
            right: 0,
            left: 0,
            height: 70,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: theme.bgContrast,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} activeOpacity={1}>
                <AntDesign name="home" size={24} color={theme.primary} style={{
                    opacity: route.name === "Home" ? 1 : 0.3
                }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Reservation",{screen:"Building"})} activeOpacity={1}>
                <Entypo name="list" size={24} color={theme.primary} style={{
                    opacity: route.name === "Building" || route.name === "Category" || route.name === "Room"  || route.name === "Configuration" || route.name === "ValidReservation" ? 1 : 0.3
                }}/>
            </TouchableOpacity>

        </View>
    )
}