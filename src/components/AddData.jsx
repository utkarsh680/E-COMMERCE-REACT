import Navbar from "./Navbar";
import styles from "../styles/addData.module.css";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskSuccess } from "../Redux/Actions/Action";

import { v4 as uuidv4 } from 'uuid';
 
function AddData() {
  const dispatch = useDispatch();
  const data = useSelector((state) =>
   state.showDataReducer.products);
   console.log(data)

  const [name, setName] = useState('')

  const id = uuidv4();
  
  const handleAddTask = () => {
    const items = {
      id, 
      name
    }
    console.log(items)
    dispatch(addTaskSuccess({items}))
    setName('')
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              key={data.id}
            />
            <button onClick={handleAddTask}>Add Task</button> 
            {name}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddData;
