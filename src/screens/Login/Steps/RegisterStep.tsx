import React, {CSSProperties, ReactElement} from "react";
import {useTheme} from "../../../components/Theme/Theme";
import TextInput from "../../../components/Inputs/TextInput";
import Button from "../../../components/Inputs/Button";
import css from "./RegisterStep.module.css"

type RegisterStepProps = {
    serverAddress: string;
    setServerAddress: (address: string) => void;
    login: string;
    setLogin: (address: string) => void;
    password: string;
    setPassword: (address: string) => void;
}

function RegisterStep({serverAddress, setServerAddress, login, setLogin, password, setPassword}: RegisterStepProps): ReactElement {
    const [t] = useTheme();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={styles.h1}>Prochat</h1>
            <TextInput label="Server address" value={serverAddress} setValue={setServerAddress} />
            <TextInput label="Display Name" value={login} setValue={setLogin} />
            <Button label={"Register"} onClick={() => {}} className={css.button} />
        </div>
    )
}

export default RegisterStep;

const styles: { [key: string]: CSSProperties } = {
    h1: {
        textAlign: "center",
        marginBottom: 0
    }
}