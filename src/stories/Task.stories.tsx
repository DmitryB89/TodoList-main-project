import React, {ChangeEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";
import {TaskType} from "../Components/TodoList";

export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: 'abc', isDone: true, title: 'JS'},
        removeTask: action('removeTask'),
        changeTaskTitle: action('changeTaskTitle'),
        changeTaskStatus: action('changeTaskStatus'),
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {}

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id: 'def', isDone: false, title: 'CSS'},
}

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: 'def', isDone: false, title: 'CSS'})
    const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
    const changeTaskTitle = (taskId: string, newValue: string) => setTask({...task, title: newValue})
    const removeTask = () => setTask({} as TaskType)
    return <Task
        key={'aaa'}
        task={task}
        changeTaskTitle={changeTaskTitle}
        changeTaskStatus={changeTaskStatus}
        removeTask={removeTask}

    />
};


export const TaskStory = Template1.bind({});
