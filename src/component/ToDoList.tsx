import React from "react";
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
};

function ToDolist(props: IProps) {
    const itemList = props.tasks.map((element) => {
        return (
            <li>
                <input type="checkbox" aria-label="Search" checked={element.isDone} />
                <span>{element.title}</span>
                <button onClick={() => props.removeTask(element.id)}>Delete</button>
            </li>
        );
    })



    return (
        <div>
            <h3>{props.titleName}</h3>
            <div>
                <input type="text" aria-label="Search" />
                <button>+</button>
            </div>
            <ul>
                {itemList}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}
export default ToDolist;