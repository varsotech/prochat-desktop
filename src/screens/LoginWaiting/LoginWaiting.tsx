import React, {ReactElement, useEffect, useState} from 'react';
import {useTheme} from "../../components/Theme/Theme";
import TextInput from "../../components/Inputs/TextInput";
import {useElectronEnv} from "../../components/ElectronEnv/ElectronEnv";
import Button from "../../components/Inputs/Button";
import {useLocation} from "wouter";
import {useOAuth} from "../../components/OAuth/OAuth";

function LoginWaiting(): ReactElement {
    const [t] = useTheme();
    const [oauthLink, setOauthLink] = useState<string>("");
    const [electronEnv] = useElectronEnv();
    const [, navigate] = useLocation();
    const {handleOauthLink} = useOAuth();

    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.l, alignItems: "center" }}>
                An authorization page should've popped up in your browser.
                <Button label={"Back"} onClick={() => navigate("/login")} />
                {electronEnv.isDev ?
                    <div>
                        <TextInput label="OAuth Link" value={oauthLink} setValue={setOauthLink} />
                        <Button label={"Submit"} onClick={() => handleOauthLink(oauthLink)} />
                    </div> : null}
            </div>
        </div>
    );
}

export default LoginWaiting;