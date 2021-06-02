import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import { store } from '../providers/db_provider';

function QueryResult(){
    const { state } = useContext(store);
    return (
        <div>
        <h2>Query Output</h2>
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
            columns={state.results[0].columns}
            data={state.results[0].data}
            title={'Query'}
            options={
                {
                    exportButton: true,
                    exportAllData: true
                }
            }
        />
        </div>
        </div>
    );
}

export default QueryResult