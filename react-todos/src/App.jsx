import './App.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import CssBaseLine from '@mui/material/CssBaseline'
import ToDoList from './ToDoList'
import NavBar from './NavBar';

function App() {

  return (
    <>
      <CssBaseLine />
        <NavBar />
        <ToDoList sx={{margin: "0px auto"}}/>
    </>
  )
}

export default App
