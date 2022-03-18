import React, {useContext, useEffect, useState} from "react";
import {Text, View,TouchableOpacity} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {ThemeContext} from "../../context/Theme";
import {container} from "../../assets/styles/theme";
import axios from "axios";
import {GlobalsContext} from "../../context/Globals";
import Loading from "../Loading";
import {ReservationContext} from "../../context/Reservation";
import TabBar from "../../components/TabBar";
import {StepsContext} from "../../context/Steps";
import StepBars from "./StepBars";


export default function Building({navigation}) {
    const [buildings, setBuildings] = useState(null)
    const {theme} = useContext(ThemeContext);
    const {globals} = useContext(GlobalsContext)
    const {step,nextStep} = useContext(StepsContext)

    const {building,setBuilding} = useContext(ReservationContext);

    function fetchBuildings() {
        let configBuildings = {
            method: 'get',
            url: `${globals.api_url}/items/building`,
            headers: {}
        };

        axios(configBuildings)
            .then((response) => {
                setBuildings(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function chooseBuilding(building){
        setBuilding(building);
    }


    useEffect(() => {
        fetchBuildings();
    }, [])


    if (!buildings) return <Loading/>
    return (
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
                    Choisissez le bâtiment:
                </Text>
                <View
                    style={{
                        paddingHorizontal: 15,
                    }}
                >
                    <Picker
                        selectedValue={building}
                        onValueChange={chooseBuilding}
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
                        {buildings.map((building, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={building.name}
                                    value={building.id}
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
                }}>
                    <TouchableOpacity style={{
                        top:50,
                        backgroundColor: theme.bgContrast,
                        paddingVertical:10,
                        borderRadius: 2
                    }} activeOpacity={1} onPress={()=>{
                        if(step<2) nextStep();
                        navigation.navigate("Reservation",{screen:"Category"})
                    }} disabled={building === -1} >
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