import { useEffect } from 'react';
import './App.css';
import Dashboard from './mui/Dashboard';
import { selectIsEmployeesInitialized } from './redux/EmployeesSlice';
import { useAppSelector } from './redux/hooks';
import { appInit } from './util/CSVUtil';

function App() {
  const isEmployeesInitialized: boolean = useAppSelector(selectIsEmployeesInitialized);

  useEffect(() => {
    if (!isEmployeesInitialized) {
      appInit();
    }
  }, [isEmployeesInitialized]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
