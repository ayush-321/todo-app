import React, { useEffect, useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "./firebase_config";
import TodoListItem from "./Todo";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  //using useEffect to set the state to intial when reload page
  useEffect(() => {
    getTodos();
  }, []); //blank to run only first launch

  //function to show todos
  function getTodos() {
    //onsnapshot updates real time, adds todo realtime unlike get method
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
    //create a hook(usestate) to save list of todos
  }

  //function to add todo
  function addTodo(event) {
    event.preventDefault();

    const x = document.forms["formTodo"]["todo"].value;
    if (x === "") {
      alert("You need to enter some value");
      return false;
    } else {
      //console.log(`you are are adding a todo`);
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
    }

    setTodoInput("");
  }

  return (
    <div className="App">
      <div className="div-two">
        <h1 className="todo-heading">Todo App</h1>
        <form name="formTodo">
          <TextField
            name="todo"
            type="text"
            className="textfield"
            id="standard-basic"
            label="What to do?"
            value={todoInput}
            onChange={(event) => {
              setTodoInput(event.target.value);
              //console.log(`written ${event.target.value}`);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Add Todo
          </Button>
        </form>
        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "1rem" }}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
