import {Button} from "./Button.tsx";
import {FilterValues, TodolistType} from "./App.tsx";
//import {ChangeEvent, useState, KeyboardEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
// import {useRef} from "react";

type Props = {
    todolistId: string;
    title: string
    tasks: Task[]
    filter: FilterValues

    deleteTodolist: (todolistId: string) => void
    changeTodolistFilter:  (filterValue: FilterValues, todolistId: TodolistType['id']) => void
    changeTodolistTitle : (newtTitle: TodolistType["title"], todolistId: TodolistType["id"])=> void


    deleteTask: (taskId: Task['id'], todolistId: string) => void
    createTask : (title: Task['title'], todolistId: string) => void
    changeTaskStatus:  (taskId: Task['id'], newStatus: Task["isDone"], todolistId: TodolistType['id']) => void;
    changeTaskTitle: (taskId: Task['id'], newTitle: Task["title"], todolistId: TodolistType['id']) => void
}
export type Task = {
    id:string
    title: string
    isDone:boolean
}


export const Todolist = (
    {
        title,
        tasks,
        filter,
        todolistId,

        deleteTask,
        createTask,
        changeTaskStatus,
        changeTaskTitle,

        deleteTodolist,
        changeTodolistFilter,
        changeTodolistTitle,

    }: Props)=> {
    // const title = props.title
    // const tasks = props.tasks
    //деструктуризирующее присваивание
    //const {title: title, tasks: tasks} = props
    //const {title, tasks} = props


    // const inputRef = useRef<HTMLInputElement>(null);


    const tasksList = tasks.length === 0
     ? <span> Your tasklist is empty</span>
     :  <ul>
            {tasks.map(task => {
                const changeTaskTitleHandler = (newTitle: Task["title"]) => {
                    changeTaskTitle(task.id, newTitle, todolistId)
                }
                const deleteTaskOnClickHandler = () => deleteTask(task.id, todolistId);
                return(
                    <li key={task.id} >
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                        />
                        <EditableSpan title={task.title}
                                      changeItemTitle={changeTaskTitleHandler}
                                      classes={task.isDone ? "task-done" : "task"}/>
                        <Button title={'x'} onClickHandler={deleteTaskOnClickHandler}/>
                    </li>
                )
            })}
        </ul>

    // Функция создания таски
    const createTaskHandler = (taskTitle: string) => {
            createTask(taskTitle, todolistId)
    }

    //функция изменения заголовка тудулиста
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    return (
        <div className="todolist">
            <div>
                <h3>
                    <EditableSpan
                        title={title}
                        changeItemTitle={changeTodolistTitleHandler}
                    />
                    <Button title="x" onClickHandler={() => deleteTodolist(todolistId)}/>
                </h3>
                <CreateItemForm createItem={createTaskHandler} itemTitleLength={15}/>
                {tasksList}
                <div>
                    <Button title={"All"}
                            onClickHandler={()=> changeTodolistFilter("all", todolistId)}
                            className={filter === "all" ? "btn-filter-active" : ""}
                    />
                    <Button title={"Active"}
                            onClickHandler={()=> changeTodolistFilter("active", todolistId)}
                            className={filter === "active" ? "btn-filter-active" : ""}
                    />
                    <Button title={"Completed"}
                            onClickHandler={()=> changeTodolistFilter("completed", todolistId)}
                            className={filter === "completed" ? "btn-filter-active" : ""}
                    />
                </div>
            </div>
        </div>
    )
}
