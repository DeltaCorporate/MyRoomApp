import React, {useContext} from "react";
import {View} from "react-native";
import Step from "../../components/Step";
import {ThemeContext} from "../../context/Theme";
import SeparatorStep from "../../components/SeparatorStep";
import {StepsContext} from "../../context/Steps";
import {container} from "../../assets/styles/theme";


export default function StepBars(){
    const {theme} = useContext(ThemeContext);
    const {step} = useContext(StepsContext)
    return(
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                ...container,
                top: 40,
            }}
        >
            <Step theme={theme} step={step} value={0}/>
            <SeparatorStep theme={theme} step={step} value={0}/>
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
    )
}