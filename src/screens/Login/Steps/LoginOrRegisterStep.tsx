import React, {CSSProperties, ReactElement, useEffect, useState} from "react";
import {useTheme} from "../../../components/Theme/Theme";
import Button from "../../../components/Inputs/Button";
import css from "./LoginOrRegisterStep.module.css"

type LoginOrRegisterStepProps = {
    goToLoginStep: () => void;
    goToRegisterStep: () => void;
}

function LoginOrRegisterStep({goToLoginStep, goToRegisterStep}: LoginOrRegisterStepProps): ReactElement {
    const [t] = useTheme();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={styles.h1}>Prochat</h1>
            <Button label={"Login"} onClick={goToLoginStep} className={css.button} />
            <Button label={"Register"} onClick={goToRegisterStep} className={css.button} />
        </div>
    )
}

export default LoginOrRegisterStep;

const styles: { [key: string]: CSSProperties } = {
    h1: {
        textAlign: "center",
        marginBottom: 0
    }
}