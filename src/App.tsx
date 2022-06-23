import { useEffect } from 'react';
import './App.css';
import Dashboard from './mui/Dashboard';
import { selectEmployees, selectIsEmployeesInitialized } from './redux/EmployeesSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { appInit } from './util/CSVUtil';

function App() {
  const dispatch = useAppDispatch();
  const isEmployeesInitialized: boolean = useAppSelector(selectIsEmployeesInitialized);

  const employees = useAppSelector(selectEmployees);


  useEffect(() => {
    if (!isEmployeesInitialized) {
      appInit();
    }
  }, [isEmployeesInitialized]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Dashboard />
    </div>
  );
}

export default App;
