// информация о todo
type Information = {
    label: string // наименование todo
    description: string // описание todo
    id: number // id todo
}

type Todo = {
    status: keyof typeof Status // статус todo (в ожидании, в процессе, выполнено)
    info: Information // информация todo
}

// статусы todo
enum Status {
    wait, // в ожидании
    inProcess , // в процессе
    done // выполнено
}

export type { Information, Todo, Status };
