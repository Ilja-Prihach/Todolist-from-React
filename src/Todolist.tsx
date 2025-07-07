import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";
// import {useRef} from "react";

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: Task['id']) => void
    changeFilter:  (filterValue: FilterValues) => void
    createTask : (title: string) => void;
    changeTaskStatus:  (taskId: Task['id'], newStatus: Task["isDone"]) => void;
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
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
    }: Props)=> {
    // const title = props.title
    // const tasks = props.tasks
    //деструктуризирующее присваивание
    //const {title: title, tasks: tasks} = props
    //const {title, tasks} = props


    // const inputRef = useRef<HTMLInputElement>(null);

    // Локальный стейт для input
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState(false);

    const tasksList = tasks.length === 0
     ? <span> Your tasklist is empty</span>
     :  <ul>
            {tasks.map(task => {
                const deleteTaskOnClickHandler = () => deleteTask(task.id)
                return(
                    <li key={task.id} >
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                        />
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button title={'x'} onClickHandler={deleteTaskOnClickHandler}/>
                    </li>
                )
            })}
        </ul>

    // Функция создания таски
    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle("")
    }

    //Ввод в input значения title
    const onChangeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }


    // функция добавлен таски
    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && isAddTaskPossible) {
            createTaskHandler()
        }}
    // Условия добавления таски, первичная валидация
    const isAddTaskPossible = taskTitle !== "" && taskTitle.length <= 15


    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle}
                        onChange={onChangeTaskTitleHandler}
                        onKeyDown={onKeyDownCreateTaskHandler}
                        placeholder="max 15 charters"
                        className={error ? "input-error" : ""}
                        // ref={inputRef}
                    />
                    <Button title={"+"}
                            disabled={!isAddTaskPossible}
                            onClickHandler={
                                createTaskHandler
                            //     через useRef
                            // if (inputRef.current){
                            //     inputRef.current.value && createTask(inputRef.current.value)
                            //     inputRef.current.value = ""
                            // }
                        }/>
                    {taskTitle && taskTitle.length <= 15 && <div>rest {15-taskTitle.length} charters</div>}
                    {taskTitle && taskTitle.length > 15 && <div style={{color: "red"}}>title is too long</div>}
                    {error && <div style={{color: "red"}}>Enter valid Title</div>}
                </div>
                {tasksList}
                <div>
                    <Button title={"All"}
                            onClickHandler={()=> changeFilter("all")}
                            className={filter === "all" ? "btn-filter-active" : ""}
                    />
                    <Button title={"Active"}
                            onClickHandler={()=> changeFilter("active")}
                            className={filter === "active" ? "btn-filter-active" : ""}
                    />
                    <Button title={"Completed"}
                            onClickHandler={()=> changeFilter("completed")}
                            className={filter === "completed" ? "btn-filter-active" : ""}
                    />
                </div>
            </div>
        </div>
    )
}
