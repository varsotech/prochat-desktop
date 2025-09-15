import React from 'react';
import WindowTitleBar from "./components/WindowTitleBar/WindowTitleBar";
import Home from "./screens/Home";
import {ThemeProvider, useTheme} from "./components/Theme/Theme";
import {lightTheme} from "./components/Theme/light";
import {darkTheme} from "./components/Theme/dark";

function App() {
    return (
        <ThemeProvider lightTheme={"light"} darkTheme={"dark"} themes={{
            "light": lightTheme,
            "dark": darkTheme,
        }}>
            <Root />
        </ThemeProvider>
    )
}

function Root() {
    const [t] = useTheme();

    return (
        <div style={{ display: "flex", height: "100vh", color: t.colors.text.default, fontSize: t.font.m }}>
            <WindowTitleBar />
            <Home />
        </div>
    )
}

export default App;