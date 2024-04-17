import React, { useState } from "react";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid"


const Input = ( {setTodos} ) => {
const [inputValue, setInputValue] = useState("");

    function clickHandler(e) {
        e.preventDefault();
        const todo = { id: uuidv4(), inputValue, completed: false }
        setTodos((prev => [...prev, todo]))
    }

    return (
        <form className="new-todo">
            <input 
            type="text" 
            placeholder="Type a new to-do"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={clickHandler} type="submit">Add To-Do</button>
        </form>
    )
}
Input.propTypes = {
    setTodos: PropTypes.func,
    todo: PropTypes.object
  };
export default Input;