import React, {useState, createContext} from "react";


export const ReservationContext = createContext();


export const ReservationProvider = ({children})=>{
    const [building,setBuilding] = useState(-1)
    const [category,setCategory] = useState(-1)
    return(
        <ReservationContext.Provider value={{
            building,setBuilding,category,setCategory
        }}>
            {children}
        </ReservationContext.Provider>
    );
}