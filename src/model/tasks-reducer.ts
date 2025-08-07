import type {TasksState, TodolistType} from '../App'
import {ActionType} from "./todolist-reducer.ts";
import {Task} from "../Todolist.tsx";
import {v1} from "uuid";

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type CreateTaskActionType = ReturnType<typeof createTaskAC>
export type UpdateTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (
    tasks: TasksState,
    action: ActionType | DeleteTaskActionType | CreateTaskActionType | UpdateTaskActionType | ChangeTaskTitleActionType
    ): TasksState => {
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
        case 'delete_task': {
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case 'create_task': {
            const newTask: Task = {id:v1(), title: action.payload.title, isDone:false}
            return {...tasks, [action.payload.todolistId]: [...tasks[action.payload.todolistId],  newTask]}
        }
        case 'change_task_status': {
            const updatedTasks: Task[] = tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.newStatus } : t)
            return {...tasks, [action.payload.todolistId]: updatedTasks}
        }
        case 'change_task_title': {
            const updatedTasks: Task[] = tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle } : t)
            return {...tasks, [action.payload.todolistId]: updatedTasks}
        }
        default:
            return tasks
    }
}

export const deleteTaskAC = ({taskId, todolistId}: {taskId: Task['id'], todolistId: TodolistType['id']}) => ({
    type: "delete_task",
    payload: {
        taskId: taskId,
        todolistId: todolistId
    }
}as const)

export const createTaskAC = ({todolistId, title} : {todolistId:  TodolistType['id'], title:Task['title']}) => ({
    type: "create_task",
    payload: {
        todolistId: todolistId,
        title: title,
    }
}as const)

export const changeTaskStatusAC = ({todolistId, taskId, newStatus} : {todolistId: TodolistType['id'], taskId: Task['id'], newStatus: Task['isDone']}) => ({
    type: "change_task_status",
    payload: {
        todolistId: todolistId,
        taskId: taskId,
        newStatus: newStatus
    }
}as const)

export const changeTaskTitleAC = ({taskId, newTitle, todolistId} : {taskId: Task['id'], newTitle: Task["title"], todolistId: TodolistType['id']}) => ({
    type: "change_task_title",
    payload: {
        taskId: taskId,
        newTitle: newTitle,
        todolistId: todolistId
    }
}as const)