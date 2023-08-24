import React from "react";

import './styles.scss'

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


export const TextArea: React.FC<IInput> = (
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
                    <textarea className="input__field"
                              placeholder={placeholder}
                              name={name} value={value}
                              color={color}
                              rows={15}
                    />
                    <Typography type={'p1'} className="input__label">{label}</Typography>
                </label>
            </div>
        </>
    )
}