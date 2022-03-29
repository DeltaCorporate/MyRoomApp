import React, {useContext, useEffect, useState} from "react";

import {Button, Platform, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../context/Theme";
import TabBar from "../components/TabBar";
import DateTimePicker from "@react-native-community/datetimepicker";


const Home = ({navigation}) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const {theme} = useContext(ThemeContext)

    function showMode(currentMode) {
        setShow(true)
        setMode(currentMode)
    }

    function onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.os === "ios");
        setDate(currentDate);
        console.log(date)
    }


    return (

        <View style={{
            flex: 1,
            backgroundColor: theme.bg
        }}>
            <View style={{
                marginTop: 10,
                flex: 1,

            }}>

                <TouchableOpacity style={{
                    backgroundColor: theme.primary,
                    marginBottom: 5
                }} onPress={()=>{showMode("date")}}>
                    <Text style={{
                        fontSize: 16,
                        textAlign: "center"

                    }}>Choisir la date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: theme.primary,
                    marginBottom: 5
                }} onPress={()=>{showMode("time")}}>
                    <Text style={{
                        fontSize: 16,
                        textAlign: "center",

                    }}>Choisir l'heure</Text>
                </TouchableOpacity>

            </View>

            {
                show && (
                    <DateTimePicker value={date} mode={mode} display={"default"} is24Hour={true} onChange={onChange}/>
                )
            }

            <TabBar navigation={navigation}/>
        </View>
    )
}


export default Home;