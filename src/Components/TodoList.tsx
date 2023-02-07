import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {TaskWithRedux} from "./TaskWithRedux";
import {ButtonMemo} from "./ButtonMemo";
import {FilterValuesType} from "../state/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = memo((props) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter, props.id]);

    let tasks = props.tasks;
    if (props.filter === 'active') {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone === true)
    }

    // const removeTask = useCallback( (taskId:string) => props.removeTask(taskId,props.id),[props.removeTask,props.id ])
    // const changeTaskStatus = useCallback( (taskId:string, status:boolean) => {
    //     props.changeTaskStatus(taskId,status,props.id);
    // },[props.changeTaskStatus, props.id])
    // const changeTaskTitle = useCallback( (taskId:string,newValue: string) => {
    //     props.changeTaskTitle(taskId, newValue, props.id);
    // },[props.changeTaskTitle,props.id])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {/*{tasks.map(t => {*/}
            {/*    return <Task*/}
            {/*        key={t.id}*/}
            {/*        task={t}*/}
            {/*        changeTaskStatus={changeTaskStatus}*/}
            {/*        changeTaskTitle={changeTaskTitle}*/}
            {/*        removeTask={removeTask}/>*/}
            {/*})*/}
            {/*}*/}
            {tasks.map(t => {
                return <TaskWithRedux
                    key={t.id}
                    task={t}
                    todolistId={props.id}
                />
            })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonMemo
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
                title={'All'}
            />
            <ButtonMemo
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
                title={'Active'}
            />
            <ButtonMemo
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
                title={'Completed'}
            />
        </div>
    </div>
})


