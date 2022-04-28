import React from "react";

interface ITasks {
    id: number,
    title: string,
    isDone: boolean
};

interface IProps {
    titleName: string,
    tasks: Array<ITasks>
};

function ToDolist(props: IProps) {
    return (
        <div>
            <h3>{props.titleName}</h3>
            <div>
                <input type="text" aria-label="Search"/>
                    <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" aria-label="Search" checked={true} /> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" aria-label="Search" checked={true} /> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" aria-label="Search" checked={false} /> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
export default ToDolist;