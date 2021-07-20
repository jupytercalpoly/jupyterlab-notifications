import React, { useState } from 'react';
import ActionAccordion from './ActionAccordion';

export function TodoCenter() {
  let [textInput, setText] = useState("");
  let [tasks, setTasks] = useState<string[]>([]);

  let handleChange = (e: any): void => {
    setText(e.target.value);
  };

  let handleSubmit = (e: any): void => {
    e.preventDefault();
    setTasks([...tasks, textInput]);
    e.target.reset();
  };

  return (
    <div>
      <div>
        {/* TODO: change i (list index) to unique id to avoid bugs */}
        {tasks.map((msg, i) => ( 
          <React.Fragment key={i}>
            <div>
              <ActionAccordion subtasks={[]} task={msg} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <input type="text" placeholder="+ Add Task" onChange={handleChange} />
          {/* <OutlinedTextField /> */}
          {/* <button type="submit">+ Add Task</button> */}
        </form>
      </div>
    </div>
  );
}
