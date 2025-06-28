import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";

//CRUD
export type FilterValues = "all" | "active" | "completed";

function App() {
    // Data
    const todolistTitle1 = "What to learn"


    let [tasks, setTask] = useState<Task[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false }
    ])


    const deleteTask = (taskId: Task['id']) => {
        const nextState: Task[] = tasks.filter((t) => t.id !== taskId)
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
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
              />
      </div>
  )
}

export default App
