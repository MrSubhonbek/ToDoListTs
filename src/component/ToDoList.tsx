import React, { useState } from "react";
import { FilterType } from "../App";

interface ITasks {
    id: number,
    title: string,
    isDone: boolean
};

interface IProps {
    titleName: string,
    tasks: Array<ITasks>
    removeTask: (id: number) => void
    changeFilter: (value: FilterType) => void
    setTask: (title: string) => void
};



function ToDolist(props: IProps) {
    let [title, setTitle] = useState<string>("")

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const itemList = props.tasks.map((element) => {
        return (
            <li>
                <input type="checkbox" aria-label="Search" checked={element.isDone} />
                <span>{element.title}</span>
                <button onClick={() => props.removeTask(element.id)}>Delete</button>
            </li>
        );
    })

    const setTaskHendler = () => {
        props.setTask(title)
        setTitle('')
    }

    const onKeyPressHendler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            setTaskHendler()
    }

    const onClickAllHandler = () => {
        props.changeFilter('all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter('active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.titleName}</h3>
            <div>
                <input type="text" onKeyPress={onKeyPressHendler} value={title} onChange={onChangeHandler} aria-label="Search" />
                <button onClick={setTaskHendler}>+</button>
            </div>
            <ul>
                {itemList}
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
}
export default ToDolist;