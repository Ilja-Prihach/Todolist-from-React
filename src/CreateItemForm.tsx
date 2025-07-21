import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    createItem: (itemTitle: string) => void;
    itemTitleLength:  number;
}

export const CreateItemForm = ({createItem, itemTitleLength} : Props) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState(false);

    //Ввод в input значения title
    const onChangeItemTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setItemTitle(e.currentTarget.value)
    }

    // Функция создания таски
    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemTitle("")
    }

    // функция добавлен таски
    const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && isAddTaskPossible) {
            createItemHandler()
        }}
    // Условия добавления таски, первичная валидация
    const isAddTaskPossible = itemTitle !== "" && itemTitle.length <= itemTitleLength

    return (
        <div>
            <input
                value={itemTitle}
                onChange={onChangeItemTitleHandler}
                onKeyDown={onKeyDownCreateItemHandler}
                placeholder={`max ${itemTitleLength} charters`}
                className={error ? "input-error" : ""}
            />
            <Button title={"+"}
                    disabled={!isAddTaskPossible}
                    onClickHandler={
                        createItemHandler
                    }/>
            {itemTitle && itemTitle.length <= itemTitleLength && <div>rest {itemTitleLength-itemTitle.length} charters</div>}
            {itemTitle && itemTitle.length > itemTitleLength && <div style={{color: "red"}}>title is too long</div>}
            {error && <div style={{color: "red"}}>Enter valid Title</div>}
        </div>
    )
}