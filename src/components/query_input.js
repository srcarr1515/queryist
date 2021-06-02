import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { store } from '../providers/db_provider';

function QueryInput(){
    const [queryInput, setQueryInput] = useState();
    const { state, dispatch } = useContext(store);
    const handleQueryInputChange = (event) => {
      setQueryInput(event.target.value);
    }

    return (
        <div>
        <TextField
          id="outlined-multiline-static"
          label="Query"
          multiline
          rows={10}
          fullWidth={true}
          value={queryInput}
          onChange={handleQueryInputChange}
          variant="outlined"
        />
        <Button variant="outlined" color="primary" onClick={
          () => {
            dispatch({
            type: 'QUERY',
            params: queryInput
            })
          }
          }>Execute Query</Button>
        </div>
    );
}

export default QueryInput