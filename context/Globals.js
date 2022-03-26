import React, {useState, useContext, createContext} from "react";



export const GlobalsContext = createContext();

export const GlobalProvider = ({children})=>{

    const [globals,setGlobals] = useState({
        'api_url':'http://192.168.43.253:8055',
        'api_token':''
    })
    return(
        <GlobalsContext.Provider value={{globals}}>
            {children}
        </GlobalsContext.Provider>
    )
}