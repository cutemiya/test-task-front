import './styles.scss'
import React, {PropsWithChildren, ButtonHTMLAttributes} from "react";
import {Typography} from "../Typography";

interface IButton {
    colorBehavior: 'primary' | 'done' | 'delete' | 'wait' // цвет кнопки
    className?: string,
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export const Button: React.FC<PropsWithChildren<IButton>> = (
    {
        colorBehavior,
        onClick,
        className,
        children,
    }) => {
    return <button
        className={`
            base 
            size_
            btn_${colorBehavior} 
            ${className || ''}`
        }
        onClick={onClick as any}
    >
        <Typography type={'p1'}>
            {children}
        </Typography>
    </button>
}

export default Button;