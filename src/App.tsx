import { type } from 'os';
import React, { useState } from 'react';
import './App.css';
import ToDolist from './component/ToDoList';

export type FilterType = 'active'|'all'|'completed'

function App() {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
]);
    let [filter, setFilter] = useState<FilterType>("all");
    let filterTasks = tasks;    

    function removeTask(id: number) {
        filterTasks = tasks.filter(task => task.id !== id);
        setTasks(filterTasks)
    }
    
    if(filter === 'completed') {
        filterTasks = tasks.filter(task => task.isDone === true)
    }
    if(filter === 'active') {
        filterTasks = tasks.filter(task => task.isDone === false)
    }
    function changeFilter(value:FilterType):void {
        setFilter(value);
    }
    return (
        <div className='App'>
            <ToDolist
                titleName='What to learn'
                tasks={filterTasks}
                removeTask={removeTask}
                changeFilter = {changeFilter}
            />
        </div>
    );
}

export default App;
