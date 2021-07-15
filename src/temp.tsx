// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Accordion from "@material-ui/core/Accordion";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Box from "@material-ui/core/Box";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// const useStyles = makeStyles(() => ({
//   root: {
//     width: "100%",
//   },
//   expanded: {},
//   content: {
//     "&$expanded": {
//       marginBottom: 0,
//     },
//   },
// }));

// //TODO: decouple elements of the TODO center, consider using something else than Material UI accordion
// export function TodoCenter() {
//   let [taskTextInput, setTaskText] = useState("");
//   let [subtaskTextInput, setSubtaskText] = useState("");
//   let [tasks, setTasks] = useState([]);

//   const classes = useStyles();

//   let handleTaskChange = (e) => {
//     setTaskText(e.target.value);
//   };

//   let handleSubtaskChange = (e) => {
//     setSubtaskText(e.target.value);
//   };

//   let handleTaskSubmit = (e) => {
//     e.preventDefault();
//     setTasks([
//       ...tasks,
//       {
//         task: taskTextInput,
//         id: Date.now(),
//         subtasks: [],
//         done: false,
//       },
//     ]);
//     e.target.reset();
//   };

//   let handleSubtaskSubmit = (e) => {
//     e.preventDefault();
//     let curTasks = [...tasks];
//     let i = curTasks.findIndex((task) => task.id === parseInt(e.target.id));
//     curTasks[i].subtasks.push({
//       subtask: subtaskTextInput,
//       id: Date.now(),
//       parentId: curTasks[i].id,
//       done: false,
//     });
//     setTasks(curTasks);
//     e.target.reset();
//   };

//   //TODO: abstract changing value on the object into separate function
//   let toggleTask = (e) => {
//     let curTasks = [...tasks];
//     let i = curTasks.findIndex((task) => task.id === parseInt(e.target.id));
//     curTasks[i].done = !curTasks[i].done;
//     if (curTasks[i].done) {
//       let t = curTasks.splice(i, 1);
//       t[0].subtasks.map(function (subtask) {
//         subtask.done = true;
//         return subtask;
//       });
//       curTasks.push(t[0]);
//     }
//     setTasks(curTasks);
//   };

//   let toggleSubtask = (e) => {
//     let curTasks = [...tasks];
//     let i = curTasks.findIndex(
//       (task) => task.id === parseInt(e.target.id.split("-")[0])
//     ); //parent id
//     let curSubtasks = [...curTasks[i].subtasks];
//     let j = curSubtasks.findIndex(
//       (subtask) => subtask.id === parseInt(e.target.id.split("-")[1])
//     ); //id
//     curSubtasks[j].done = !curSubtasks[j].done;
//     if (curSubtasks[j].done) {
//       let t = curSubtasks.splice(j, 1);
//       curSubtasks.push(t[0]);
//     }
//     curTasks[i].subtasks = curSubtasks;
//     setTasks(curTasks);
//   };

//   return (
//     <div>
//       <div>
//         {tasks.map((task) => (
//           <div className={classes.root}>
//             {/* bool defaultExpanded below controls default state of accordion */}
//             <Accordion defaultExpanded={true} elevation={0} key={task.id}>
//               <AccordionSummary
//                 classes={{
//                   content: classes.content,
//                   expanded: classes.expanded,
//                 }}
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-label="Expand"
//                 aria-controls="additional-actions1-content"
//                 id="additional-actions1-header"
//               >
//                 <FormControlLabel
//                   aria-label="Acknowledge"
//                   onClick={(event) => event.stopPropagation()}
//                   onFocus={(event) => event.stopPropagation()}
//                   control={
//                     <Checkbox
//                       checked={task.done}
//                       id={task.id}
//                       onChange={toggleTask}
//                     />
//                   }
//                   label={
//                     <div
//                       style={{
//                         textDecoration: task.done ? "line-through" : "none",
//                         color: task.done ? "grey" : "black",
//                       }}
//                     >
//                       {task.task}
//                     </div>
//                   }
//                 />
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography color="textSecondary" component={"span"}>
//                   <Box pl={4}>
//                     {task.subtasks.map((subtask) => (
//                       <div className={classes.root}>
//                         <Accordion defaultExpanded={false} elevation={0}>
//                           <FormControlLabel
//                             aria-label="Acknowledge"
//                             onClick={(event) => event.stopPropagation()}
//                             onFocus={(event) => event.stopPropagation()}
//                             control={
//                               <Checkbox
//                                 checked={subtask.done}
//                                 id={"" + subtask.parentId + "-" + subtask.id}
//                                 onChange={toggleSubtask}
//                               />
//                             }
//                             label={
//                               <div
//                                 style={{
//                                   textDecoration: subtask.done
//                                     ? "line-through"
//                                     : "none",
//                                   color: subtask.done ? "grey" : "black",
//                                 }}
//                               >
//                                 {subtask.subtask}
//                               </div>
//                             }
//                           />
//                         </Accordion>
//                       </div>
//                     ))}
//                     <div>
//                       <form
//                         method="post"
//                         id={task.id}
//                         onSubmit={handleSubtaskSubmit}
//                       >
//                         <input
//                           type="text"
//                           placeholder="+ Add Subtask"
//                           onChange={handleSubtaskChange}
//                         />
//                       </form>
//                     </div>
//                   </Box>
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </div>
//         ))}
//       </div>
//       <div>
//         <form method="post" onSubmit={handleTaskSubmit}>
//           <input
//             type="text"
//             placeholder="+ Add Task"
//             onChange={handleTaskChange}
//           />
//           {/* <OutlinedTextField /> */}
//           {/* <button type="submit">+ Add Task</button> */}
//         </form>
//       </div>
//     </div>
//   );
// }
