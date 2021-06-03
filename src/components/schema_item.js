import React, { useContext } from 'react';
import { store } from '../providers/db_provider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

function SchemaItem({table, columns=[]}){
    const { dispatch } = useContext(store);
    return (
      <Accordion >
      <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      >
      <Typography >
        <IconButton aria-label="delete" onClick={()=>{
          dispatch({
            type: 'DELETE',
            table
          });
        }}>
          <DeleteForeverIcon/>
        </IconButton>
        {table}
      </Typography>
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