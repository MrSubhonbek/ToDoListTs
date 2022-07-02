import React, { useState } from "react";
import { FilterType } from "../App";
import { InputForm } from "./InputForm/InputForm";
import s from './ToDoList.module.css'
export interface ITasks {
    id: string,
    title: string,
    isDone: boolean
};

interface IProps {
    id: string
    titleName: string,
    filter: FilterType
    tasks: Array<ITasks>
    removeTasks: (toDoListID: string) => void
    removeTask: (id: string, toDoListID: string) => void
    changeFilter: (value: FilterType, _id: string) => void
    setTask: (title: string, toDoListID: string) => void
    changeStatusTask: (id: string, isDone: boolean, toDoListID: string) => void
};



export function ToDoList(props: IProps) {

    const itemList = props.tasks.map((element) => {
        return (
            <li key={element.id} className={element.isDone ? s.isDone : ''}>
                <input onClick={() => props.changeStatusTask(element.id, !element.isDone, props.id)} type="checkbox" checked={element.isDone} />
                <span>{element.title}</span>
                <button onClick={() => props.removeTask(element.id, props.id)}>X</button>
            </li>
        );
    })

    const addTask = (title:string)=>{
        props.setTask(title, props.id)
    }

    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('active', props.id)
    const onClickCompletedHandler = () => props.changeFilter('completed', props.id)
    const onClickRemoveTasks = () => props.removeTasks(props.id)

    return (
        <div>
            <div className={s.wrapper}>
                <h3>{props.titleName}</h3>
                <button onClick={onClickRemoveTasks}>X</button>
            </div>
            <InputForm setItem={addTask} />
            <ul>
                {itemList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={onClickAllHandler}>All</button>
                <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={onClickActiveHandler}>Active</button>
                <button className={props.filter === 'completed' ? s.activeFilter : ''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
}
