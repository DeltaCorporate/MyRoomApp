import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {container} from "../assets/styles/theme";
function Navigation({theme,step,prevStep,nextStep,submit}){
    return(
        <View style={{
            top:80,
            ...container,

            flexDirection: "row",
        }}>
            <TouchableOpacity onPress={prevStep} style={{
                backgroundColor:theme.primary,
                paddingHorizontal: 5,
                paddingVertical:8,
                borderRadius:4,
                flex: step >=2 ? 1 : 0.5,
                display: step >=2 ? "flex" : 'none',
                marginRight:10
            }}>
                <Text style={{
                    color: theme.bg,

                    textAlign: "center"
                }}>
                    Précédant
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={nextStep} style={{
                backgroundColor:theme.primary,
                paddingHorizontal: 5,
                paddingVertical:8,
                borderRadius:4,
                flex: step < 5 ? 1 : 0.5,
                display: step < 5 ? "flex" : 'none'
            }}>
                <Text style={{
                    color: theme.bg,

                    textAlign: "center"
                }}>
                    Suivant
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submit} style={{
                backgroundColor:theme.primary,
                paddingHorizontal: 5,
                paddingVertical:8,
                borderRadius:4,
                flex: 1,
                display: step === 5 ? "flex" : 'none'
            }}>
                <Text style={{
                    color: theme.bg,

                    textAlign: "center"
                }}>
                    Réserver
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default Navigation