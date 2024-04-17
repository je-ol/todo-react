import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import editIcon from "./images/edit.png"
import deleteIcon from "./images/delete.png"
const LSKEY = "MyTodoApp";

const List = ({ todos, setTodos }) => {    
    const deleteTodo = (index, text) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
        const updatedTodos = isConfirmed ? todos.filter((_, idx) => idx !== index) : [...todos];
        updatedTodos && setTodos(updatedTodos);

        isConfirmed && localStorage.removeItem(LSKEY + "." + text)
        forceReload()
    }
    const forceReload = () => {
        window.location.reload(true);
      };

    return (
        <main>
            <ul>
                {todos.map((todo, index) => (
                <li key={ index } id={todo.id} >
                    <Item todoM={todo} text={ todo.inputValue } index={index} deleteTodo={deleteTodo} />
                </li>
                ))}
            </ul>
        </main>
    )
}

const Item = ({ todoM, text, index, deleteTodo }) => {
    const [todoText, setTodoText] = useState(text);
    const [isDone, setIsDone] = useState(todoM.completed || false);

    const updateIsDoneInStorage = async () => {
        try {
            const todos = JSON.parse(localStorage.getItem(LSKEY + ".todos")) || [];
            const todoIndex = todos.findIndex(todo => todo.id === todoM.id);

            if (todoIndex !== -1) {
                todos[todoIndex].completed = isDone;
                localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
            } else {
                console.warn("Todo with ID not found in localStorage:", todoM.id);
            }
        } catch (error) {
            console.error("Error updating localStorage:", error);
        }
    };

    const updateTextInStorage = async (newTodo) => {
        try {
            const todos = JSON.parse(localStorage.getItem(LSKEY + ".todos")) || [];
            const todoIndex = todos.findIndex(todo => todo.id === todoM.id);

            if (todoIndex !== -1) {
                todos[todoIndex].inputValue = newTodo;
                localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
            } else {
                console.warn("Todo with ID not found in localStorage:", todoM.id);
            }
        } catch (error) {
            console.error("Error updating localStorage:", error);
        }
    };

    const toggleDone = () => {
        const newIsDone = !isDone;
        setIsDone(newIsDone);
        updateIsDoneInStorage(newIsDone); // Pass the newIsDone value
    };

    const editTodo = () => {
        const newTodo = window.prompt("Enter the new text:", todoText);
        if (newTodo !== null) {
            updateTextInStorage(newTodo); // Pass the newTodo value
            setTodoText(newTodo);
        }
    };

    useEffect(() => {
        updateIsDoneInStorage();
    }, [isDone]);

    useEffect(() => {
        updateTextInStorage(todoText); // Pass the todoText value
    }, [todoText]);

    const styles = { backgroundColor: isDone ? "#84A59D" : "#F28482"};

    return (
        <div style={styles}>
            <label>
                <input 
                    className="checkbox"
                    type="checkbox"
                    checked={isDone}
                    onChange={toggleDone}
                />
                <h3>{todoText}</h3>
            </label>
            <img src={editIcon} onClick={editTodo} alt="Edit"/>
            <img src={deleteIcon} onClick={() => deleteTodo(index, text)} alt="Delete"/>
        </div>
    );
};


Item.propTypes = {
    text: PropTypes.string,
    index: PropTypes.number,
    deleteTodo: PropTypes.func,
    todoM: PropTypes.object
  };
List.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func,
    deleteTodo: PropTypes.func,
    index: PropTypes.number
  };

export default List    




/* const storedIsDone = JSON.parse(localStorage.getItem(LSKEY + "." + text)) || false;
    
const [isDone, setIsDone] = useState(storedIsDone);
    // Save isDone state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem(LSKEY + "." + text, JSON.stringify(isDone));
    }, [isDone, text]); */
