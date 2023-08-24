import './styles.scss'
import React, {useState} from "react";
import {TodoList} from "../TodoList";
import {Description} from "../Description";
import {HelperContext} from "../../../lib/store";

export const Wrapper = () => {

    const[visibility, setVisibility] = useState<boolean>(false) // отображение правого окна с информацией
    const [searchValue, setSearchValue] = useState<string>("") //  текущее значение input'a в поиске

    // стейты и диспатчеры которые передаются в Helper.Context
    const value = {
        visibility: visibility,
        setVisibility: setVisibility,
        searchValue: searchValue,
        setSearchValue: setSearchValue
    }

    return (
        <HelperContext.Provider value={value}>
            <div className={'wrapper'}>
                <TodoList/>
                {visibility && <Description/>}
            </div>
        </HelperContext.Provider>

    )
}
