import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import QueryInput from './components/query_input'
import QueryResult from './components/query_result'
import NewTableForm from './components/new_table_form'
import DbProvider, { store } from './providers/db_provider'
import SchemaList from './components/schema_list'


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <DbProvider>
        <CssBaseline />
        <div className="App">
          <div className="app-row">
            <div className="app-col">
              <SchemaList />
            </div>
            <div className="app-col app-main">
              <NewTableForm />
              <QueryInput />
              <QueryResult />
            </div>
          </div>
        </div>
      </DbProvider>
    </ThemeProvider>
  );
}

export default App;
