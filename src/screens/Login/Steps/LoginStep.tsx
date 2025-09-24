import React, {CSSProperties, ReactElement, useEffect, useState} from "react";
import {useTheme} from "@components/Theme/Theme";
import TextInput from "@components/Inputs/TextInput";
import Button from "@components/Inputs/Button";
import ColorThief from "colorthief";

type LoginStepProps = {
    serverAddress: string;
    setServerAddress: (address: string) => void;
    login: string;
    setLogin: (address: string) => void;
    password: string;
    setPassword: (address: string) => void;
    serverIconUrl: string;
}

function LoginStep({serverAddress, setServerAddress, login, setLogin, password, setPassword, serverIconUrl}: LoginStepProps): ReactElement {
    const [t] = useTheme();
    const [color, setColor] = useState("");

    useEffect(() => {
        console.log(serverIconUrl);
        const image = new Image();
        image.src = serverIconUrl;
        image.crossOrigin = 'Anonymous';

        image.onload = function () {
            const colorThief = new ColorThief();
            const [r, g, b] = colorThief.getColor(image);
            const c = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
            setColor(c);
        }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={styles.h1}>Prochat</h1>
            <div style={{ textAlign: "center", fontSize: t.font.m, color: t.colors.text.subtitle }}>Login</div>
            <TextInput label="Server address" value={serverAddress} setValue={setServerAddress} />
            <TextInput label="Username or email" value={login} setValue={setLogin} />
            <TextInput label="Password" type="password" value={password} setValue={setPassword} />
            <Button label={"Log in"} onClick={() => {}} />
        </div>
    )
}

export default LoginStep;

const styles: { [key: string]: CSSProperties } = {
    h1: {
        textAlign: "center",
        marginBottom: 0
    }
}