import React, {useContext, useEffect, useState} from "react";
import {View, Text, TouchableOpacity} from 'react-native'
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


export default function Category({navigation}){
    const {theme} = useContext(ThemeContext)

    const [categories,setCategories] = useState(null)
    const {category,setCategory} = useContext(ReservationContext);
    const {step, nextStep,prevStep} = useContext(StepsContext);
    const {globals} = useContext(GlobalsContext);

    function chooseCategory(category){
        setCategory(category)
    }

    function fetchCategories() {
        let configCategory = {
            method: 'get',
            url: `${globals.api_url}/items/category`,
            headers: {}
        };

        axios(configCategory)
            .then((response) => {
                setCategories(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchCategories()
    },[categories])


if(categories === null) return <Loading/>
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
                    Choisissez la catégorie de la salle:
                </Text>
                <View
                    style={{
                        paddingHorizontal: 15,
                    }}
                >
                    <Picker
                        selectedValue={category}
                        onValueChange={chooseCategory}
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
                        {categories.map((category, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={category.name}
                                    value={category.id}
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
                        navigation.navigate("Reservation",{screen:"Building"})
                    }} >
                        <Text style={{
                            color: theme.primary,
                            textAlign: 'center',
                        }}>Précédant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        top:50,
                        backgroundColor: theme.bgContrast,
                        paddingVertical:10,
                        flex: 1,
                        borderRadius: 2,
                    }} activeOpacity={1} onPress={()=>{
                        if(step<3) nextStep();
                        setCategories(null)
                        navigation.navigate("Reservation",{screen:"Room"})
                    }} disabled={category === -1} >
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