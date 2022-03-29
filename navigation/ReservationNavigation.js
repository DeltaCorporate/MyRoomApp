import React, {useContext} from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Building from "../screens/ReservationSteps/Building";
import Category from "../screens/ReservationSteps/Category";
import Room from "../screens/ReservationSteps/Room";
import {StepsProvider} from "../context/Steps";
import {ReservationProvider} from "../context/Reservation";
import Configuration from "../screens/ReservationSteps/Configuration";
import ValidReservation from "../screens/ReservationSteps/ValidReservation";
import Interval from "../screens/ReservationSteps/Interval";




export default function ReservationNavigation() {
    const {Navigator, Screen} = createBottomTabNavigator();
    return (
        <StepsProvider>
            <ReservationProvider>

                    <Navigator initialRouteName='Interval' screenOptions={() => ({
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarStyle: {

                            display: "none"
                        }
                    })}>
                        <Screen name="Interval" component={Interval}/>
                        <Screen name="Building" component={Building}/>
                        <Screen name="Category" component={Category}/>
                        <Screen name="Room" component={Room}/>
                        <Screen name="Configuration" component={Configuration}/>
                        <Screen name="ValidReservation" component={ValidReservation}/>
                    </Navigator>
            </ReservationProvider>
        </StepsProvider>
    );
}