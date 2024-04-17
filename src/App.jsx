import React, { useState, useEffect } from "react";
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import Header from './header'
import Input from './input'
import List from './list'

const LSKEY = "MyTodoApp";

function App() {
  const storedTodos = JSON.parse(localStorage.getItem(LSKEY + ".todos"));
  /* const initialTodos = ["Learn React", "Be awesome", "Take a nap"]; */
  const selectTodos = storedTodos ? storedTodos : []
  
  const [todos, setTodos] = useState(selectTodos);

  useEffect(() => {
    window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Header />
      <Input setTodos={setTodos}/>
      <List todos={todos} setTodos={setTodos}/>
    </>
  )
}

export default App
