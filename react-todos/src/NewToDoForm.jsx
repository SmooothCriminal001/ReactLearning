/* eslint-disable react/prop-types */
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export default function NewToDoForm({insertItem}){
    const [text, setText] = useState("")

    const handleOnChange = (e) => {
        const todoValue = e.target.value
        setText(todoValue)
    }

    const insertNewToDo = (e) => {
        e.preventDefault()
        insertItem(text)
        setText("")
    }

    return (
        <form onSubmit={insertNewToDo}>
            <TextField
                label="New To-Do"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="add to-do"
                            type="submit"
                        >
                            <Edit />
                        </IconButton>
                    </InputAdornment>,
                }}
                variant="standard"
                onChange={handleOnChange}
                value={text}
            />
        </form>
    )
}