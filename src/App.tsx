import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

//CRUD
export type FilterValues = "all" | "active" | "completed";

function App() {
    // Data
    const todolistTitle1 = "What to learn"


    let [tasks, setTask] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: false },
        { id: v1(), title: 'JS', isDone: false },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false }
    ])

    //delete
    const deleteTask = (taskId: Task['id']) => {
        const nextState: Task[] = tasks.filter((t) => t.id !== taskId)
        setTask(nextState)
    }
    // create
    const createTask = (title: string) => {
        const newTask: Task = {id:v1(), title, isDone:false}
        const nextState: Task[] = [...tasks, newTask]
        setTask(nextState)

        // setTask([...tasks, {id:11, title, isDone:false}]) краткий синтаксис
    }
  //   create(update) status task
    const changeTaskStatus = (taskId: Task['id'], newStatus: Task["isDone"]) => {
        const nextState: Task[] = tasks.map(t => t.id === taskId ? {...t, isDone: newStatus } : t)
        setTask(nextState)
    }

  //   UI (view)

    const [filter,  setFilter] = useState<FilterValues>("all")
    let filteredTasks: Task[] = tasks
    if(filter === "active") {
        filteredTasks = filteredTasks.filter((t) => !t.isDone)
    }
    if(filter === "completed") {
        filteredTasks = filteredTasks.filter((t) => t.isDone)
    }

    const changeFilter = (filterValue: FilterValues) => {
        setFilter(filterValue)
    }

  return (
      <div className="app">
              <Todolist
                  title={todolistTitle1}
                  tasks={filteredTasks}
                  filter={filter}
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
                  createTask={createTask}
                  changeTaskStatus={changeTaskStatus}
              />
      </div>
  )
}

export default App
