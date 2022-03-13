import React, {useContext, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign, Entypo} from '@expo/vector-icons';
import Home from '../screens/Home';
import Login from '../screens/Login';
const {Navigator,Screen} = createBottomTabNavigator();
import { ThemeContext } from '../context/Theme';
import Reservation from "../screens/Reservation";
import TabBar from "../components/TabBar";
const Tabs = ()=>{
    const colors = useContext(ThemeContext)
    return(
        <Navigator initialRouteName='Home' screenOptions={()=>({
            tabBarShowLabel:false,
            headerShown: false,
            tabBarStyle:{

                display: "none"
            }
        })} >

            <Screen name="Home" component={Home} options={{
                tabBarIcon:({focused})=>{
                    return <AntDesign name="home" size={24} color={colors.theme.primary} style={{
                        opacity: focused ? 1 : 0.3
                    }}/>;
                }
            }} />

            <Screen name="Reservation" component={Reservation} options={{
                tabBarIcon:({focused})=>{
                    return <Entypo name="list" size={24} color={colors.theme.primary} style={{
                        opacity: focused ? 1 : 0.3
                    }}/>;
                }
            }} />
            <Screen name="Login" component={Login}  options={{
                tabBarIconStyle:{
                    display:'none'
                }
            }} />
        </Navigator>
    );
}

export default Tabs;