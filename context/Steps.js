import React,{createContext,useState} from "react";




export const StepsContext = createContext();



export const StepsProvider = ({children})=>{
    const [step,setStep] =useState(-1);

    function nextStep(){
        setStep(step+1);
    }

    function prevStep(){
        setStep(step-1)
    }

    return(
        <StepsContext.Provider value={{step,nextStep,prevStep,setStep}}>
            {children}
        </StepsContext.Provider>
    );
}