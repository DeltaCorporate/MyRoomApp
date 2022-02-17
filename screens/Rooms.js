import React, {useState, useEffect, useContext} from "react";
import {View, TouchableOpacity, Text} from "react-native";
import {ThemeContext} from "../context/Theme";
import {Picker} from "@react-native-picker/picker";


const Rooms = () => {
    const [buildings, SetBuildings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [step, setStep] = useState(1);
    const [building, setBuilding] = useState("A");
    const [room, setRoom] = useState('');


    function chooseBuilding(building) {
        setBuilding(building);
    }

    function onNextStep() {
        if(step ===4) return;
        setStep(step + 1);
    }

    function onPrevPage() {
        if(step ===1) return;
        setStep(step - 1);
    }

    useEffect(() => {
    }, [])
const container = {
    paddingHorizontal: 20,
}

    const {theme} = useContext(ThemeContext);
    return (
        <View style={{
            backgroundColor: theme.bg,
            flex: 1,

        }}>


            <View style={{
                top: 100,
                backgroundColor: theme.bgContrast,
                paddingVertical: 15,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                ...container
            }}>
                <Text style={{
                    fontSize: 13,
                    color: theme.primary
                }}>Etape {step}/4</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: theme.primary,
                        padding: 10,
                        borderRadius: 3,
                        marginRight: 10
                    }} onPress={onPrevPage}>
                        <Text style={{
                            color: theme.bg
                        }}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: theme.primary,
                        padding: 10,
                        borderRadius: 3
                    }} onPress={onNextStep}>
                        <Text style={{
                            color: theme.bg
                        }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default Rooms;