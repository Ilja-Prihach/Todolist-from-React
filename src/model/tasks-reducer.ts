import type {TasksState} from '../App'
import {ActionType} from "./todolist-reducer.ts";


export const tasksReducer = (tasks: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...tasks, [action.payload.id] : []}
        }
        case 'delete_todolist' : {
            const {id} = action.payload;
            const copyState = {...tasks}
            delete copyState[id]
            return copyState
        }
        default:
            return tasks
    }
}

