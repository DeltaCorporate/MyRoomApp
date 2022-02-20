import React   from "react";
import {Text, View} from "react-native";


function Step({theme, step,value}) {
    return (<View style={{
        backgroundColor: theme.primary,
        borderRadius: 10,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: step >= value ? 1 : 0.5,
    }}>
        <Text
            style={{
                fontSize: 12,
                color: theme.bg,
                fontWeight: 'bold',
            }}>{value}</Text>
    </View>)
}


export default Step