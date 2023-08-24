import {useRef, useState} from 'react';
import '../styles/pages/App.scss';
import {Context} from '../lib/store'
import {Information, Todo} from "../models/todo";
import {Wrapper} from "../components/root/Wrapper";
import {Button} from "../components/Button";
import {Modal} from "../components/Modal";
import {Input} from "../components/Input";
import {TextArea} from "../components/TextArea";


function App() {
    const [active, setActive] = useState(false) //  стейт для модального окна добавления todo
    const [count, setCount] = useState<number>(0) // количество todo, стейт нужен чтобы передавать уникальный id каждому todo
    const [todoList, setTodoList] = useState<Array<Todo>>([]) // список todo
    const [info, setInfo] = useState<Information>({label: '', description: '', id: 0}) // стейт с информацией, отображаемой в <Description />

    const formRef = useRef<HTMLFormElement>(null) // ref для формы модального окна

    // стейты и диспатчеры, которые передаются в Context
    const value = {
        todos: todoList,
        setTodos: setTodoList,
        information: info,
        setInformation: setInfo,
    }

    /** Функция добавляет todo в todoList
     * @param {Information} info - данные о todo, взятые с формы
     * @return ничего не возвращает
     */
    const addTodoHandle = (
        info: Information
    ) => {
        const newTodo: Todo = {
            info: info,
            status: "wait" // статус по умолчанию в ожидании
        }

        setTodoList([...todoList, newTodo]) // обновляем стейт todoList (добавляем новый todo)
        setActive(false) // скрываем модальное окно
    }

    /** Функция возращает данные с формы
     * @return {Information} - данные нового todo взятые с формы
     */
    const formHandle = (): Information => {
        const form = formRef.current
        if (form) {
            setCount(count + 1)
            const info = {label: form['label'].value, description: form['description'].value, id: count}
            form['label'].value = ''
            form['description'].value = ''
            return info
        }
        return {label: '', description: '', id:0}
    }

    return (
        <Context.Provider value={value}>
            <div className="container">
                <Wrapper/>
                <Button colorBehavior={'primary'} className={'todo-add-btn'} onClick={() => setActive(true)}>Добавить
                    todo</Button>

                {/*модальное окно с добавлением todo*/}
                <Modal active={active} setActive={setActive}>
                    <form ref={formRef}>
                        <Input placeholder={'Наименование'} name={'label'} label={'Наименование'}/>
                        <TextArea placeholder={'Описание'} name={'description'} label={'Описание'}/>
                    </form>
                    <Button colorBehavior={'primary'} className={'modal-add-btn'} onClick={() => addTodoHandle(formHandle())}>
                        Создать
                    </Button>
                </Modal>
            </div>
        </Context.Provider>
    );
}

export default App;
