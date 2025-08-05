import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, CssBaseline, Grid, Paper} from "@mui/material";
import {NavButton} from "./NavButton.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import {blue, green, grey, orange} from "@mui/material/colors";
import Switch from '@mui/material/Switch';
import {amber, teal} from "@mui/material/colors";
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolist-reducer.ts";

//CRUD
export type FilterValues = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [todolistId: string]: Task[]
}

function App() {
    // Dataconst

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    // const [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistId_1, title: "What to lern", filter: "all"},
    //     {id: todolistId_2, title: "What to buy", filter: "all"}
    // ]);

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "What to lern", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"}
    ]);


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
    const deleteTask = (taskId: Task['id'], todolistId: TodolistType["id"]) => {
        //1.Иммутабельно
        //2. Для обновления стейта используется setState
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    // create
    const createTask = (title: Task["title"], todolistId: TodolistType["id"]) => {
        const newTask: Task = {id:v1(), title, isDone:false}
        const newTasks = [...tasks[todolistId],  newTask]
        setTasks({...tasks, [todolistId]: newTasks})

    }
  //   create(update) status task
    const changeTaskStatus = (taskId: Task['id'], newStatus: Task["isDone"], todolistId: string) => {
        const updatedTasks: Task[] = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus } : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
    }
//  update task title
    const changeTaskTitle = (taskId: Task['id'], newTitle: Task["title"], todolistId: string) => {
        const updatedTasks: Task[] = tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle } : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
    }


    const changeTodolistFilter = (newFilter: FilterValues, todolistId: TodolistType["id"]) => {
        // const nextState: TodolistType[] = todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilter} : tl)
        // setTodolists(nextState)
        const action = changeTodolistFilterAC({id: todolistId, filter: newFilter})
        dispatchTodolists(action)
    }
    //update Todolist title
    const changeTodolistTitle = (newTitle: TodolistType["title"], todolistId: TodolistType["id"]) => {
        // const nextState: TodolistType[] = todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)
        // setTodolists(nextState)
        const action = changeTodolistTitleAC({id: todolistId, title : newTitle})
        dispatchTodolists(action)
    }

    const deleteTodolist = ( todolistId: TodolistType["id"]) => {
        // const nextState: TodolistType[] = todolists.filter(t => t.id !== todolistId)
        // setTodolists(nextState)
        const action = deleteTodolistAC(todolistId)
        dispatchTodolists(action)
        // dispatchToTask
        delete tasks[todolistId]
    }

    //Функция  добавления Todolist нового
    const createTodolist = (todolistTitle: TodolistType["title"]) => {
        // const todolistId = v1()
        // const newTodolist: TodolistType = {
        //     id: todolistId,
        //     title: todolistTitle,
        //     filter: "all"
        // }
        // setTodolists([...todolists, newTodolist])
        const action = createTodolistAC(todolistTitle)
        dispatchTodolists(action)
        // dispatchToTasks(action)
        setTasks({...tasks, [action.payload.id]: []})
    }


  //   UI (view)
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const theme = createTheme(
        {
            palette: {
                primary: teal,
                secondary: amber,
                mode: isDarkMode ? "dark" : "light"
            },
        }
    )


    const todolistsComponents = todolists.map(tl => {
        let filteredTasks: Task[] = tasks[tl.id]
        if(tl.filter === "active") {
            filteredTasks = filteredTasks.filter((t) => !t.isDone)
        }
        if(tl.filter === "completed") {
            filteredTasks = filteredTasks.filter((t) => t.isDone)
        }
        return(
            <Grid key={tl.id}>
                <Paper sx={{p: "15px"}}
                    elevation={6}
                >
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}

                        deleteTodolist={deleteTodolist}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTodolistTitle={changeTodolistTitle}

                        deleteTask={deleteTask}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>

            )
    })



  return (
      <div className="app">
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <AppBar position="static">
                  <Toolbar sx={{justifyContent: "space-between"}}>
                      <IconButton color="inherit">
                          <MenuIcon />
                      </IconButton>
                      <Box>
                          <NavButton>Sign in</NavButton>
                          <NavButton>Sign out</NavButton>
                          <NavButton background={theme.palette.secondary.main}>FAQ</NavButton>
                          <Switch onChange={() => setDarkMode(!isDarkMode)}/>
                      </Box>
                  </Toolbar>
              </AppBar>
              <Container maxWidth={"lg"}>
                  <Grid container sx={{padding: "15px", justifyContent: "center"}}>
                      <CreateItemForm createItem={createTodolist} itemTitleLength={20}/>
                  </Grid>
                  <Grid container spacing={3}>
                      {todolistsComponents}
                  </Grid>

              </Container>
          </ThemeProvider>



      </div>
  )
}

export default App
