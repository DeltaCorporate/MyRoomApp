import React, {useState, createContext} from "react";


export const ReservationContext = createContext();


export const ReservationProvider = ({children})=>{
    const [building,setBuilding] = useState(-1)
    const [category,setCategory] = useState(-1)
    const [room,setRoom] = useState(-1)
    const [startTime,setStartTime] = useState(null)
    const [endTime,setEndTime] = useState(null)
    return(
        <ReservationContext.Provider value={{
            building,setBuilding,category,setCategory,room,setRoom,startTime,endTime,setStartTime,setEndTime
        }}>
            {children}
        </ReservationContext.Provider>
    );
}