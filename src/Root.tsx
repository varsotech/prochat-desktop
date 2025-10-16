import React, {useEffect, useRef} from 'react';
import {ThemeProvider, useTheme} from "./components/Theme/Theme";
import {lightTheme} from "./components/Theme/light";
import {darkTheme} from "./components/Theme/dark";
import {Route, Router, Switch, useLocation} from "wouter";
import {HomeserverProvider} from "./components/Network/HomeserverProvider";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import OAuth from "./screens/OAuth/OAuth";
import WindowTitleBar from "./components/WindowTitleBar/WindowTitleBar";
import {OAuthProvider} from "./components/OAuth/OAuth";

function Root() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <HomeserverProvider>
                <OAuthProvider>
                    <ThemeProvider lightTheme={"light"} darkTheme={"dark"} themes={{
                        "light": lightTheme,
                        "dark": darkTheme,
                    }}>
                        <WindowTitleBar />
                        <Router>
                            <App />
                        </Router>
                    </ThemeProvider>
                </OAuthProvider>
            </HomeserverProvider>
        </div>
    );
}

function App() {
    const [t] = useTheme();
    const [, navigate] = useLocation();
    const didSubscribeToDeepLinks = useRef(false);

    useEffect(() => {
        if (didSubscribeToDeepLinks.current) { return; }
        didSubscribeToDeepLinks.current = true;

        window.electronAPI.onDeepLink((event: IpcRendererEvent, message: string) => {
            console.log("Got deep link");
            const splitMessage = message.split("://", 2);
            if (splitMessage.length != 2) {
                console.error("unexpected deep link", message);
                return;
            }

            let key = splitMessage[1];
            let params = "";

            const splitKey = key.split("?", 2);
            if (splitKey.length > 1) {
                key = splitKey[0];
                params = splitKey[1];
            }

            switch (key) {
                case "oauth": {
                    navigate(`/oauth/${params}`);
                    break;
                }
            }
        });
    }, []);

    return (
        <div style={{ display: "flex", flex: 1, color: t.colors.text.default }}>
            <Switch>
                <Route path={"/login"}>
                    <Login />
                </Route>
                <Route path={`/oauth/:urlParams`}>
                    {(params: {urlParams: string}) => {
                        return <OAuth params={params.urlParams} />;
                    }}
                </Route>
                <Route path={"/*"}>
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default Root;