import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { store } from '../providers/db_provider';
import SchemaItem from './schema_item'

function SchemaList(){
    const { state } = useContext(store);

    return (
        <div>
           <Typography variant="h5">Schema</Typography>
           {Object.keys(state.schema).map((tbl) => {return <SchemaItem table={tbl} columns={state.schema[tbl].columns}></SchemaItem>})}
        </div>
        
    )
}
export default SchemaList;
