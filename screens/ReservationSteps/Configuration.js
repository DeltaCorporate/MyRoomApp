import React, {useContext, useEffect, useState} from 'react';


import {View, Text, ScrollView, FlatList} from "react-native";
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
    const [confRoom,setConfRoom] = useState(null);
    const [equipements,setEquipements] = useState(null);
    const {room} = useContext(ReservationContext);
    const {step, nextStep, prevStep} = useContext(StepsContext);
    const {globals} = useContext(GlobalsContext);
    const [load, setLoad] = useState(false);

    const fetchConfig = () => {
        let config = {
            method: "get",
            url: `${globals.api_url}/items/configuration?filter[room]=${room}`,
            headers: {}
        }

        axios(config).then((r) => {
            let datas = r.data.data;
            setConfigurations(datas)
            /*datas.forEach(item => {
                let configEquipement = {
                    method: "get",
                    url: `${globals.api_url}/items/equipement/${item.equipement}`,
                    headers: {}
                }
                axios(configEquipement).then((r) => {
                    let newConfs = configurations || [];
                    newConfs.push([r.data.data.name, item.total, item.id]);
                    setConfs(newConfs);

                }).catch(err => {
                    console.log(err)
                })
            })*/
        }).catch(err => {
            console.log(err)
        })
    }
    const fetEquipement = ()=>{
        let config = {
            method: "get",
            url: `${globals.api_url}/items/equipement`,
            headers: {}
        }
        axios(config).then(r=>{
            setEquipements(r.data.data);
        })
            .catch((err)=>{
                console.log(err)
            })
    }
    const filterEquipement = ()=>{

    }
    useEffect(() => {

        fetchConfig()
        fetEquipement()
        setTimeout(() => {
            setLoad(true)
        }, 3e3)
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
                }}>{equipement}</Text>
                <Text style={{
                    color: theme.primary,
                    flex: 1,
                    textAlign: "center",
                    lineHeight: 50,
                }}>{total}</Text>
            </View>
        )
    }

    function list() {
        return (
            <FlatList data={configurations} renderItem={renderEquipement} keyExtractor={(item, index) => {
                return index.toString()
            }}/>
        )

    }

    if (!load) return <Loading/>


    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.bg,

        }}>
            <StepBars/>
            <View style={{
                ...container,
                flex: 1,
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
                    <ScrollView>
                        {configurations.map((item, index) => {
                            return (
                                <Equipement equipement={item.equipement} total={item.total} key={index}/>
                            )
                        })
                        }
                    </ScrollView>


                </View>
            </View>
            <TabBar navigation={navigation}/>
        </View>
    )
}