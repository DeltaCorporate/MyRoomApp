import React from "react";
import {ThemeProvider} from "./context/Theme";
import {Wrapper} from "./components/Wrapper";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native";
import {GlobalProvider} from "./context/Globals";

export default function App() {


    return (

        <SafeAreaView style={{
            flex:1,
        }}>
            <ThemeProvider>
                <GlobalProvider>
                    <Wrapper/>
                </GlobalProvider>
            </ThemeProvider>
        </SafeAreaView>
    );
}

