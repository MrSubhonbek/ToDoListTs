import React, { useState } from "react";
import { FilterType } from "../App";
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
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const itemList = props.tasks.map((element) => {
        return (
            <li key={element.id} className={element.isDone ? s.isDone : ''}>
                <input onClick={() => props.changeStatusTask(element.id, !element.isDone, props.id)} type="checkbox" checked={element.isDone} />
                <span>{element.title}</span>
                <button onClick={() => props.removeTask(element.id, props.id)}>X</button>
            </li>
        );
    })



    const setTaskHandler = () => {
        if (title.trim()) {
            props.setTask(title, props.id)
            setTitle('')
        }
        else {
            setError("This is wrong title!!!")
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter')
            setTaskHandler()
    }

    const onClickAllHandler = () => {
        props.changeFilter('all', props.id)
    }

    const onClickActiveHandler = () => {
        props.changeFilter('active', props.id)
    }

    const onClickCompletedHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const onClickRemoveTasks = () => {
        props.removeTasks(props.id)
    }

    return (
        <div>
            <div className={s.wrapper}>
                <h3>{props.titleName}</h3>
                <button onClick={onClickRemoveTasks}>X</button>
            </div>
            <div>
                <input
                    type="text"
                    onKeyPress={onKeyPressHandler}
                    value={title}
                    onChange={onChangeHandler}
                    aria-label="Search"
                    className={error ? s.error : ""}
                />
                <button onClick={setTaskHandler}>+</button>
                {error &&
                    <div className={s.errorMessage}>{error}</div>
                }
            </div>
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
