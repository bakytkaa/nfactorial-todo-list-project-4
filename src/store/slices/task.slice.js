import { createSlice } from "@reduxjs/toolkit";
import { createTask, randomString } from "../../utils.js";

const initialState = {
  tasks: [
    {
      id: randomString(),
      text: "Write Essay",
      done: false,
      trashed: false,
    },
    {
      id: randomString(),
      text: "One Hour CSS Course Online",
      done: true,
      trashed: false,
    },
    {
      id: randomString(),
      text: "Buy One Way Tickets to San Fransico",
      done: false,
      trashed: false,
    },
    {
      id: randomString(),
      text: "Buy Groceries",
      done: false,
      trashed: true,
    },
  ],
};

const localStorageTasks = localStorage.getItem("tasks");

if (localStorageTasks) {
  initialState.tasks = JSON.parse(localStorageTasks);
}

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks = [createTask(action.payload), ...state.tasks];
    },
    toggleDoneTask: (state, action) => {
      const taskID = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (taskID === task.id) {
          task.done = !task.done;
        }

        return task;
      });
    },
    deteteTask: (state, action) => {
      const taskID = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (taskID === task.id) {
          task.trashed = true;
        }

        return task;
      });
    },
    deteteForeverTask: (state, action) => {
      const taskID = action.payload;

      state.tasks = state.tasks.filter((task) => task.id !== taskID);
    },
    moveBackToToDo: (state, action) => {
      const taskID = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (taskID === task.id) {
          task.done = false;
          task.trashed = false;
        }

        return task;
      });
    },
  },
});

export const {
  addTask,
  setTasks,
  toggleDoneTask,
  deteteTask,
  deteteForeverTask,
  moveBackToToDo,
} = taskSlice.actions;

export default taskSlice.reducer;
