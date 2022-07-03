import React, { useState } from 'react';
import './App.css';
import { ITasks, ToDoList } from './components/ToDoList';
import { v4 as uuidv4 } from 'uuid';
import { InputForm } from './components/InputForm/InputForm';

export type FilterType = 'active' | 'all' | 'completed'

type TodoListType = {
    _id: string
    title: string
    filter: FilterType
}
type TasksType = {
    [key:string] :Array<ITasks>
}

function App() {

    const toDoListID1 = uuidv4();
    const toDoListID2 = uuidv4();

    let [toDoLists, setToDoLists] = useState<Array<TodoListType>>([
        { _id: toDoListID1, title: 'What to learn', filter: 'all' },
        { _id: toDoListID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [toDoListID1]: [
            { id: uuidv4(), title: 'HTML&CSS', isDone: true },
            { id: uuidv4(), title: 'JS', isDone: true },
            { id: uuidv4(), title: 'ReactJS', isDone: false },

        ],
        [toDoListID2]: [
            { id: uuidv4(), title: 'Rest API', isDone: true },
            { id: uuidv4(), title: 'GraphQL', isDone: false },
        ]
    })

    function removeTask(id: string, toDoListID: string) {
        let filterTasks = tasks[toDoListID]
        tasks[toDoListID] = filterTasks.filter(task => task.id !== id);
        setTasks({ ...tasks })
    }

    function setTask(title: string, toDoListID: string) {
        let task = { id: uuidv4(), title: title, isDone: false }
        let toDoTask = tasks[toDoListID]
        tasks[toDoListID] = [task, ...toDoTask]

        setTasks({ ...tasks })
    }

    const changeTitleTask = (id: string, title: string, toDoListID: string) => {
        let task = tasks[toDoListID].find(t => t.id === id)
        if (task) {
            task.title = title;
            setTasks({ ...tasks })
        }
    }
    const changeStatusTask = (id: string, isDone: boolean, toDoListID: string) => {
        let task = tasks[toDoListID].find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks })
        }
    }

    function changeFilter(value: FilterType, _id: string): void {
        let filterTask = toDoLists.find((e) => e._id === _id)
        if (filterTask) {
            filterTask.filter = value
            setToDoLists([...toDoLists])
        }
    }

    function removeTasks(_id: string) {
        setToDoLists(toDoLists.filter(e => e._id !== _id))
        delete tasks[_id]
        setTasks({ ...tasks })
    }

    function renameTasks(text:string, _id: string){
        const toDoList = toDoLists.find(e => e._id === _id)
        if(toDoList){
            toDoList.title = text;
            setToDoLists([...toDoLists])
        }
    }

    function addToDoList (title:string){
        const toDoListId = uuidv4();
        let toDoList:TodoListType = {
            _id: toDoListId,
            title: title,
            filter: 'all'
        }
        setToDoLists([toDoList, ...toDoLists])
        setTasks({
            ...tasks,
            [toDoListId]:[]
        })
    }
    
    return (
        <div className='App'>
            <InputForm setItem={addToDoList} />
            {
                toDoLists.map((element) => {
                    let filterTasks = tasks[element._id];

                    if (element.filter === 'completed') {
                        filterTasks = tasks[element._id].filter(task => task.isDone === true)
                    }

                    if (element.filter === 'active') {
                        filterTasks = tasks[element._id].filter(task => task.isDone === false)
                    }
                    return (
                        <ToDoList
                            removeTasks={removeTasks}
                            id={element._id}
                            titleName={element.title}
                            filter={element.filter}
                            tasks={filterTasks}
                            removeTask={removeTask}
                            renameTasks={renameTasks}
                            changeFilter={changeFilter}
                            setTask={setTask}
                            changeStatusTask={changeStatusTask}
                            changeTitleTask={changeTitleTask}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
