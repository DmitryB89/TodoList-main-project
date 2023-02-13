import {string} from "prop-types";
import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '389e81a8-96f7-47cf-bd30-09273bc8bc48'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

// type CreateTodolistResponseType = {
//     resultCode: number
// //     messages: string[]
// //     data: {
// //         item: TodolistType
// //     }
// }
//
// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     data: {}
// }
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgent,
    Later

}

// const a: TaskStatuses = TaskStatuses.InProgress

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponseType = {
    totalCount: number
    error: string | null
    items: TaskType[]

}

export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string,model:UpdateTaskModelType ) {
        return instance.put<UpdateTaskModelType>(`todo-lists/${todoListId}/tasks/${taskId}`,model)
    },

    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todoListId}/tasks/`, {title: title})
    },


}



