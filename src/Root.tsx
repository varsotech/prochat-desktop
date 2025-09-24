import React from 'react';
import {ThemeProvider, useTheme} from "./components/Theme/Theme";
import {lightTheme} from "./components/Theme/light";
import {darkTheme} from "./components/Theme/dark";
import {Route, Router, Switch} from "wouter";
import {HomeserverProvider} from "./components/Network/HomeserverProvider";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import WindowTitleBar from "./components/WindowTitleBar/WindowTitleBar";

function Root() {
    return (
        <HomeserverProvider>
            <ThemeProvider lightTheme={"light"} darkTheme={"dark"} themes={{
                "light": lightTheme,
                "dark": darkTheme,
            }}>
                <App />
            </ThemeProvider>
        </HomeserverProvider>
    )
}

function App() {
    const [t] = useTheme();

    return (
        <div style={{ display: "flex", height: "100vh", color: t.colors.text.default }}>
            <WindowTitleBar />
            <Router>
                <Switch>
                    <Route path={"/login"}>
                        <Login />
                    </Route>
                    <Route path={"/*"}>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Root;