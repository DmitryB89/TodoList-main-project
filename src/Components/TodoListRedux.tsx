import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./AddItemForm";
import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "./TodoList";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

export type    TodolistReduxType = {
    todolist: TodolistType
}

export const TodolistRedux: React.FC<TodolistReduxType> = ({todolist}) => {
    const {id, title, filter} = todolist;
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])


    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }
    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }

    function addTask(title: string) {
        dispatch(addTaskAC(title, id));
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, id));
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }

    // function changeFilter(value: FilterValuesType, todolistId: string) {
    //     dispatch(changeTodolistFilterAC(todolistId, value));
    // }

    function removeTodolist() {
        dispatch(removeTodolistAC(id));
    }

    function changeTodolistTitle(title: string) {
        dispatch(changeTodolistTitleAC(id, title));
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, 'completed'))


    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}
