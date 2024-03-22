import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import {
  addTask,
  toggleDoneTask,
  deteteTask,
  deteteForeverTask,
  moveBackToToDo,
} from "./store/slices/task.slice.js";

const filters = [
  {
    name: "To Do",
    func: (task) => !task.done && !task.trashed,
    buttons: [
      {
        label: "Move to Trash",
        func: (task, dispatch) => dispatch(deteteTask(task.id)),
      },
    ],
  },
  {
    name: "Done",
    func: (task) => task.done && !task.trashed,
    buttons: [
      {
        label: "Move to Trash",
        func: (task, dispatch) => dispatch(deteteTask(task.id)),
      },
    ],
  },
  {
    name: "Trash",
    func: (task) => task.trashed,
    buttons: [
      {
        label: "Delete Forever",
        func: (task, dispatch) => dispatch(deteteForeverTask(task.id)),
      },
      {
        label: "Move Back To To Do",
        func: (task, dispatch) => dispatch(moveBackToToDo(task.id)),
      },
    ],
  },
];

function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [newTaskText, setNewTaskText] = useState("");

  const todos = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <Header />

      <main className="main">
        <div className="buttons">
          <div className="navigations">
            {filters.map((_filter) => (
              <button
                key={_filter.name}
                className={
                  "filter-button" +
                  (filter.name === _filter.name ? " active" : "")
                }
                onClick={() => setFilter(_filter)}
              >
                {_filter.name}
              </button>
            ))}
          </div>

          <Popup
            trigger={
              <button className="circle-button">
                <span>+</span>
              </button>
            }
            position="left bottom"
          >
            <div className="task-modal">
              <h4>Add New To Do</h4>

              <textarea
                rows="8"
                cols="27"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Your text"
              ></textarea>

              <button
                onClick={() => {
                  if (newTaskText.length) {
                    dispatch(addTask(newTaskText));
                    setNewTaskText("");
                  }
                }}
              >
                Add
              </button>
            </div>
          </Popup>
        </div>

        <div className="name">
          <h2>{filter.name}</h2>
        </div>

        <div className="todo-list">
          {todos.filter(filter.func).length ? (
            todos.filter(filter.func).map((value) => (
              <div key={value.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={value.done}
                  onChange={() => dispatch(toggleDoneTask(value.id))}
                />
                <Popup
                  trigger={
                    <span className={"text " + (value.done ? "done" : "")}>
                      {value.text}
                    </span>
                  }
                  position="bottom left"
                >
                  <div className="task-menu-modal">
                    {filter.buttons.map((actionButtons) => (
                      <button
                        key={actionButtons.label}
                        onClick={() => actionButtons.func(value, dispatch)}
                      >
                        {actionButtons.label}
                      </button>
                    ))}
                  </div>
                </Popup>
              </div>
            ))
          ) : (
            <p>Task empty!</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
