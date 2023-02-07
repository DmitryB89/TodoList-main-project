import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolist-api"
import {monitorEventLoopDelay} from "perf_hooks";

export default {
    title: 'API'
}

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY':'e5c55cc0-0162-48b9-a9ec-3b0ec1ece3c9'
//     }
//
// }

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<any>('')

    const createTodolist = () => {
        todolistsAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data)

            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistTitle'} value={todolistTitle} onChange={(e) => {
                setTodolistTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const deleteTodolist = () => {

        todolistsAPI.deleteTodolist(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e) => {
                settodoListId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')


    const updateTodolist = () => {

        todolistsAPI.updateTodolist(todoListId, 'Yo-yo-yo')
            .then((res) => {
                setState(res.data)
            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e) => {
                settodoListId(e.currentTarget.value)
            }}/>
            <button onClick={updateTodolist}>update todolist</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const getTasks = () => {
        todolistsAPI.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e) => {
                settodoListId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todoListId = '467b17e4-e431-49ae-bef2-d9df97d9e253'
//         const taskId = ''
//         todolistsAPI.deleteTask(todoListId, taskId)
//             .then((res) => {
//                 setState(res.data)
//             })
//
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, settodoListId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return (

        <div>{JSON.stringify(state)}
            <div>
                <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                    settodoListId(e.currentTarget.value)
                }}/>
                <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <button onClick={deleteTask}>Delete task</button>

            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')

    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [priority, setPriority] = useState<number>(0)
    const [status, setStatus] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todoListId, taskId, {
            deadline:"",
            description:description,
            priority:priority,
            startDate: "",
            status:status,
            title:title,
            // completed:false

        })
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>{JSON.stringify(state)}
            <div>
                <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                    settodoListId(e.currentTarget.value)
                }}/>
                <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <input placeholder={"Task title"} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <input placeholder={"Description"} value={description} onChange={(e) => {
                    setDescription(e.currentTarget.value)
                }}/>
                <input placeholder={"Status"} value={status} type={"number"} onChange={(e) => {
                    setStatus(+e.currentTarget.value)
                }}/>
                <input placeholder={"Priority"} value={priority} type={"number"} onChange={(e) => {
                    setPriority(+e.currentTarget.value)
                }}/>
                <button onClick={updateTask}>updateTask</button>

            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const [title, settitle] = useState<string>('')

    const addTask = () => {
        todolistsAPI.createTask(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>{JSON.stringify(state)}
            <div>
                <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                    settodoListId(e.currentTarget.value)
                }}/>
                <input placeholder={"task title"} value={title} onChange={(e) => {
                    settitle(e.currentTarget.value)
                }}/>
                <button onClick={addTask}>create task</button>
            </div>
        </div>
    )
}
