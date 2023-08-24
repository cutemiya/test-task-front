import React from "react";

import '../TextArea/styles.scss'

import {colors} from "../../lib/utils/css";
import {Typography} from "../Typography";

interface IInput {
    name?: string
    label?: string
    placeholder?: string
    value?: string
    className?: string
    color?: keyof typeof colors
}


export const Input: React.FC<IInput> = (
    {
        placeholder,
        value,
        name,
        className,
        color,
        label,
    }
) => {

    return (
        <>
            <div className={`card ${className}`}>
                <label className="input">
                    <input className="input__field"
                           type="text" placeholder={placeholder}
                           name={name}
                           value={value}
                           color={color}
                    />
                    <Typography type={'p1'} className="input__label">{label}</Typography>
                </label>
            </div>
        </>
    )
}