import {ChangeEvent, useState} from "react";

type Props = {
    title: string;
    changeItemTitle: (newTitle: string) => void;
    classes?: string;
}

export const EditableSpan = ({title, changeItemTitle, classes}: Props) => {
    const[editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title);
    const onChangeItemTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setItemTitle(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false)
        changeItemTitle(itemTitle);
    }
    return (
        editMode
        ? <input
            value={itemTitle}
            onChange={onChangeItemTitleHandler}
            autoFocus
            onBlur={offEditMode}
        />
        : <span
            className={classes}
            onDoubleClick={onEditMode}>{title}
        </span>
    )
}