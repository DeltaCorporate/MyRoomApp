import React, {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {ThemeContext} from "../../context/Theme";
import {container} from "../../assets/styles/theme";
import axios from "axios";
import {GlobalsContext} from "../../context/Globals";
import Loading from "../Loading";
import {ReservationContext} from "../../context/Reservation";
import TabBar from "../../components/TabBar";


export default function Building({navigation}) {
    const [buildings, setBuildings] = useState(null)
    const {theme} = useContext(ThemeContext);
    const {globals} = useContext(GlobalsContext)

    const {building,setBuilding} = useContext(ReservationContext);

    function fetchBuildings() {
        let configBuildings = {
            method: 'get',
            url: `${globals.api_url}/items/building`,
            headers: {}
        };

        axios(configBuildings)
            .then((response) => {
                setBuildings(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function chooseBuilding(building){
        setBuilding(building);
    }

    useEffect(() => {
        fetchBuildings();
    }, [])


    if (!buildings) return <Loading/>
    return (
        <View
            style={{
                top: 50,
                paddingVertical: 50,
                flex:1
            }}
        >
            <TabBar navigation={navigation}/>
            <Text
                style={{
                    color: theme.primary,
                    bottom: 20,
                    ...container,
                }}
            >
                Choisissez le bâtiment:
            </Text>
            <View
                style={{
                    paddingHorizontal: 15,
                }}
            >
                <Picker
                    selectedValue={building}
                    onValueChange={chooseBuilding}
                    mode="dropdown"
                    style={{
                        backgroundColor: theme.bgContrast,
                    }}
                    dropdownIconColor={theme.primary}
                >
                    <Picker.Item
                        key={-1}
                        label={""}
                        value={-1}
                        style={{
                            color: theme.primary,
                            backgroundColor: theme.bgContrast,
                        }}
                    />
                    {buildings.map((building, index) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={building.name}
                                value={building.id}
                                style={{
                                    color: theme.primary,
                                    backgroundColor: theme.bgContrast,
                                }}
                            />
                        );
                    })}
                </Picker>
            </View>
        </View>
    )
}