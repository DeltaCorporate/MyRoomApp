import React, {useContext} from "react";

import {Button, View} from "react-native";
import {ThemeContext} from "../context/Theme";
import {StepsContext, StepsProvider} from "../context/Steps";
import StepBars from "./ReservationSteps/StepBars";
import Building from "./ReservationSteps/Building";
import {ReservationProvider} from "../context/Reservation";


export default function Reservation({navigation}) {
    const {theme} = useContext(ThemeContext);
    return (
        <StepsProvider>
            <ReservationProvider>
                <View style={{
                    backgroundColor: theme.bg,
                    flex: 1,
                }}>
                    <StepBars/>
                    <Building navigation={navigation}/>

                </View>
            </ReservationProvider>
        </StepsProvider>
    );
}
