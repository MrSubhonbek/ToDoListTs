import React from 'react';
import './App.css';
import ToDolist from './component/ToDoList';

const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
]
const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
]

function App() {
    return (
        <div className='App'>
            <ToDolist titleName='What to learn' tasks={tasks2}/>
            <ToDolist titleName='Song' tasks={tasks1}/>
        </div>
    );
}

export default App;
