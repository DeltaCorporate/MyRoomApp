import React,{useState,useContext} from "react";


import {View, Text} from "react-native";
import {ThemeContext} from "../../context/Theme";




export default function Interval({navigation}){
    const [startTime, setStartTime] = useState(null);


    const {theme} = useContext(ThemeContext);


    return(
        <View style={{
            flex:1,
            backgroundColor:theme.primary
        }}>
            <Text>
                This is a page to set the reservation time for any room
            </Text>
        </View>
    )
}