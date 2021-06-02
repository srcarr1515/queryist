import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function SchemaItem({table, columns=[]}){
    return (
      <Accordion >
      <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      >
      <Typography >{table}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <ul style={{width: '300px'}}>
            {columns.map((col) => <li>{col.title}</li>)}
          </ul>
        </Typography>
      </AccordionDetails>
  </Accordion> )
}
export default SchemaItem;