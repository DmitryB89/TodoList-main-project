import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, Todolist} from "./Components/TodoList";
import {v1} from "uuid";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {FilterValuesType} from "./AppWithReducer";


// export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type TasksStateType = {
    [key: string]: TaskType[]
}


// function zhopa(data:any) {
//     return [data, () => {}]
// }
//
// let arr = zhopa([{},{},{}])
//
// let tasks = arr[0]
// let setTasks = arr[1]
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let initTasks: Array<TaskType> =


    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    // const changeStatus = (taskId: string) => {
    //     let task =tasksObj.find ((t) => {
    //         if (t.id === taskId) {return true}
    //         else {return false}
    //         })
    //     }
    // const changeStatus = (taskId: string, isDone: boolean) => {
    //     let task = tasksObj.find(t => t.id === taskId);
    //     if (task) {
    //         task.isDone = isDone
    //     }
    //     setTasksObj([...tasksObj])
    // };
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        //Доастаем нужный массив по todoListId
        let tasks = tasksObj[todolistId]
        //Находим нужную таску
        let task = tasks.find(t => t.id === taskId)
        //Изменим таску, если она нашлась

        if (task) {
            task.isDone = isDone
            //Засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasksObj})
        }
    };

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)

        if (task) {
            task.title = newTitle

            setTasks({...tasksObj})
        }
    };


    let [filter, setFilter] = useState<FilterValuesType>('all')
    // let tasksObj = arr[0]
    // let setTasks = arr[1]


    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }

    const renameTodolist = (id: string, newTitle: string) => {
        // В массиве todolist'ов находим нужный
        const todolist = todolists.find(tl => tl.id === id)
        // Если тудулист нашелся - меняем title
        if (todolist) {
            todolist.title = newTitle
        }
        //Создаем копию массива тудулистов, чтобы React отреагировал перерисовкой
        setTodolists([...todolists])

    }


    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CS S', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Book', isDone: true},
        ]
    })


    const addTodolist = (title: string) => {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }


    return (

        <div className={'App'}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodoList = tasksObj[tl.id];
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                        }

                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                        }
                        return <Grid item>
                            <Paper style={{padding: '20px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={renameTodolist}
                                />
                            </Paper>
                        </Grid>


                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
