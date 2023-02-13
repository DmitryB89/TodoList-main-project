import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskTC, updateTaskTC} from "../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {AppDispatch} from "../state/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string

}

export const TaskWithRedux: React.FC<TaskPropsType> = memo(({task, todolistId}) => {
    console.log('Task')
    const {id, title, status} = task
    const dispatch = AppDispatch()

    const onClickHandler = () => dispatch(removeTaskTC(todolistId, id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked;
        dispatch(updateTaskTC(todolistId, id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId));
    }


    return <div className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});

