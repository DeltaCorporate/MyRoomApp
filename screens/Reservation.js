import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ThemeContext} from "../context/Theme";
import {container} from "../assets/styles/theme";
import axios from "axios";
import Step from "../components/Step";
import SeparatorStep from "../components/SeparatorStep";
import Navigation from "../components/Navigation";
import {Picker} from "@react-native-picker/picker";

const Reservation = () => {
    const {theme} = useContext(ThemeContext);
    const [buildings,setBuildings] = useState([]);
    const [building,setBuilding] = useState(0);

    const [step, setStep] = useState(1);
    function nextStep() {
        if (step === 5) return;
        setStep(step + 1);
    }

    function prevStep() {
        if (step === 1) return;
        setStep(step - 1);
    }




    function chooseBuilding(building) {
        setBuilding(building)
    }
    useEffect(()=>{
        let config = {
            method: 'get',
            url: 'http://192.168.1.62:8055/items/building',
            headers: { }
        };

        axios(config)
            .then((response) => {

                setBuildings(response.data);
                console.log(buildings)
            })
            .catch((error) => {
                console.log(error);
            });


    },[])


    return (
        <View style={{
            flex:1,
            backgroundColor: theme.bg
        }}>
            {/*STEPS*/}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...container,
                top: 40,
            }}>
                <Step theme={theme} step={step} value={1}/>
                <SeparatorStep theme={theme} step={step} value={1}/>
                <Step theme={theme} step={step} value={2}/>
                <SeparatorStep theme={theme} step={step} value={2}/>
                <Step theme={theme} step={step} value={3}/>
                <SeparatorStep theme={theme} step={step} value={3}/>
                <Step theme={theme} step={step} value={4}/>
                <SeparatorStep theme={theme} step={step} value={4}/>
                <Step theme={theme} step={step} value={5}/>
            </View>

            {/*STEP 1: BUILDING*/}
            <View style={{
                top: 50,
                display: step === 1 ? "flex" : "none",
                paddingVertical: 50
            }}>
                <Text style={{
                    color: theme.primary,
                    bottom: 20,
                    ...container
                }}>
                    Choisissez le bâtiment:
                </Text>
                <View style={{
                    paddingHorizontal: 15,
                }}>
                    <Picker selectedValue={building} onValueChange={chooseBuilding} mode="dropdown" style={{
                        backgroundColor: theme.bgContrast
                    }} dropdownIconColor={theme.primary}>
                        {/*{buildings.map((building,index)=>{
                            return(
                                <Picker.Item key={index} label={building.name} value={building.id} style={{
                                    color: theme.primary,
                                    backgroundColor: theme.bgContrast,

                                }}/>
                            )
                        })}*/}
                    </Picker>
                </View>

            </View>

            <Navigation theme={theme} step={step} prevStep={prevStep} nextStep={nextStep} />
        </View>
    );
};

export default Reservation;