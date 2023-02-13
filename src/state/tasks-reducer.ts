import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistsAC, SetTodolistsType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, TodolistType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    task: TaskType
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }

        case "SET-TODOS": {
            const stateCopy = {...state}
            action.todos.forEach((tl: TodolistType) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            /*Записывем отфильтрованные таски в исходный массив*/
            stateCopy[action.todolistId] = filteredTasks

            return stateCopy
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        }
        case "CHANGE-TASK-STATUS": {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []


            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

/*ACTION CREATORS*/

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}

export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", status, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(title, todoListId)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item, todoListId))
        })

}


export const updateTaskTC = (todoListId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListId].find((t) => t.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                completed: task.completed,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                status
            }

            todolistsAPI.updateTask(todoListId, taskId, model)
                .then(res => {
                    dispatch(changeTaskStatusAC(taskId, status, todoListId))
                })

        }
    }
//
//         const state = getState()
//         const task = state.tasks[todoListId].find(t => t.id === taskId)
//         if (!task) {
//             console.warn('task not found')
//             return
//         }
//
//         const apiModel: UpdateTaskType = {
//             title: task.title,
//             status: task.status,
//             completed: task.completed,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             ...domainModel
//         }
//
//         todolistsAPI.updateTask(todoListId, taskId, apiModel)
//             .then(res => {
//                 // @ts-ignore
//                 if (res.data.resultCode === 0) {
//                     const action = updateTaskAC(todoListId, taskId, domainModel)
//                     dispatch(action)
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error,dispatch)
//             })
//     }
//
//
// export type UpdateDomainTaskModelType = {
//     title?: string
//     description?: string
//     completed?: boolean
//     status?: TaskStatuses
//     priority?: TaskPriorities
//     startDate?: string
//     deadline?: string
//
//
