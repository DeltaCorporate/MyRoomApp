import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import Header from "./Header";
import Tabs from "../navigation/Tabs";
import {SafeAreaView} from "react-native-safe-area-context";
import {useContext} from "react";
import {ThemeContext} from "../context/Theme";


export const Wrapper =()=>{
    const theme = useContext(ThemeContext);
    return(
        <SafeAreaView style={{
            width: "100%",
            height: "100%",
            backgroundColor: theme.theme.bg
        }}>
            <StatusBar hidden={true}/>
            <NavigationContainer>
                <Header/>
                <Tabs/>
            </NavigationContainer>
        </SafeAreaView>
    )
}