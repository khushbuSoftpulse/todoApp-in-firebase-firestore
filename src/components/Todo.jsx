import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase'

const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [updateId, setUpdateId] = useState()

    const addTodo = async (e) => {
        if(todo===""){
            alert("Cannot add empty todo")
            return false
        }
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "todos"), {
                todo: todo,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        fetchPost();
    }

    const fetchPost = async () => {
        await getDocs(collection(db, "todos"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setTodos(newData);
            })
    }
    const updateTodo = async () => {
        if(updateId===undefined){
            alert("select a document to update")
            return false
        }
        const data = {
            todo: todo
        }
        await setDoc(doc(db, "todos", updateId), data, { merge: true })
        fetchPost()
    }
    const deleteTodo = async (id) => {
        if(window.confirm("Are you sure want to delete?")){
            await deleteDoc(doc(db, "todos", id))
            fetchPost();
        }
    }
    useEffect(() => {
        fetchPost();
    }, [])
    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">
                    Todo-App
                </h1>
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="What do you have to do today?"
                            onChange={(e) => setTodo(e.target.value)}
                            value={todo}
                        />
                    </div>
                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={addTodo}
                        >
                            Submit
                        </button>
                        <button type="button"
                            className="btn"
                            onClick={() => updateTodo()}>
                            Update
                        </button>
                    </div>
                </div>
                <div className="todo-content">
                    <table border={2}>
                        <thead>
                        <tr>
                            <th>Todo</th>
                            <th>id</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            todos?.map((todo, i) => (
                                <tr key={i}>
                                    <td>{todo.id}</td>
                                    <td>{todo.todo}</td>
                                    <td>{todo.status}</td>
                                    <td><button onClick={() => {
                                        setUpdateId(todo.id)
                                        setTodo(todos[i].todo)
                                    }}>Update</button></td>
                                    <td><button onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                        </tbody>     
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Todo