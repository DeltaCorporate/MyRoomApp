import React from "react";
import {ThemeProvider} from "./context/Theme";
import {Wrapper} from "./components/Wrapper";

export default function App() {
    return (
        <ThemeProvider>
            <Wrapper/>
        </ThemeProvider>
    );
}

