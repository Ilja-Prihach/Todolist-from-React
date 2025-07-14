import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

//CRUD
export type FilterValues = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

type TasksState = {
    [todolistId: string]: Task[]
}

function App() {
    // Dataconst

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to lern", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"}
    ]);



    // const todolistTitle1 = "What to learn"

    let [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: false },
            { id: v1(), title: 'JS', isDone: false },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false }
        ],
        [todolistId_2]: [
            { id: v1(), title: 'Milk', isDone: false },
            { id: v1(), title: 'Bread', isDone: false },
            { id: v1(), title: 'Beer', isDone: false },
            { id: v1(), title: 'Potato', isDone: false },
            { id: v1(), title: 'Cheese', isDone: false }
        ]
    }
)

    //delete
    const deleteTask = (taskId: Task['id'], todolistId: string) => {
        //1.Иммутабельно
        //2. Для обновления стейта используется setState
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    // create
    const createTask = (title: string, todolistId: string) => {
        const newTask: Task = {id:v1(), title, isDone:false}
        const newTasks = [...tasks[todolistId],  newTask]
        setTasks({...tasks, [todolistId]: newTasks})

    }
  //   create(update) status task
    const changeTaskStatus = (taskId: Task['id'], newStatus: Task["isDone"], todolistId: string) => {
        const updatedTasks: Task[] = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus } : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
    }

    const changeTodolistFilter = (nextFilter: FilterValues, todolistId: string) => {
        const nextState: TodolistType[] = todolists.map(tl => tl.id === todolistId ? {...tl, filter: nextFilter} : tl)
        setTodolists(nextState)
    }

    const deleteTodolist = ( todolistId: string) => {
        const nextState: TodolistType[] = todolists.filter(t => t.id !== todolistId)
        setTodolists(nextState)
        delete tasks[todolistId]
    }

  //   UI (view)
    const todolistsComponents = todolists.map(tl => {
        let filteredTasks: Task[] = tasks[tl.id]
        if(tl.filter === "active") {
            filteredTasks = filteredTasks.filter((t) => !t.isDone)
        }
        if(tl.filter === "completed") {
            filteredTasks = filteredTasks.filter((t) => t.isDone)
        }
        return(
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                deleteTodolist={deleteTodolist}
                changeTodolistFilter={changeTodolistFilter}

                deleteTask={deleteTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
            />
            )
    })






  return (
      <div className="app">
          {todolistsComponents}
      </div>
  )
}

export default App
