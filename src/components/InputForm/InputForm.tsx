import React, { useState } from 'react'
import s from './Input.module.css'
interface IProps {
    setItem: (title:string)=>void
}
export function InputForm(props:IProps) {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter')
            setTaskHandler()
    }
    const setTaskHandler = () => {
        if (title.trim()) {
            props.setItem(title)
            setTitle('')
        }
        else {
            setError("This is wrong title!!!")
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
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
        </div>
    )
}