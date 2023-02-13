import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void


}
export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
    console.log('AddItemForm')
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            addTask()
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            {/*<input value={newTaskTitle}*/}
            {/*       onChange={onNewTitleChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}/>*/}
            <TextField value={newTaskTitle}
                       variant={"outlined"}
                       label={'Type value'}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <IconButton onClick={addTask} color={'primary'}><ControlPoint/></IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
})