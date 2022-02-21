import React, {useContext, useEffect, useState} from "react";
import {Alert, FlatList, Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import {ThemeContext} from "../context/Theme";
import {Picker} from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../components/Button";
import SeparatorStep from "../components/SeparatorStep";
import Step from "../components/Step";
import Navigation from "../components/Navigation";

import {container} from "../assets/styles/theme";
import EquipementItem from "../components/EquipementItem";
import {AntDesign} from "@expo/vector-icons";


const Rooms = () => {
    const [buildings, SetBuildings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [step, setStep] = useState(1);
    const [building, setBuilding] = useState("");
    const [room, setRoom] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [modeStart, setModeStart] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [dateEnd, setDateEnd] = useState(new Date());
    const [modeEnd, setModeEnd] = useState('date');
    const [showEnd, setShowEnd] = useState(false);
    const [actualEquipement,setActualEquipement] = useState('');
    const [equipements,setEquipements] = useState([]);

    function reserver(){
        if (!building || !room || !dateStart || !dateEnd || !actualEquipement) {
            Alert.alert("","Veuillez remplir tous les champs");
        } else {
            Alert.alert("","Réservation effectuée");
        }
    }


    function onChooseEquipement(equipement){
        setActualEquipement(equipement);
        if(equipements.includes(equipement)) return
        addEquipement(equipement);
    }
    function addEquipement(equipement){
        let equipementList = equipements;
        equipementList.push(equipement);
        setEquipements(equipementList);
    }

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
                            {(dateStart.getDate() < 10 ? "0"+dateStart.getDate() : dateStart.getDate())+'/'+ (dateStart.getMonth() < 10 ? "0"+dateStart.getMonth() : dateStart.getMonth())+'/'+dateStart.getFullYear() + " à "+ (dateStart.getHours() < 10 ? "0"+dateStart.getHours() : dateStart.getHours())+":"+(dateStart.getMinutes() < 10 ? "0"+dateStart.getMinutes() : dateStart.getMinutes())}
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
                <View style={{
                    top:80
                }}>
                    <Text style={{
                        color: theme.primary,
                        bottom: 20,
                        ...container
                    }}>
                        Au:
                    </Text>
                    <View style={{
                        paddingHorizontal: 15,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Button theme={theme} onPress={showDatepickerEnd} touchableStyle={{ flex: 1,marginRight: 10 }}>Date de fin</Button>
                            <Button theme={theme} onPress={showTimepickerEnd} touchableStyle={{
                                flex: 1
                            }}>Heure de fin</Button>
                        </View>
                        <View style={{
                            top:20,
                            paddingVertical:10,
                            backgroundColor: theme.bgContrast
                        }}>
                            <Text style={{
                                color: theme.reverse.bg
                            }}>
                                {(dateEnd.getDate() < 10 ? "0"+dateEnd.getDate() : dateEnd.getDate())+'/'+ (dateEnd.getMonth() < 10 ? "0"+dateEnd.getMonth() : dateEnd.getMonth())+'/'+dateEnd.getFullYear() + " à "+ (dateEnd.getHours() > 10 ? dateEnd.getHours(): '0'+dateEnd.getHours())+":"+(dateEnd.getMinutes()> 10 ? dateEnd.getMinutes(): '0'+dateEnd.getMinutes())}
                            </Text>
                        </View>
                        {showEnd && (
                            <DateTimePicker
                                value={dateEnd}
                                mode={modeEnd}
                                is24Hour={true}
                                minimumDate={dateStart}
                                display="default"
                                onChange={onChangeEnd}
                            />
                        )}
                    </View>
                </View>

            </View>

            {/*Step 4 */}


            <View style={{
                top: 50,
                display: step === 4 ? "flex" : "none",
                paddingVertical: 50
            }}>
                <Text style={{
                    color: theme.primary,
                    bottom: 20,
                    ...container
                }}>
                    Choisissez votre équipement:
                </Text>
                <View style={{
                    paddingHorizontal: 15,
                }}>
                    <Picker selectedValue={actualEquipement}  onValueChange={onChooseEquipement} mode="dropdown" style={{
                        backgroundColor: theme.bgContrast
                    }} dropdownIconColor={theme.primary}>
                        <Picker.Item label={"Equipement E1"} value="E1" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                        <Picker.Item label={"Equipement E2"} value="E2" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                        <Picker.Item label={"Equipement E3"} value="E3" style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,

                        }}/>
                    </Picker>
                </View>
                <ScrollView contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    paddingVertical: 10
                }} style={{
                    maxHeight: 270,
                    ...container
                }}>
                    {equipements.map((item,index)=>{
                        return(
                            <EquipementItem key={index} item={item} theme={theme} equipement={equipements} setEquipement={setEquipements}/>
                        )
                    })}
                </ScrollView>

            </View>

            {/*Step 5 */}
            <View style={{
                top: 50,
                display: step === 5 ? "flex" : "none",
                paddingVertical: 50
            }}>
                <Text style={{
                    color: theme.primary,
                    bottom: 20,
                    ...container
                }}>
                    Confirmez votre réservation:
                </Text>

                <View style={{
                    ...container,
                    backgroundColor: theme.bgContrast,

                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <AntDesign name="arrowright" size={20} color={theme.primary} />
                        <Text style={{
                            color:theme.reverse.bg,
                            marginLeft:5
                        }}>
                            Batiment: {building}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <AntDesign name="arrowright" size={20} color={theme.primary} />
                        <Text style={{
                            color:theme.reverse.bg,
                            marginLeft:5
                        }}>
                            Salle: {room}
                        </Text>
                    </View>
                </View>


            </View>

            <Navigation theme={theme} step={step} prevStep={prevStep} nextStep={nextStep} submit={reserver}/>
        </View>
    )
}


export default Rooms;