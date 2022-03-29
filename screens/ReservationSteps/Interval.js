import React, {useState, useContext} from "react";


import {View, Text, Platform, TouchableOpacity} from "react-native";
import {ThemeContext} from "../../context/Theme";
import {ReservationContext} from "../../context/Reservation";

import DateTimePicker from '@react-native-community/datetimepicker';
import {container} from "../../assets/styles/theme";
import TabBar from "../../components/TabBar";
import StepBars from "./StepBars";
import {StepsContext} from "../../context/Steps";


export default function Interval({navigation}) {
    const {startTime, setStartTime, endTime, setEndTime} = useContext(ReservationContext);
    const [modeStartTime, setModeStartTime] = useState('date')
    const [showStartTime, setShowStartTime] = useState(false)
    const {step,nextStep} = useContext(StepsContext);
    const [modeEndTime, setModeEndTime] = useState('date')
    const [showEndTime, setShowEndTime] = useState(false)


    const {theme} = useContext(ThemeContext);

    function showModeStartTime(currentMode) {
        setShowStartTime(true)
        setModeStartTime(currentMode)
    }

    function onChangeStartTime(event, selectedDate) {
        const currentDate = selectedDate || startTime;
        setShowStartTime(Platform.OS === "ios");
        setStartTime(currentDate);
    }
    function showModeEndTime(currentMode) {
        setShowEndTime(true);
        setModeEndTime(currentMode);
    }

    function onChangeEndTime(event, selectedDate) {
        const currentDate = selectedDate || endTime;
        setShowEndTime(Platform.OS === "ios");
        setEndTime(currentDate);
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.bg
        }}>
            <StepBars/>
            <View>
                <Text style={{
                    color: theme.primary,
                    fontSize: 16,
                    top: 60,
                    ...container,

                }}>
                    Choisis l'heure et la date de début de réservation:
                </Text>
                <View style={{
                    ...container,
                    flexDirection: 'row',
                    top:70,
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: theme.primary,
                        paddingHorizontal: 5,
                        paddingVertical: 8,
                        borderRadius: 4,
                        flex: 1,
                        marginRight:1
                    }} onPress={()=>showModeStartTime("date")}>
                        <Text
                        style={{
                            textAlign:"center",
                            color:theme.bg
                        }}>
                            Date de début
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: theme.primary,
                        paddingHorizontal: 5,
                        paddingVertical: 8,
                        borderRadius: 4,
                        flex: 1,
                        marginLeft:1
                    }} onPress={()=>showModeStartTime("time")}>
                        <Text
                        style={{
                            textAlign:"center",
                            color:theme.bg
                        }}>
                            Heure de début
                        </Text>
                    </TouchableOpacity>
                </View>
                {showStartTime && (
                    <DateTimePicker value={startTime} mode={modeStartTime} onChange={onChangeStartTime} display={"default"} minimumDate={new Date()} is24Hour={true}/>
                )}
                <Text style={{
                    color: theme.primary,
                    fontSize: 16,
                    top: 130,
                    ...container,

                }}>
                    Choisis l'heure et la date de fin de réservation:
                </Text>
                <View style={{
                    ...container,
                    flexDirection: 'row',
                    top:140,
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: theme.primary,
                        paddingHorizontal: 5,
                        paddingVertical: 8,
                        borderRadius: 4,
                        flex: 1,
                        marginRight:1
                    }} onPress={()=>showModeEndTime("date")}>
                        <Text
                        style={{
                            textAlign:"center",
                            color:theme.bg
                        }}>
                            Date de fin
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: theme.primary,
                        paddingHorizontal: 5,
                        paddingVertical: 8,
                        borderRadius: 4,
                        flex: 1,
                        marginLeft:1
                    }} onPress={()=>showModeEndTime("time")}>
                        <Text
                        style={{
                            textAlign:"center",
                            color:theme.bg
                        }}>
                            Heure de fin
                        </Text>
                    </TouchableOpacity>
                </View>
                {showEndTime && (
                    <DateTimePicker value={endTime} mode={modeEndTime} onChange={onChangeEndTime} display={"default"} minimumDate={new Date()} is24Hour={true}/>
                )}
            </View>
            <View style={{
                ...container,
            }}>
                <TouchableOpacity style={{
                    top:180,
                    backgroundColor: theme.primary,
                    paddingVertical:10,
                    borderRadius: 2
                }} activeOpacity={1} onPress={()=>{
                    if(step<1) nextStep();
                    navigation.navigate("Reservation",{screen:"Building"})
                }}  >
                    <Text style={{
                        color: theme.reverse.text_1,
                        fontWeight:"bold",
                        fontSize:16,
                        textAlign: 'center',
                    }}>Suivant</Text>
                </TouchableOpacity>
            </View>
            <TabBar navigation={navigation}/>
        </View>
    )
}