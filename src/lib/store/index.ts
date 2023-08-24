import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {Information, Todo} from "../../models/todo";

// Контекс с бизнес-логикой
type ContextValue = {
    todos: Array<Todo> // state список todo
    setTodos: Dispatch<SetStateAction<Array<Todo>>>
    information: Information // стейт с информацией текущего todo для передачи в <Description />
    setInformation: Dispatch<SetStateAction<Information>>
}

// Контекс с логикой для ui
type HelperContextValue = {
    visibility: boolean // отображение <Description />
    setVisibility: Dispatch<SetStateAction<boolean>>
    searchValue: string // стейт со стройкой поиска todo
    setSearchValue: Dispatch<SetStateAction<string>>
}

export const Context = createContext<ContextValue>({
    todos: [],
    information: {label: "", description: "", id: 0},
    setTodos: () => {},
    setInformation: () => {},
})

export const HelperContext = createContext<HelperContextValue>({
    visibility: false,
    setVisibility: () => {},
    searchValue: '',
    setSearchValue: () => {}
})

export const useGlobalContext = () => useContext(Context)
export const useGlobalHelperContext = () => useContext(HelperContext)



