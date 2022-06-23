import Papa from 'papaparse';
import { setEmployees, setIsEmployeesInitialized } from '../redux/EmployeesSlice';
import store from '../redux/store';
import { Employee } from './Types';
import { v4 as uuidv4 } from 'uuid';

export async function parseEmployeesCsv(filePath: string): Promise<Employee[]> {
    const data = await fetch(filePath)
        .then(response => response.text())
        .then(responseText => {
            const data: Papa.ParseResult<string[]> = Papa.parse(responseText);
            console.log(data.data);
            const employees: Employee[] = [];
            for (let employee of data.data) {
                const uuid = uuidv4();
                const newEmployee: Employee = { id: uuidv4(), firstName: employee[0], lastName: employee[1], jobTitle: employee[3], birthday: employee[2] }
                employees.push(newEmployee);
            }
            return employees;
        })
        .catch((error) => {
            return [];
        });
    return data;
}

export async function appInit() {
    const data = await parseEmployeesCsv('./employees.csv');
    if (data?.length > 0) {
        const employees = data.slice(1);
        store.dispatch(setEmployees(employees));
        store.dispatch(setIsEmployeesInitialized(true));
    }
}