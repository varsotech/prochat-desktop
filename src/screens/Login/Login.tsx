import React, {useEffect, useState} from 'react';
import {useTheme} from "../../components/Theme/Theme";
import {useLocation} from "wouter";
import LoginProviderStep from "./Steps/LoginProviderStep";
import LoginStep from "./Steps/LoginStep";
import LoginOrRegisterStep from "./Steps/LoginOrRegisterStep";
import RegisterStep from "./Steps/RegisterStep";

function Login() {
    const [t] = useTheme();
    const [, navigate] = useLocation();
    const [step, setStep] = useState(1);
    const [serverAddress, setServerAddress] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [serverIconUrl, setServerIconUrl] = useState<string>("");

    useEffect(() => {
        const serverAddress = localStorage.getItem("ServerAddress");
        if (serverAddress != null) {
            navigate("/");
        }
    }, []);

    var x = 1;

    const doLogin = (serverAddress: string) => {
        // Attempt anonymous login

        localStorage.setItem("ServerAddress", serverAddress);
        navigate("/");
    }

    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.s }}>
                {step === 1 && <LoginOrRegisterStep
                    goToLoginStep={() => setStep(10)}
                    goToRegisterStep={() => setStep(20)}
                />}

                {/* Login flow */}
                {step === 10 && <LoginProviderStep
                    serverAddress={serverAddress}
                    setServerAddress={setServerAddress}
                    nextStep={() => setStep(11)}
                    serverIconUrl={serverIconUrl}
                    setServerIconUrl={setServerIconUrl}
                />}
                {step === 11 && <LoginStep
                    serverAddress={serverAddress}
                    setServerAddress={setServerAddress}
                    login={login}
                    setLogin={setLogin}
                    password={password}
                    setPassword={setPassword}
                    serverIconUrl={serverIconUrl}
                />}

                {/* Register flow */}
                {step === 20 && <LoginProviderStep
                    serverAddress={serverAddress}
                    setServerAddress={setServerAddress}
                    nextStep={() => setStep(21)}
                    serverIconUrl={serverIconUrl}
                    setServerIconUrl={setServerIconUrl}
                />}
                {step === 21 && <RegisterStep
                    serverAddress={serverAddress}
                    setServerAddress={setServerAddress}
                    login={login}
                    setLogin={setLogin}
                    password={password}
                    setPassword={setPassword}
                    serverIconUrl={serverIconUrl}
                />}
            </div>
        </div>
    )
}

export default Login;