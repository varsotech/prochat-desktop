import React, {ReactElement} from 'react';
import css from './TextInput.module.css';

type TextInputProps = {
    label: string;
    value: string;
    setValue: (address: string) => void;
    type?: 'text' | 'password';
}

function TextInput({label, value, setValue, type}: TextInputProps): ReactElement {
    return (
        <input type={type}
               placeholder={label}
               className={css.input}
               value={value}
               onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default TextInput;
