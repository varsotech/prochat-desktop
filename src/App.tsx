import React from 'react';
import WindowTitleBar from "./components/WindowTitleBar/WindowTitleBar";
import Home from "./screens/Home";
import {ThemeProvider, useTheme} from "./components/Theme/Theme";
import {lightTheme} from "./components/Theme/light";
import {darkTheme} from "./components/Theme/dark";
import {Route, Router} from "wouter";

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
        <div style={{ display: "flex", height: "100vh", color: t.colors.text.default }}>
            <WindowTitleBar />
            <Router>
                <Route path={"/"}>
                    <Home />
                </Route>
            </Router>
        </div>
    )
}

export default App;