import "./styles.scss"
import {Dispatch, PropsWithChildren, SetStateAction, FC} from "react";

interface IModal {
    active: boolean // стейт отображение модального окна
    setActive: Dispatch<SetStateAction<boolean>>
}

export const Modal: FC<PropsWithChildren<IModal>> = (
    {
        active,
        setActive,
        children
    }) => {
    return (
        <div className={active ? "modal modalActive" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modalContent modalContentActive" : "modalContent"} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}