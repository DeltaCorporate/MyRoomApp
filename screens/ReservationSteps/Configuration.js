import React, {useContext, useEffect, useState} from 'react';


import {View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import {ThemeContext} from "../../context/Theme";
import {ReservationContext} from "../../context/Reservation";
import {StepsContext} from "../../context/Steps";
import {GlobalsContext} from "../../context/Globals";
import StepBars from "./StepBars";
import TabBar from "../../components/TabBar";
import {container} from "../../assets/styles/theme";
import axios from "axios";
import Loading from "../Loading";

export default function Configuration({navigation}) {
    const {theme} = useContext(ThemeContext)
    const [configurations, setConfigurations] = useState(null);
    const {room} = useContext(ReservationContext);
    const {step, nextStep, prevStep} = useContext(StepsContext);
    const {globals} = useContext(GlobalsContext);

    const fetchConfig = () => {
        let config = {
            method: "get",
            url: `${globals.api_url}/items/configuration?filter[room]=${room}&fields=*,equipement.*`,
            headers: {}
        }

        axios(config).then((r) => {
            let datas = r.data.data;
            setConfigurations(datas)

        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {

        fetchConfig()
    }, [])


    function Equipement({equipement, total}) {
        return (
            <View style={{
                flexDirection: "row",
                height: 50,
                borderWidth: 1,
                borderColor: theme.primary,
                borderTopWidth: 0
            }}>
                <Text style={{
                    color: theme.primary,
                    flex: 1,
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: theme.primary,
                    lineHeight: 50,
                }}>{equipement.name}</Text>
                <Text style={{
                    color: theme.primary,
                    flex: 1,
                    textAlign: "center",
                    lineHeight: 50,
                }}>{total}</Text>
            </View>
        )
    }

    if (!configurations) return <Loading/>


    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.bg,

        }}>
            <StepBars/>
            <View style={{
                ...container,
                flex: 1,
                borderWidth: 1,
                borderBottomColor: theme.reverse.bg
            }}>
                <View style={{
                    top: 70,
                    maxHeight: 400,
                }}>

                    <View style={{
                        flexDirection: "row",
                        height: 50,
                        borderWidth: 1,
                        borderColor: theme.primary
                    }}>
                        <Text style={{
                            color: theme.primary,
                            flex: 1,
                            textAlign: "center",
                            borderRightWidth: 1,
                            borderColor: theme.primary,
                            lineHeight: 50,
                        }}>Equipement</Text>
                        <Text style={{
                            color: theme.primary,
                            flex: 1,
                            textAlign: "center",
                            lineHeight: 50,
                        }}>Total</Text>
                    </View>
                    <ScrollView style={{
                        maxHeight: 300,
                    }}>
                        {configurations.map((item, index) => {
                            return (
                                <Equipement equipement={item.equipement} total={item.total} key={index}/>
                            )
                        })
                        }
                    </ScrollView>


                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    top: 50

                }}>
                    <TouchableOpacity style={{
                        top: 50,
                        backgroundColor: theme.bgContrast,
                        paddingVertical: 10,
                        flex: 1,
                        marginRight: 10,
                        borderRadius: 2,
                    }} activeOpacity={1} onPress={() => {
                        prevStep()
                        navigation.navigate("Reservation", {screen: "Room"})
                    }}>
                        <Text style={{
                            color: theme.primary,
                            textAlign: 'center',
                        }}>Précédent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        top: 50,
                        backgroundColor: theme.bgContrast,
                        paddingVertical: 10,
                        flex: 1,
                        borderRadius: 2,
                    }} activeOpacity={1} onPress={() => {
                        if (step < 5) nextStep();
                        navigation.navigate("Reservation", {screen: "ValidReservation"})
                    }}>
                        <Text style={{
                            color: theme.primary,
                            textAlign: 'center',
                        }}>Suivant</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TabBar navigation={navigation}/>
        </View>
    )
}