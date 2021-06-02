import React, { createContext, useReducer} from "react";
import * as alasql from 'alasql'

const initialState = {
    schema: {},
    results: [{data: [], columns: []}]
}

export const store = createContext(initialState);

const { Provider } = store;

function updateSchema(currentState){
    currentState.schema = {}
    const table_list = Object.keys(alasql.tables);
    table_list.forEach((tb) => {
        let columns = []
        alasql.tables[tb].columns.forEach((col) => {
        columns.push({field: col.columnid, title: col.columnid})
        })
        currentState.schema[tb] = {name: tb, columns }
        console.log(currentState.schema)
    })
}

const DbProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        let currentState = { ...state };
        switch (action.type) {
            case "QUERY":
            // Executing a query
                try {
                    let result = alasql(`${action.params}`);
                    console.log(result)
                    let columns = []
                    Object.keys(result[0]).forEach((col) => {
                    columns.push({field: col, title: col})
                    })
                    let result_tab = action.result_tab || 0
                    currentState.results[result_tab].data = result
                    currentState.results[result_tab].columns = columns
                }
                catch(err){
                    console.log('it broke...')
                    console.log(err)
                }
                updateSchema(currentState);
                return currentState;
            case "CREATE":
                // Add a new table
                if(!Object.keys(currentState.schema).includes(action.table)){
                    let columns = Object.keys(action.data[0])
                    
                    let table = alasql(`CREATE TABLE IF NOT EXISTS ${action.table} (${columns.join(',')})`);
                    console.log(table)
                    if(table === 1){
                    // For some reason alasql has a hard time with new line characters, remove those!
                    action.data.map((row) => {
                        for(const key in row){
                            if(row[key].includes('\n')){
                                row[key] = row[key].replace(/\n/g, '... ')
                            }
                        }
                    })
                    console.log(action.data)
                    alasql(`INSERT INTO ${action.table} SELECT * FROM  ?`, [action.data]);
                    }
                    else if(table === 0){
                        // alert('Could not create table... It may already exist, please try a new name.')
                    }
                    let csv_uploader = document.querySelectorAll('.csv-input');
                    Array.from(csv_uploader).forEach(csv => {
                        csv.value = ""
                    })
                    let upload_table_name_field = document.querySelector('#upload_table_name')
                    upload_table_name_field.value = "";
                }
                updateSchema(currentState);
                return currentState;
            case "UPDATE":
            // Update table with data
            return currentState;     
            case "DELETE FROM":
            // Delete a row from table
            return currentState;
            case "DELETE":
            // Delete a table
            return currentState;
            default:
                throw new Error("State Not Found")
            
        }
    }, initialState);
    return <Provider value={{state, dispatch}}>{children}</Provider>;
}

export { DbProvider as default }