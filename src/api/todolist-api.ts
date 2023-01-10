import axios from "axios";
import {CreateTodolist, DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    withCredentials: true,
    headers: {
        "API-KEY": "f83ab265-6ea1-4c85-9768-a7fde6d80310"
    }

})
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then((res) => res.data)
    },
    сreateTodolist(title: string) {
        return instance.post<ResponseType<{title:TodolistType}>>('todo-lists', {title})
            .then((res) => res.data)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then((res) => res.data)
    },
    deleteTodolist(todolistId: string) {
        let todoId = '4442d1db-d6ad-4703-a2ea-6d852c28bdc3'
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then((res) => res.data)
    }
}

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data:T
    fieldErrors:string[]
    messages: string[]
    resultCode: number
}


// <---ПРИМЕР ДО INSTANCE--->

// const settings = {
//     withCredentials: true,
//     headers: {
//         "API-KEY": "f83ab265-6ea1-4c85-9768-a7fde6d80310"
//     }
//
// }

// export const todolistAPI = {
//     getTodolists() {
//         return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
//             .then((res) => res.data)
//     },
//     сreateTodolist(title: string) {
//         return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
//             .then((res) => res.data)
//     },
//     updateTodolistTitle(todolistId: string, title: string) {
//         return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
//             .then((res) => res.data)
//     },
//     deleteTodolist(todolistId: string) {
//         let todoId = '4442d1db-d6ad-4703-a2ea-6d852c28bdc3'
//         return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
//             .then((res) => res.data)
//     }
// }