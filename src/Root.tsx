import React, {useEffect, useRef} from 'react';
import {ThemeProvider, useTheme} from "./components/Theme/Theme";
import {lightTheme} from "./components/Theme/light";
import {darkTheme} from "./components/Theme/dark";
import {Route, Router, Switch} from "wouter";
import {HomeserverProvider} from "./components/Network/HomeserverProvider";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import OAuth from "./screens/OAuth/OAuth";
import WindowTitleBar from "./components/WindowTitleBar/WindowTitleBar";
import {OAuthProvider, useOAuth} from "./components/OAuth/OAuth";
import LoginWaiting from "./screens/LoginWaiting/LoginWaiting";
import {ElectronEnvProvider} from "./components/ElectronEnv/ElectronEnv";
import {CommunityServerHttpProvider} from "./components/Network/CommunityServerHttpProvider";

function Root() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <ElectronEnvProvider>
                <OAuthProvider>
                    <HomeserverProvider>
                        <CommunityServerHttpProvider>
                            <ThemeProvider lightTheme={"light"} darkTheme={"dark"} themes={{
                                "light": lightTheme,
                                "dark": darkTheme,
                            }}>
                                <WindowTitleBar />
                                <Router>
                                    <App />
                                </Router>
                            </ThemeProvider>
                        </CommunityServerHttpProvider>
                    </HomeserverProvider>
                </OAuthProvider>
            </ElectronEnvProvider>
        </div>
    );
}

function App() {
    const [t] = useTheme();
    const didSubscribeToDeepLinks = useRef(false);
    const {handleOauthLink} = useOAuth();

    useEffect(() => {
        if (didSubscribeToDeepLinks.current) { return; }
        didSubscribeToDeepLinks.current = true;

        // Handle deep links (for OAuth)
        if (window.electronAPI != null) {
            window.electronAPI.onDeepLink((event: Electron.IpcRendererEvent, message: string) => {
                handleOauthLink(message);
            });
        }
    }, []);

    return (
        <div style={{ display: "flex", flex: 1, color: t.colors.text.default }}>
            <Switch>
                <Route path={"/login"}>
                    <Login />
                </Route>
                <Route path={"/loginWaiting"}>
                    <LoginWaiting />
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