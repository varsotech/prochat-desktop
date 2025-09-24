import React, {CSSProperties, ReactElement} from 'react';
import css from './TextInput.module.css'

type ButtonProps = {
    label: string;
    onClick: () => void;
    style?: CSSProperties;
}

function Button({label, onClick, style}: ButtonProps): ReactElement {
    return (
        <button style={style} onClick={(e) => onClick()}>{label}</button>
    )
}

export default Button;
