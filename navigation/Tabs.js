import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Home from '../screens/Home';
import Login from '../screens/Login';
const {Navigator,Screen} = createBottomTabNavigator();
import { ThemeContext } from '../context/globalStyles';
const Tabs = ()=>{
    
const colors = useContext(ThemeContext)
    return(
        <Navigator initialRouteName='Home' screenOptions={({route})=>({
            tabBarShowLabel:false,
            headerShown: false,
            tabBarStyle:{
                position:'absolute',
                bottom:20,
                right:20,
                left:20,
                elevation:0,
                height:70,
                borderRadius:35,
                backgroundColor:colors.theme.bgContrast
            }
        })} >
            <Screen name="Home" component={Home} options={{
                tabBarIcon:({focused})=>{
                    return <AntDesign name="home" size={24} color={colors.theme.primary} style={{
                        opacity: focused ? 1 : 0.3
                    }}/>;
                }
            }} />
            <Screen name="Login" component={Login}  options={{
                tabBarIcon:({focused})=>{
                    return <AntDesign name="user" size={24} color={colors.theme.primary} style={{
                        opacity: focused ? 1 : 0.3
                    }}/>;
                }
            }} />
        </Navigator>
    );
}

export default Tabs;