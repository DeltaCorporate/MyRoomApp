import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {ThemeContext} from "../context/Theme";
import {container} from "../assets/styles/theme";
import axios from "axios";
import Step from "../components/Step";
import SeparatorStep from "../components/SeparatorStep";
import Navigation from "../components/Navigation";
import {Picker} from "@react-native-picker/picker";
import Loading from "./Loading";
import {GlobalsContext} from "../context/Globals";

const Reservation = () => {
    const {theme} = useContext(ThemeContext);
    const {globals} = useContext(GlobalsContext)
    const [buildings, setBuildings] = useState(null);
    const [building, setBuilding] = useState(-1);
    const [loaded, setLoaded] = useState(false);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(-1);
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState(0);
    const [configuration, setConfiguration] = useState([]);
    const [equipement, setEquipement] = useState([]);


    const [step, setStep] = useState(1);

    function nextStep() {
        if (step === 5) return;
        setStep(step + 1);
    }

    function prevStep() {
        if (step === 1) return;
        setStep(step - 1);
    }


    function chooseBuilding(building) {
        setBuilding(building)
    }

    function chooseCategory(category) {
        setCategory(category);

        if (category === -1) {
            setRooms([]);
            return;
        }
        setStep(step + 1);
        setLoaded(false);
        setTimeout(() => {
            fetchRoom(category)
            setLoaded(true);
        }, 3e3)
    }

    function chooseRoom(room) {
        setRoom(room);
        if (room === -1) {
            setConfiguration([]);
            return;
        }
        setStep(step + 1);
        setLoaded(false);
        setTimeout(() => {
            fetchConfiguration(room);
            setLoaded(true)
        }, 3e3);
    }

    function fetchCategories() {
        let configCategory = {
            method: 'get',
            url: `${globals.api_url}/items/category`,
            headers: {}
        };

        axios(configCategory)
            .then((response) => {
                setCategories(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function fetchConfiguration(room) {
        let configurationConfig = {
            method: "get",
            url: `${globals.api_url}/items/configuration?filter[room]=${room}`,
            headers: {},
        };
        axios(configurationConfig).then((response) => {
            setConfiguration(response.data.data);
            fetchEquipement(response.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    function fetchRoom(category) {
        let config = {
            method: "get",
            url: `${globals.api_url}/items/room?filter[building]=${building}&filter[category]=${category}`,
            headers: {}
        }
        axios(config).then((response) => {
            let data = response.data.data;
            if (data.length <= 0) {
                Alert.alert('', "Aucune salle de dispo dans ce batiment", [

                    {
                        text: 'Changer de batiment', onPress: () => {
                            setStep(1)
                        }
                    },
                    {
                        text: 'Changer de catégorie', onPress: () => {
                            setCategory(-1);
                            setRooms([])
                        }
                    },
                ], {cancelable: false});
            } else {
                setRooms(data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

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


    function fetchEquipement(configuration) {
        configuration.forEach((config) => {
            let conf = {
                method: "get",
                url: `${globals.api_url}/items/equipement/${config.id}`,
                headers: {}
            }
            axios(conf).then((res) => {
                console.log(res.data.data);
                let equip = res.data.data;
                equip.total = config.total;
                console.log(equip)
                let equipementList = [...equipement, equip];
                setEquipement(equipementList);
            }).catch((err) => {
                console.log(err)
            })
        })

    }

    useEffect(() => {
        fetchBuildings();
        fetchCategories();

        setTimeout(() => {
            setLoaded(true)
        }, 3e3);
    }, [])


    if (loaded)
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.bg,
                }}
            >
                {/*STEPS*/}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        ...container,
                        top: 40,
                    }}
                >
                    <Step theme={theme} step={step} value={1}/>
                    <SeparatorStep theme={theme} step={step} value={1}/>
                    <Step theme={theme} step={step} value={2}/>
                    <SeparatorStep theme={theme} step={step} value={2}/>
                    <Step theme={theme} step={step} value={3}/>
                    <SeparatorStep theme={theme} step={step} value={3}/>
                    <Step theme={theme} step={step} value={4}/>
                    <SeparatorStep theme={theme} step={step} value={4}/>
                    <Step theme={theme} step={step} value={5}/>
                </View>

                {/*STEP 1: BUILDING*/}
                <View
                    style={{
                        top: 50,
                        display: step === 1 ? "flex" : "none",
                        paddingVertical: 50,
                    }}
                >
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
                {/*STEP 2: Category*/}
                <View
                    style={{
                        top: 50,
                        display: step === 2 ? "flex" : "none",
                        paddingVertical: 50,
                    }}
                >
                    <Text
                        style={{
                            color: theme.primary,
                            bottom: 20,
                            ...container,
                        }}
                    >
                        Choisissez la catégorie de salle:
                    </Text>
                    <View
                        style={{
                            paddingHorizontal: 15,
                        }}
                    >
                        <Picker
                            selectedValue={category}
                            onValueChange={chooseCategory}
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
                            {categories.map((category, index) => {
                                return (
                                    <Picker.Item
                                        key={index}
                                        label={category.name}
                                        value={category.id}
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
                {/*STEP 3: Rooms*/}
                <View
                    style={{
                        top: 50,
                        display: step === 3 ? "flex" : "none",
                        paddingVertical: 50,
                    }}
                >
                    <Text
                        style={{
                            color: theme.primary,
                            bottom: 20,
                            ...container,
                        }}
                    >
                        Choisissez la salle:
                    </Text>
                    <View
                        style={{
                            paddingHorizontal: 15,
                        }}
                    >
                        <Picker
                            selectedValue={room}
                            onValueChange={chooseRoom}
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
                            {rooms.map((room, index) => {
                                return (
                                    <Picker.Item
                                        key={index}
                                        label={room.name}
                                        value={room.id}
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
                {/* Details of equipement of the room */}
                <View
                    style={{
                        top: 50,
                        display: step === 4 ? "flex" : "none",
                        paddingVertical: 50,
                    }}
                >
                    <Text
                        style={{
                            color: theme.primary,
                            bottom: 20,
                            ...container,
                        }}
                    >
                        Equipement de cette salle:
                    </Text>
                    <View
                        style={{
                            paddingHorizontal: 15,
                        }}
                    >
                        <ScrollView style={{
                            height: 300
                        }}>
                            {equipement.map((equipement, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text style={{color: theme.primary,marginRight:10}}>
                                            {equipement.name}
                                        </Text>
                                        <Text style={{color: theme.primary}}>
                                            {equipement.total}
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>

                <Navigation
                    theme={theme}
                    step={step}
                    prevStep={prevStep}
                    nextStep={nextStep}
                />
            </View>
        );
    return <Loading/>
};

export default Reservation;