import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: Task['id']) => void
    changeFilter:  (filterValue: FilterValues) => void
}
export type Task = {
    id:number
    title: string
    isDone:boolean
}


export const Todolist = ({title, tasks, deleteTask, changeFilter}: Props)=> {
    // const title = props.title
    // const tasks = props.tasks
    //деструктуризирующее присваивание
    //const {title: title, tasks: tasks} = props
    //const {title, tasks} = props

    // const taskList = tasks.map(task => {
    // return(
    //     <li>
    //         <input type="checkbox" checked={task.isDone}/>
    //         <span>{task.title}</span>
    //     </li>
    //     )
    // })

    const tasksList = tasks.length === 0
     ? <span> Your tasklist is empty</span>
     :  <ul>
            {tasks.map(task => {
                const deleteTaskOnClickHandler = () => deleteTask(task.id)
                return(
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={'x'} onClickHandler={deleteTaskOnClickHandler}/>
                    </li>
                )
            })}
        </ul>


    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title={"+"}/>
                </div>
                {tasksList}
                <div>
                    <Button title={"All"} onClickHandler={()=> changeFilter("all")}/>
                    <Button title={"Active"} onClickHandler={()=> changeFilter("active")}/>
                    <Button title={"Completed"} onClickHandler={()=> changeFilter("completed")}/>
                </div>
            </div>
        </div>
    )
}
