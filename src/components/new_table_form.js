import React, { useState, useContext } from 'react';
import { store } from '../providers/db_provider'
import CSVReader from 'react-csv-reader'

function NewTableForm(){
    const [csvUpload, setCsvUpload] = useState({error: "", table_name: ""});
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
          header
            .toLowerCase()
            .replace(/\W/g, '_')
      }

    const csvTableName = (event) => {
        setCsvUpload({error: "", table_name: event.target.value})
    }
    const { state, dispatch } = useContext(store);

    const uploadComplete = (data, fileInfo) => {
        let field_value = csvUpload.table_name.replace(/\s+/g, '')
        let table = field_value === "" ? fileInfo.name.split('.')[0] : field_value
        dispatch({
            type: 'CREATE',
            data,
            table
        })
        dispatch({
            type: 'QUERY',
            params: `SELECT * FROM ${table} LIMIT 100;`,
        })
        let csv_uploader = document.querySelectorAll('.csv-input');
        Array.from(csv_uploader).forEach(csv => {
            csv.value = ""
        })
        let upload_table_name_field = document.querySelector('#upload_table_name')
        upload_table_name_field.value = "";
      }
      
    

    return (
        <form>
            <h2>Upload CSV</h2>
            <label>Table Name: </label>
            <input id="upload_table_name" onChange={csvTableName} />
            <CSVReader
                cssClass="csv-reader-input"
                label=""
                onFileLoaded={uploadComplete}
                //onError={}
                parserOptions={papaparseOptions}
                inputId=""
                inputName=""
                inputStyle={{color: 'red'}}
            />
        </form>
    );
}

export default NewTableForm