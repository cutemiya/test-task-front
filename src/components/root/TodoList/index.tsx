import {useGlobalContext, useGlobalHelperContext} from "../../../lib/store";
import {TodoComponent} from "../Todo";
import './styles.scss'
import {useState} from "react";
import {Todo} from "../../../models/todo";

export const TodoList = () => {
    const [currentTodos, setCurrentTodos] = useState<Array<Todo>>([]) // текущие отображаемые todo
    const {todos} = useGlobalContext()
    const {searchValue, setSearchValue, setVisibility} = useGlobalHelperContext()

    /**
     * Функция меняет стейт текущих отображемых todo в <TodoList />
     * @return         ничего не возвращает
     */
    const searchHandle = () => {
        // ищет вхождение строки в именах todo и меняет текущий отображемый список todo
        setCurrentTodos(todos.filter(todo => todo.info.label.match(new RegExp(searchValue, 'i')) ? todo : null))
    }

    return <div className={'todo-list-wrapper'}>
        <input className={'search-input'}
               placeholder={'Найти'}
               value={searchValue}
               onChange={e => {
                   setSearchValue(e.target.value);
                   searchHandle();
                   setVisibility(false)
               }}
        />
        {(searchValue === '' ? todos : currentTodos).map(todo => <TodoComponent todo={todo} key={todo.info.id}/>)}
    </div>
}