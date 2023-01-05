import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "./TodoList";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    key:string
    task:TaskType
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void

}

export const Task:React.FC<TaskPropsType> = memo((props) => {
    console.log('Task')

    const onClickHandler = () => props.removeTask(props.task.id,)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue,);
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue,);
    }



    return <div className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
});

