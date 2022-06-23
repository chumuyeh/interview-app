import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../util/Types';
import { RootState, AppThunk } from './store';

export interface EmployeeState {
  employees: Employee[];
  birthdayEmployees: Employee[];
  isEmployeesInitialized: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  birthdayEmployees: [],
  isEmployeesInitialized: false,
};


export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Set a new value for the full employee list
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    // Add a single employee to the full list
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = [...state.employees, action.payload];
    },
    // Indicate whether or not the app has initialized the csv
    setIsEmployeesInitialized: (state, action: PayloadAction<boolean>) => {
      state.isEmployeesInitialized = action.payload;
    },
    // Set the birthday employees that match the current month
    setBirthdayEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.birthdayEmployees = action.payload;
    },
    // Delete a single row from the employees list
    deleteEmployeeByIndex: (state, action: PayloadAction<number>) => {
      if (action.payload > -1 && action.payload <= state.employees.length) {
        state.employees.splice(action.payload, 1);
      }
    },
  },
});

export const { setEmployees, addEmployee, setIsEmployeesInitialized, setBirthdayEmployees, deleteEmployeeByIndex } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectBirthdayEmployees = (state: RootState) => state.employees.birthdayEmployees;
export const selectIsEmployeesInitialized = (state: RootState) => state.employees.isEmployeesInitialized;

export default employeesSlice.reducer;
