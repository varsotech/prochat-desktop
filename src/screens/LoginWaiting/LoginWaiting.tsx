import React, {ReactElement, useEffect, useState} from 'react';
import {useTheme} from "../../components/Theme/Theme";
import TextInput from "../../components/Inputs/TextInput";
import {useElectronEnv} from "../../components/ElectronEnv/ElectronEnv";

function LoginWaiting(): ReactElement {
    const [t] = useTheme();
    const [oauthLink, setOauthLink] = useState<string>("");
    const [electronEnv] = useElectronEnv();

    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.l, alignItems: "center" }}>
                An authorization page should've popped up in your browser.
                {electronEnv.isDev ? <TextInput label="OAuth Link" value={oauthLink} setValue={setOauthLink} /> : null}
            </div>
        </div>
    );
}

export default LoginWaiting;