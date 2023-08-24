import {FC, PropsWithChildren} from "react";
import './styles.scss'
import {colors} from "../../../lib/utils/css";
import {useGlobalContext, useGlobalHelperContext} from "../../../lib/store";
import {Todo, Status} from "../../../models/todo";
import {Typography} from "../../Typography";

interface ITodo {
    todo: Todo
}

export const TodoComponent: FC<PropsWithChildren<ITodo>> =
    ({todo}) => {

        const {setInformation} = useGlobalContext();
        const {setVisibility} = useGlobalHelperContext()

        /**
         * Функция по нажатию  todo из <TodoList /> меняет стейт visibility и стейт с информаицей в <Description />
         * @return      ничего не возвращает
         */
        const handlerTodo = () => {
            setInformation({label: todo.info.label, description: todo.info.description, id: todo.info.id})
            setVisibility(true)
        }

        /**
         * Функция возвращает ключ цвета по статусу todo
         * @param    {keyof typeof Status} status    статус todo
         * @return   {keyof typeof Status}          возращает ключ по которому можно взять цвет
         */
        const getColor = (status: keyof typeof Status): keyof typeof colors => {
            switch (status) {
                case "done":
                    return 'done300'
                case "inProcess":
                    return 'primary_300'
                case "wait":
                    return 'grey_300'
            }
        }

        return <div className={'todo-wrapper'}
                    onClick={handlerTodo}
                    style={{boxShadow: `0px 4px 10px 4px ${colors[getColor(todo.status)]}`}}>
            <Typography type={'p1'} className={'text'}>
                {todo.info.label}
            </Typography>
        </div>
    }