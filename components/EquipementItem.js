import React, {useState} from 'react';
import {View,Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";




function EquipementItem({item,theme,equipement,setEquipement}) {

    function del(){
        equipement.splice(equipement.indexOf(item),1);
        setEquipement([...equipement]);
    }
    return(
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:"red",
            borderRadius:5,
            marginBottom:5,

        }}>
            <Text style={{
                color:theme.bg,
                textAlign:'center',
                paddingVertical:5,
                paddingHorizontal:10,
                borderTopLeftRadius:5,
                borderBottomLeftRadius:5,
                backgroundColor:theme.primary,
            }}>{item}</Text>
            <AntDesign style={{
                paddingHorizontal:10
            }} name="delete" size={20} color={theme.bg} onPress={()=>del(item)}/>
        </View>
    );
}


export default EquipementItem;