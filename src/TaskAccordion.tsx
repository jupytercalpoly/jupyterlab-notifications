import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function TaskAccordion(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* bool defaultExpanded below controls default state of accordion */}  
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={props.subtask}
          />
        </AccordionSummary>
      </Accordion>
    </div>
  );
}