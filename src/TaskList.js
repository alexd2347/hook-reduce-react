import React, { useReducer, useState } from "react";
import "./TaskList.css";

function TaskList() {
    const initialState = {
        tasks: [
            { id: 1, name: "Aprender React", complete: false },
            { id: 2, name: "Practicar React", complete: false },
            { id: 3, name: "Leer un libro sobre JavaScript", complete: false },
            { id: 4, name: "Realizar un proyecto con React", complete: false },
            { id: 5, name: "Tomar un curso sobre CSS Grid", complete: false },
            { id: 6, name: "Investigar sobre las mejores prácticas de UX/UI", complete: false }
        ]

    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_TASK":
                return {
                    tasks: [
                        ...state.tasks,
                        { id: Date.now(), name: action.payload, complete: false }
                    ]
                };
            case "TOGGLE_TASK":
                return {
                    tasks: state.tasks.map(task =>
                        task.id === action.payload
                            ? { ...task, complete: !task.complete }
                            : task
                    )
                };
            case "DELETE_TASK":
                return {
                    tasks: state.tasks.filter(task => task.id !== action.payload)
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [newTask, setNewTask] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (newTask.trim()) {
            dispatch({ type: "ADD_TASK", payload: newTask });
            setNewTask("");
        }
    };

    return (
        <div className="App">
            <h1>Tareas shidas useReducer</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nueva tarea:
                    <input
                        type="text"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                    />
                </label>
                <button type="submit">Agregar tarea</button>
            </form>
            <ul>
                Lista de tareas:
                {state.tasks.map(task => (
                    <li key={task.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.complete}
                                onChange={() =>
                                    dispatch({ type: "TOGGLE_TASK", payload: task.id })
                                }
                            />
                            {task.name}
                        </label>
                        <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
