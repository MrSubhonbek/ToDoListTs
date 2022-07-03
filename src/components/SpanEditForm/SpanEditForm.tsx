import React, { useState } from 'react'
import s from './SpanEditForm.module.css'
interface IProps {
    text: string
    onChange: (text:string)=>void
}
export function SpanEditForm(props: IProps) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [text, setText] = useState<string>("")

    const activeEditMode = () => {
        setEditMode(!editMode);
        setText(props.text);
    }
    const activeViewMode = () => {
        setEditMode(!editMode);
        props.onChange(text)
    }
    const onChangeTextHandler = (e:React.ChangeEvent<HTMLInputElement>) =>setText(e.currentTarget.value);
    
    return editMode
        ? <input onChange={onChangeTextHandler} onBlur={activeViewMode} value={text} autoFocus/>
        : <span onDoubleClick={activeEditMode} >{props.text}</span>
}