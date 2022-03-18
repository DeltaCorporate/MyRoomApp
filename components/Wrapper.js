import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import Header from "./Header";
import Tabs from "../navigation/Tabs";
import {SafeAreaView} from "react-native-safe-area-context";
import {useContext} from "react";
import {ThemeContext} from "../context/Theme";
import {View} from "react-native";
import TabBar from "./TabBar";


export const Wrapper =()=>{
    const {theme} = useContext(ThemeContext);
    return(
        <SafeAreaView style={{
            flex:1,
            backgroundColor: theme.bg,
            paddingTop:15
        }}>
            <StatusBar style={theme.statusBar}  hidden={false}/>
            <View style={{
                flex:1
            }}>

                <NavigationContainer>
                    <Header/>
                    <Tabs/>
                </NavigationContainer>
            </View>
        </SafeAreaView>
    )
}