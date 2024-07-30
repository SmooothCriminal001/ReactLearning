import { useState, useEffect } from "react"
import List from '@mui/material/List';
import ToDoItem from "./ToDoItem"
import { Box, ListItem, Typography } from "@mui/material";
import NewToDoForm from "./NewToDoForm";

const KEY_toDoList = 'toDoList'

const getToDos = () => {
    const existingToDos = localStorage.getItem(KEY_toDoList)
    if(!existingToDos){
        return []
    }
    return JSON.parse(existingToDos)
}

export default function ToDoList(){

    const toggleToDo = (todo) => {
        setToDoList(previousList => {
            return previousList.map(eachTodo => {
                if(eachTodo.id == todo.id){
                    return {...eachTodo, completed: !eachTodo.completed}
                }
                else{
                    return eachTodo
                }
            })
        })
    }

    const deleteToDo = (todo) => {
        setToDoList(previousList => previousList.filter(eachTodo => eachTodo.id !== todo.id))
    }

    const insertNewToDo = (text) => {
        setToDoList(previousList => [...previousList, { text: text, id: crypto.randomUUID(), completed: false}])
    }

    const [toDoList, setToDoList] = useState(getToDos)

    useEffect(() => {
        if(toDoList){
            localStorage.setItem(KEY_toDoList, JSON.stringify(toDoList));
        }
    }, [toDoList])

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 5
        }}>
            <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
                To-Dos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                
                <ListItem>
                    <NewToDoForm insertItem={insertNewToDo}/>
                </ListItem>

                {toDoList.map(eachToDo => (
                    <ToDoItem 
                        key={eachToDo.id} 
                        todo={eachToDo} 
                        toggle={() => toggleToDo(eachToDo)}
                        deleteItem={() => deleteToDo(eachToDo)}
                    />
                ))}
            </List>
        </Box>
    )
}