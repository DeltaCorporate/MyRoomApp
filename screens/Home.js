import React,{useContext} from "react";

import { Text, View } from "react-native";
import { ThemeContext } from "../context/globalStyles";


const Home = ()=>{
    const colors = useContext(ThemeContext)
 return(
     <View style={{
         flex:1,
        backgroundColor: colors.theme.bg
     }}>
         <Text>Home</Text>
     </View>
 );
}


export default Home;