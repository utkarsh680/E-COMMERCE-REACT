import Navbar from "./Navbar";
import styles from "../styles/addData.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskSuccess } from "../Redux/Actions/Action";
function AddData() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.showDataReducer.products);

  const [task, setTask] = useState('')

  const handleAddTask = () => {
    dispatch(addTaskSuccess({text: task}))
    setTask('')
    console.log(task)
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.style}>
        <div className={styles.inStyle}></div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.box}>
          <div className={styles.inBox}>
            <Navbar />
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddData;
