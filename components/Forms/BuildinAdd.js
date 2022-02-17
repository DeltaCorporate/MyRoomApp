import {Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";


const buildingAdd = ()=>{
    return (
        <View style={{
            top: 50,
            display: step === 1 ? "flex" : "none",
            paddingVertical:50
        }}>
            <Text style={{
                color: theme.primary,
                bottom: 20,
                ...container
            }}>
                Choisissez le bâtiment:
            </Text>
            <View style={{
                paddingHorizontal: 15,
            }}>
                <Picker selectedValue={building} onValueChange={chooseBuilding} mode="dropdown" style={{
                    backgroundColor: theme.bgContrast
                }} dropdownIconColor={theme.primary}>
                    <Picker.Item label={"Batiment A"} value="A" style={{
                        color: theme.primary,
                        backgroundColor: theme.bgContrast,

                    }}/>
                    <Picker.Item label={"Batiment B"} value="B" style={{
                        color: theme.primary,
                        backgroundColor: theme.bgContrast,

                    }}/>
                    <Picker.Item label={"Batiment C"} value="C" style={{
                        color: theme.primary,
                        backgroundColor: theme.bgContrast,

                    }}/>
                </Picker>
            </View>

        </View>
    )
}


export default buildingAdd;