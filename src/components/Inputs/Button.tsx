import React, {CSSProperties, ReactElement} from 'react';
import css from './TextInput.module.css'

type ButtonProps = {
    label: string;
    onClick: () => void;
    style?: CSSProperties;
    className?: string;
}

function Button({label, onClick, style, className}: ButtonProps): ReactElement {
    return (
        <button className={className} style={style} onClick={(e) => onClick()}>{label}</button>
    )
}

export default Button;
