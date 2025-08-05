import {FilterValues, TodolistType} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ActionType = DeleteTodolistActionType | CreateTodolistActionType | ChangeTodolistTitleActionType | changeTodolistFilterActionType

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "delete_todolist": {
            const {id} = action.payload
            return todolists.filter(todolist => todolist.id !== id);
        }

        case "create_todolist": {
            const {id, title} = action.payload;
            const newTodolist: TodolistType = {
                id: id,
                title: title,
                filter: "all"
            }
            return [...todolists, newTodolist];
        }

        case "change_todolistTitle": {
            const {id, title} = action.payload;
            return todolists.map(tl => tl.id === id ? {...tl, title: title} : tl);
        }

        case "change_todolistFilter": {
            const {id, filter} = action.payload;
            return todolists.map(tl => tl.id === id ? {...tl, filter: filter} : tl)
        }


        default:
            return todolists;
    }
}

export const deleteTodolistAC = (id: TodolistType["id"]) => ({
    type: "delete_todolist",
    payload: {
        id: id
    }
} as const)

export const createTodolistAC = (title: TodolistType["title"]) => ({
    type: "create_todolist",
    payload: {
        title: title,
        id: v1()
    }
}as const)

export const changeTodolistTitleAC = ({id, title} : {id: TodolistType["id"], title: TodolistType["title"]}) => ({
    type: "change_todolistTitle",
    payload: {
        id: id,
        title: title
    }
}as const)

export const changeTodolistFilterAC = ({id, filter} : {id: TodolistType["id"], filter: FilterValues}) => ({
    type: "change_todolistFilter",
    payload: {
        id: id,
        filter: filter
    }
} as const)