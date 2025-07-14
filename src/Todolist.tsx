import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";
// import {useRef} from "react";

type Props = {
    todolistId: string;
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTodolist: (todolistId: string) => void;
    deleteTask: (taskId: Task['id'], todolistId: string) => void
    changeTodolistFilter:  (filterValue: FilterValues, todolistId: string) => void
    createTask : (title: string, todolistId: string) => void;
    changeTaskStatus:  (taskId: Task['id'], newStatus: Task["isDone"], todolistId: string) => void;
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
        deleteTodolist,
        changeTodolistFilter,
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
                const deleteTaskOnClickHandler = () => deleteTask(task.id, todolistId);
                return(
                    <li key={task.id} >
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
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
            createTask(trimmedTitle, todolistId)
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
                <h3>
                    {title}
                    <Button title="x" onClickHandler={() => deleteTodolist(todolistId)}/>
                </h3>
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
                        }/>
                    {taskTitle && taskTitle.length <= 15 && <div>rest {15-taskTitle.length} charters</div>}
                    {taskTitle && taskTitle.length > 15 && <div style={{color: "red"}}>title is too long</div>}
                    {error && <div style={{color: "red"}}>Enter valid Title</div>}
                </div>
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
