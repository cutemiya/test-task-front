import './styles.scss'
import {colors} from '../../lib/utils/css'
import {PropsWithChildren, FC} from "react";

type ITypographyTypes = `${'h1' | 'p1' | 'p2'}`

interface ITypography {
    className?: string | undefined
    type: ITypographyTypes
    color?: keyof typeof colors
}

export const Typography: FC<PropsWithChildren<ITypography>> = (
    {
        className,
        type,
        color,
        children
    }) => {return (
        <div className={`${className} ${type}`} color={color || colors['black']}>
            {children}
        </div>
)}