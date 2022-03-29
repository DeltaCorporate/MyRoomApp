import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign, Entypo} from '@expo/vector-icons';
import Home from '../screens/Home';
import Login from '../screens/Login';

const {Navigator, Screen} = createBottomTabNavigator();
import {ThemeContext} from '../context/Theme';
import Reservation from "../screens/Reservation";
import TabBar from "../components/TabBar";
import ReservationNavigation from "./ReservationNavigation";

const Tabs = () => {
    const colors = useContext(ThemeContext)
    return (
        <Navigator initialRouteName='Home' screenOptions={() => ({

            headerShown: false,
            tabBarStyle: {
                display: "none"
            }
        })}>
            <Screen name="Home" component={Home}/>
            <Screen name="Reservation" component={ReservationNavigation}/>
            <Screen name="Login" component={Login}/>
        </Navigator>
    );
}

export default Tabs;