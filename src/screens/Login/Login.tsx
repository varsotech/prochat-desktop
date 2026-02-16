import React, {useEffect} from 'react';
import {useTheme} from "../../components/Theme/Theme";
import {useLocation} from "wouter";
import LoginProviderStep from "./Steps/LoginProviderStep";
import {useOAuth} from '../../components/OAuth/OAuth';

function Login() {
    const [t] = useTheme();
    const [, navigate] = useLocation();
    const {setState: setOAuthState, setHomeserverAddress, isLoggedIn} = useOAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
            return;
        }
    }, [isLoggedIn]);

    function openInApp(serverAddress: string) {
        setHomeserverAddress(serverAddress);

        // Create and store OAuth state parameter
        const state = new Uint8Array(16);
        crypto.getRandomValues(state);
        const stateHex = Array.from(state, b => b.toString(16).padStart(2, '0')).join('');
        setOAuthState(stateHex);

        // Open OAuth URL in default browser
        const url = new URL("/api/v1/oauth/authorize?response_type=code&client_id=https%3A%2F%2Fwww.varso.org%2F.well-known%2Fclient-metadata.json&state=" + encodeURIComponent(stateHex), serverAddress);

        if (window.electronAPI != null) {
            window.electronAPI.openURL(url.toString());
        } else {
            window.open(url.toString(), '_blank').focus();
        }

        // Redirect to Login Waiting
        navigate("/loginWaiting");
    }

    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.s }}>
                <LoginProviderStep
                    onSelection={openInApp}
                />
            </div>
        </div>
    );
}

export default Login;