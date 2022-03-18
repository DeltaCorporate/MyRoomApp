import React, {useContext} from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Building from "../screens/ReservationSteps/Building";
import Category from "../screens/ReservationSteps/Category";
import Room from "../screens/ReservationSteps/Room";
import {StepsProvider} from "../context/Steps";
import {ReservationProvider} from "../context/Reservation";
import {ThemeContext} from "../context/Theme";
import Configuration from "../screens/ReservationSteps/Configuration";




export default function ReservationNavigation() {
    const {Navigator, Screen} = createBottomTabNavigator();
    const {theme} = useContext(ThemeContext);
    return (
        <StepsProvider>
            <ReservationProvider>

                    <Navigator initialRouteName='Building' screenOptions={() => ({
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarStyle: {

                            display: "none"
                        }
                    })}>
                        <Screen name="Building" component={Building}/>
                        <Screen name="Category" component={Category}/>
                        <Screen name="Room" component={Room}/>
                        <Screen name="Configuration" component={Configuration}/>
                    </Navigator>
            </ReservationProvider>
        </StepsProvider>
    );
}