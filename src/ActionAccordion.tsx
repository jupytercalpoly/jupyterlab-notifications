import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TaskAccordion from './TaskAccordion';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ActionsAccordion(props: any) {
  const classes = useStyles();
  let [textInput, setText] = useState("");
  let [subtasks, setSubtasks] = useState<string[]>([]);

  let handleChange = (e: any) => {
    setText(e.target.value);
  };

  let handleSubmit = (e: any) => {
    e.preventDefault();
    setSubtasks([...subtasks, textInput]);
    e.target.reset();
  };

  return (
    <div className={classes.root}>
      {/* bool defaultExpanded below controls default state of accordion */}  
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={props.task}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            <div>
              <div>
                {/* TODO: change i (list index) to unique id to avoid bugs */}
                {subtasks.map((subtsk, i) => ( 
                  <React.Fragment key={i}>
                    <div>
                      <TaskAccordion subtask={subtsk} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div>
                <form method="post" onSubmit={handleSubmit}>
                  <input type="text" placeholder="+ Add Subtask" onChange={handleChange} />
                  {/* <OutlinedTextField /> */}
                  {/* <button type="submit">+ Add Subtask</button> */}
                </form>
              </div>
            </div>            
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}