import React, { useEffect, useState } from 'react'

const TodoList = () => {

     const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTasks] = useState("");

    function handleInputChange(e) {
       
       setNewTasks(e.target.value)
    }
    
    function addTask() {

       if(newTask.trim() !== ""){
       setTasks(t => [...t, newTask]);
       setNewTasks("");
       }
    }

    function deleteTask(index) {
       const updatedTasks = tasks.filter((element,i) => i !== index);
       setTasks(updatedTasks)
    }

    function moveTaskUp(index) {
      if(index > 0) {
        const updatedTasks = [...tasks];
        [updatedTasks[index-1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index-1]];
        setTasks(updatedTasks)
      }
    }

    function moveTaskDown() {
       if(index < tasks.length()) {
         const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
        setTasks(updatedTasks)
       }
    }

    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="to-do-list">

        <h1>To-Do-List</h1>

        <div>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange}/>
            <button
                className="add-button"
                onClick={addTask}>
                Add
            </button>
        </div>
        <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    <span className="text">{task}</span>
                    <button
                        className="delete-button"
                        onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskUp(index)}>
                        ☝
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskDown(index)}>
                        👇
                    </button>
                </li>
            )}
        </ol>
    </div>
  )
}

export default TodoList