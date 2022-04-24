import React, {useContext, useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import {ThemeContext} from "../../context/Theme";
import StepBars from "./StepBars";
import TabBar from "../../components/TabBar";
import {container} from "../../assets/styles/theme";
import {Picker} from "@react-native-picker/picker";
import Loading from "../Loading";
import {ReservationContext} from "../../context/Reservation";
import axios from "axios";
import {GlobalsContext} from "../../context/Globals";
import {StepsContext} from "../../context/Steps";


export default function Room({navigation,route}){
    const {theme} = useContext(ThemeContext)
    const [rooms,setRooms] = useState(null)
    const {room,setRoom,category,setCategory,building,setBuilding,startTime,endTime} = useContext(ReservationContext);
    const {step, nextStep,prevStep,setStep} = useContext(StepsContext);
    const {globals} = useContext(GlobalsContext);

    function chooseRoom(room){
        let possible = true;
        if(room<0)
        {
            setRoom(room)
            return;
        }
        let config = {
            method: "get",
            url: `${globals.api_url}/items/room/${room}?filter[building]=${building}&filter[category]=${category}&fields=*,reservations.*`,
            headers: {}
        }
        axios(config).then(r=>{
            r.data.data.reservations.forEach((r)=>{
                let start = new Date(r.startTime);
                let end = new Date(r.endTime);
                let startTimeChoosed = new Date(startTime)
                let endTimeChoosed = new Date(endTime);
                if((startTimeChoosed<start && endTimeChoosed <start) || (startTimeChoosed>end && endTimeChoosed>end) ){
                    possible = true;
                } else{
                    possible = false
                }
            })
            if(!possible){
                Alert.alert('', "La salle est déjà occupé à cette période", [

                    {
                        text: 'Changer le temps de réservation', onPress: () => {
                            setStep(0)
                            setRoom(-1)
                            navigation.navigate('Reservation',{screen:"Interval"})
                        }
                    },
                ]);
            } else{
                setRoom(room)
            }
        }).catch(err=>{console.log(err)})

    }

    function fetchRooms() {
        let config = {
            method: "get",
            url: `${globals.api_url}/items/room?filter[building]=${building}&filter[category]=${category}&fields=*,reservations.*`,
            headers: {}
        }
        axios(config).then((response) => {
            let data = response.data.data;
            if (data.length <= 0) {
               if(route.name === "Rooms"){
                   Alert.alert('', "Aucune salle de dispo dans ce batiment", [

                       {
                           text: 'Changer de batiment', onPress: () => {
                               setStep(2)
                               setBuilding(null)
                               navigation.navigate('Reservation',{screen:"Building"})
                           }
                       },
                       {
                           text: 'Changer de catégorie', onPress: () => {
                               prevStep();
                               setCategory(null)
                               navigation.navigate("Category")
                           }
                       },
                   ], {cancelable: false});
               }
            } else {
                setRooms(data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchRooms()
    },[])


    if(rooms === null) return <Loading/>
    return(
        <View style={{
            backgroundColor: theme.bg,
            flex: 1,
        }}>

            <StepBars/>
            <View
                style={{
                    top: 50,
                    flex: 1,
                    paddingTop: 50,
                }}
            >
                <Text
                    style={{
                        color: theme.primary,
                        bottom: 20,
                        ...container,
                    }}
                >
                    Choisissez la salle:
                </Text>
                <View
                    style={{
                        paddingHorizontal: 15,
                    }}
                >
                    <Picker
                        selectedValue={room}
                        onValueChange={chooseRoom}
                        mode="dropdown"
                        style={{
                            backgroundColor: theme.bgContrast,
                        }}
                        dropdownIconColor={theme.primary}
                    >
                        <Picker.Item
                            key={-1}
                            label={""}
                            value={-1}
                            style={{
                                color: theme.primary,
                                backgroundColor: theme.bgContrast,
                            }}
                        />
                        {rooms.map((room, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={room.name}
                                    value={room.id}
                                    style={{
                                        color: theme.primary,
                                        backgroundColor: theme.bgContrast,
                                    }}
                                />
                            );
                        })}
                    </Picker>
                </View>

                <View style={{
                    ...container,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{
                        top:50,
                        backgroundColor: theme.bgContrast,
                        paddingVertical:10,
                        flex: 1,
                        marginRight: 10,
                        borderRadius: 2,
                    }} activeOpacity={1} onPress={()=>{
                        prevStep()
                        navigation.navigate("Reservation",{screen:"Category"})
                    }} >
                        <Text style={{
                            color: theme.primary,
                            textAlign: 'center',
                        }}>Précédent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        top:50,
                        backgroundColor: theme.bgContrast,
                        paddingVertical:10,
                        flex: 1,
                        borderRadius: 2,
                    }} activeOpacity={1} onPress={()=>{
                        if(step<5) nextStep();
                        navigation.navigate("Reservation",{screen:"Configuration"})
                    }} disabled={room === -1} >
                        <Text style={{
                            color: theme.primary,
                            textAlign: 'center',
                        }}>Suivant</Text>
                    </TouchableOpacity>
                </View>
                <TabBar navigation={navigation} bottom={50}/>
            </View>

        </View>
    )
}