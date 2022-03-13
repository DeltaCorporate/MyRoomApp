import React,{} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Building from "../screens/ReservationSteps/Building";

const {Navigator,Screen} = createBottomTabNavigator();


export default function ReservationNavigation(){
    return(
        <Navigator>
            <Screen name={"Choix du building"} component={Building}/>
        </Navigator>
    )
}