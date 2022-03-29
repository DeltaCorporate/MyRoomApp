import React, {useContext, useEffect, useState} from "react";


import {View, Text, TouchableOpacity, Alert} from "react-native"
import {ThemeContext} from "../../context/Theme";
import {ReservationContext} from "../../context/Reservation";
import {GlobalsContext} from "../../context/Globals";
import axios from "axios";
import Loading from "../Loading";
import {container} from "../../assets/styles/theme";
import TabBar from "../../components/TabBar";
import {StepsContext} from "../../context/Steps";
import StepBars from "./StepBars";


export default function ValidReservation({navigation}) {
    const {theme} = useContext(ThemeContext)
    const {building, room, category,setBuilding,setRoom,setCategory,startTime,endTime} = useContext(ReservationContext)
    const [roomData, setRoomData] = useState(null);
    const [buildingData, setBuildingData] = useState(null);
    const {globals} = useContext(GlobalsContext)
    const {setStep, prevStep, step} = useContext(StepsContext)

    function fetchBuilding() {
        let config = {
            method: 'get',
            url: `${globals.api_url}/items/building/${building}`,
            headers: {}
        };
        axios(config).then(r => {
            setBuildingData(r.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    function fetchRoom() {
        let config = {
            method: 'get',
            url: `${globals.api_url}/items/room/${room}?filter[category]=${category}`,
            headers: {}
        };
        axios(config).then(r => {
            setRoomData(r.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    function reserver() {
        let data = JSON.stringify({
            "room": room,
            "building": building,
            "category": category,
            "startTime":startTime,
            "endTime":endTime
        })
        let config = {
            method: 'post',
            url: `${globals.api_url}/items/reservation`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(r => {
            setStep(1)
            setRoom(null)
            setCategory(null)
            setBuilding(null)
            Alert.alert("Reservation effectué", "Votre réservation a bien été prise en compte", [
                {
                    text: "Retourner à l'accueil",
                    onPress: ()=>navigation.navigate("Home")
                }
            ],{
                cancelable:false
            });
        }).catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        fetchBuilding()
        fetchRoom()

    }, [])
    if (!roomData || !buildingData) return <Loading/>
    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.bg
        }}>

            <StepBars/>
            <Text style={{
                color: theme.text_1,
                top: 100,
                fontSize: 16,
                ...container

            }}>
                Validez vous souhaiter réserver la salle {roomData.name} dans le bâtiment {buildingData.name} du {startTime.getDate() >9 ? startTime.getDate() : "0"+startTime.getDate()}/{startTime.getMonth() >9 ? startTime.getMonth() : "0"+startTime.getMonth()}/{startTime.getFullYear()} au {endTime.getDate() >9 ? endTime.getDate() : "0"+endTime.getDate()}/{endTime.getMonth()>9 ? endTime.getMonth(): "0"+endTime.getMonth()}/{endTime.getFullYear()}.
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                top: 100,
                ...container

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
                    navigation.navigate("Reservation", {screen: "Configuration"})
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
                }} activeOpacity={1} onPress={reserver}>
                    <Text style={{
                        color: theme.primary,
                        textAlign: 'center',
                    }}>Valider</Text>
                </TouchableOpacity>
            </View>

            <TabBar navigation={navigation}/>
        </View>
    )
}