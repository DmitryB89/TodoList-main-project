// import { TasksStateType, TodolistType} from "../AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./AddItemForm";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";

export type TodolistReduxType = {
    todolist: TodolistDomainType
}

export const TodolistRedux: React.FC<TodolistReduxType> = React.memo (({todolist}) => {
    const {id, title, filter} = todolist;
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])


    if (filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    const dispatch = useDispatch()

    // function removeTask(id: string, todolistId: string) {
    //     dispatch(removeTaskAC(id, todolistId));
    // }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id));
    }, [dispatch])

    // function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //     dispatch(changeTaskStatusAC(id, isDone, id));
    // }
    //
    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //     dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    // }

    // function changeFilter(value: FilterValuesType, todolistId: string) {
    //     dispatch(changeTodolistFilterAC(todolistId, value));
    // }

    const  removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id));
    }, [dispatch])

    const  changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    }, [dispatch])

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
})
