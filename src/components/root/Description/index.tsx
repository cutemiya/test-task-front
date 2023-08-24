import {useRef, useState} from "react";
import './styles.scss'
import {useGlobalContext, useGlobalHelperContext} from "../../../lib/store";
import {Input} from "../../Input";
import {Typography} from "../../Typography";
import {TextArea} from "../../TextArea";
import {Button} from "../../Button";
import {Modal} from "../../Modal";
import {Status, Todo} from "../../../models/todo";

export const Description = () => {
    const {information, todos, setInformation, setTodos} = useGlobalContext()
    const {setVisibility, setSearchValue} = useGlobalHelperContext()
    const formRef = useRef<HTMLFormElement>(null) // ref на форму с информацией о todo, для получения изменений в todo
    const [active, setActive] = useState<boolean>(false) // стейт для модального окна с изменением статуса todo

    /** Хэндлер для формы, для получения значений из <Input /> и <TextArea />
     *  @return {Array<string>}  значения из <Input /> и <TextArea />
     **/
    const formHandle = (): Array<string> => {
        if (formRef.current) {
            return [formRef.current['label'].value, formRef.current['description'].value]
        }

        return []
    }

    /** Обновляет данные стейта при измении их через <Input /> или <TextArea />
     *  @return ничего не возвращает
     **/
    const changeTodo = () => {
        // eslint-disable-next-line array-callback-return
        todos.map(todo => {
            if (todo.info.id === information.id) {
                const data = formHandle() // получаем данные текстовых полей из формы
                todo.info.label = data[0]
                todo.info.description = data[1]
                setInformation(todo.info) // обновляем стейт для корректного отображения в <Description />
                setTodos([...todos]) // обновляем стейт со всеми todos
            }
        })
    }

    /**  Функция обнолвяет статус todo
     *  @param  {keyof typeof Status} status статус на который надо поменять
     *  @return ничего не возвращает
     **/
    const changeTodoStatus = (status: keyof typeof Status) => {
        // eslint-disable-next-line array-callback-return
        todos.map(todo => {
            if(todo.info.id === information.id) {
                todo.status = status
                setActive(false) // скрываем моадльное окно
                setTodos([...todos]) // обновляем стейт с todos
            }
        })
    }

    /** Функция удаляет todo
     *  @return ничего не возвращает
     */
    const deleteTodo = () => {
        let newTodoList: Array<Todo> = []

        // eslint-disable-next-line array-callback-return
        todos.map(todo => {
            if (todo.info.id !== information.id) {
                newTodoList.push(todo)
            }
        })

        setTodos([...newTodoList]) // обновление стейта с todo
        setVisibility(false) // скрываем <Description /> после удаления
        setSearchValue('') // чистим поисковую строку
    }

    return <div className={'description-wrapper'}>
        <div className={'title'}>
            <Typography type={'h1'}>Основная информация</Typography>
        </div>
        <form ref={formRef} onChange={changeTodo}>
            <Input value={information.label} placeholder={'Наименование'} name={'label'} label={'Наименование'} />
            <TextArea value={information.description} placeholder={'Описание'} name={'description'} label={'Описание'}/>
        </form>

        <div className={'buttons'}>
            <Button colorBehavior={'done'} onClick={() => setActive(true)}>
                Изменить статус
            </Button>
            <Button colorBehavior={'delete'} onClick={deleteTodo}>
                Удалить todo
            </Button>
        </div>

        {/* модальное окно для смены статуса todo*/}
        <Modal active={active} setActive={setActive}>
            <div className={'modal-status-wrapper'}>
                <Typography type={'h1'}>
                    Выберите статус
                </Typography>
                <Button colorBehavior={'wait'} onClick={() => changeTodoStatus('wait')}>
                    В ожидании
                </Button>
                <Button colorBehavior={'primary'} onClick={() => changeTodoStatus('inProcess')}>
                    В процессе
                </Button>
                <Button colorBehavior={'done'} onClick={() => changeTodoStatus('done')}>
                    Выполнено
                </Button>
            </div>
        </Modal>
    </div>
}