import React from "react";
import {View} from "react-native";



function SeparatorStep({theme, step,value}) {
    return (
        <View style={{
            backgroundColor: theme.primary,
            height: 2,
            minWidth: 45,
            borderRadius: 1,
            opacity: step > value ? 1 : 0.5
        }}>
        </View>
    );
}


export default SeparatorStep