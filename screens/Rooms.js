import React, {useState, useEffect, useContext} from "react";
import {View, TouchableOpacity, Text, Platform, useColorScheme} from "react-native";
import {ThemeContext} from "../context/Theme";
import {Picker} from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../components/Button";
import SeparatorStep from "../components/SeparatorStep";
import Step from "../components/Step";
import Navigation from "../components/Navigation";

import {container} from "../assets/styles/theme";


const Rooms = () => {
    const [buildings, SetBuildings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [step, setStep] = useState(1);
    const [building, setBuilding] = useState("A");
    const [room, setRoom] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [modeStart, setModeStart] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [dateEnd, setDateEnd] = useState(new Date());
    const [modeEnd, setModeEnd] = useState('date');
    const [showEnd, setShowEnd] = useState(false);

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setShowStart(Platform.OS === 'ios');
        setDateStart(currentDate);
    };

    const showModeStart = (currentMode) => {
        setShowStart(true);
        setModeStart(currentMode);
    };

    const showDatepickerStart = () => {
        showModeStart('date');
    };

    const showTimepickerStart = () => {
        showModeStart('time');
    };
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setShowEnd(Platform.OS === 'ios');
        setDateEnd(currentDate);
    };

    const showModeEnd = (currentMode) => {
        setShowEnd(true);
        setModeEnd(currentMode);
    };

    const showDatepickerEnd = () => {
        showModeEnd('date');
    };

    const showTimepickerEnd = () => {
        showModeEnd('time');
    };


    function chooseBuilding(building) {
        setBuilding(building);
    }


    function nextStep() {
        if (step === 5) return;
        setStep(step + 1);
    }

    function prevStep() {
        if (step === 1) return;
        setStep(step - 1);
    }

    useEffect(() => {
    }, [])


    const {theme} = useContext(ThemeContext);

    function chooseRoom(room) {
        setRoom(room)
    }

    return (
        <View style={{
            backgroundColor: theme.bg,
            flex: 1,

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


            {/*STEP 1*/}
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
                        <Picker.Item label={"Batiment A"} value="A" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                        <Picker.Item label={"Batiment B"} value="B" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                        <Picker.Item label={"Batiment C"} value="C" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                    </Picker>
                </View>

            </View>

            {/*STEP 2*/}
            <View style={{
                top: 50,
                display: step === 2 ? "flex" : "none",
                paddingVertical: 50
            }}>
                <Text style={{
                    color: theme.primary,
                    bottom: 20,
                    ...container
                }}>
                    Choisissez la salle:
                </Text>
                <View style={{
                    paddingHorizontal: 15,
                }}>
                    <Picker selectedValue={room} onValueChange={chooseRoom} mode="dropdown" style={{
                        backgroundColor: theme.bgContrast
                    }} dropdownIconColor={theme.primary}>
                        <Picker.Item label={"Salle D1"} value="D1" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                        <Picker.Item label={"Salle D3"} value="D2" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                        <Picker.Item label={"Salle D2"} value="D3" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                    </Picker>
                </View>

            </View>
            {/*STEP 3*/}
            <View style={{
                top: 50,
                display: step === 3 ? "flex" : "none",
                paddingVertical: 50
            }}>
                <Text style={{
                    color: theme.primary,
                    bottom: 20,
                    ...container
                }}>
                    Vous souhaitez réserver du:
                </Text>
                <View style={{
                    paddingHorizontal: 15,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Button theme={theme} onPress={showDatepickerStart} touchableStyle={{ flex: 1,marginRight: 10 }}>Date de début</Button>
                        <Button theme={theme} onPress={showTimepickerStart} touchableStyle={{
                            flex: 1
                        }}>Heure de début</Button>
                    </View>
                    <View style={{
                        top:20,
                        paddingVertical:10,
                        backgroundColor: theme.bgContrast
                    }}>
                        <Text style={{
                            color: theme.reverse.bg
                        }}>
                            {dateStart.getDate()+'/'+ (dateStart.getMonth() < 10 ? "0"+dateStart.getMonth() : dateStart.getMonth())+'/'+dateStart.getFullYear() + " à "+ dateStart.getHours()+":"+dateStart.getMinutes()}
                        </Text>
                    </View>
                    {showStart && (
                        <DateTimePicker
                            value={dateStart}
                            mode={modeStart}
                            is24Hour={true}
                            minimumDate={new Date()}
                            display="default"
                            onChange={onChangeStart}
                        />
                    )}
                </View>

            </View>
            <Navigation theme={theme} step={step} prevStep={prevStep} nextStep={nextStep}/>
        </View>
    )
}


export default Rooms;