import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getCurrentMonthName, getCurrentMonthNumber, getMonthNumberFromString } from '../util/DateUtil';
import { useAppSelector } from '../redux/hooks';
import { selectEmployees } from '../redux/EmployeesSlice';
import { csvHeader, Employee } from '../util/Types';
import { TableContainer } from '@mui/material';
import { CSVLink } from 'react-csv';

export default function BirthdaysTable() {
  const employees: Employee[] = useAppSelector(selectEmployees);
  const currentMonth = getCurrentMonthName();

  const birthdayEmployees = React.useMemo(() => {
    const bdayEmployees: Employee[] = [];
    for (let employee of employees) {
      if (getMonthNumberFromString(employee.birthday) === getCurrentMonthNumber()) {
        bdayEmployees.push(employee);
      }
    }
    return bdayEmployees;
  }, [employees])

  const csvData = React.useMemo(() => {
    const data = [];
    for (let employee of birthdayEmployees) {
      data.push([employee.firstName, employee.lastName, employee.jobTitle, employee.birthday]);
    }
    return data;
  }, [birthdayEmployees])

  return (
    <React.Fragment>
      <Title>Aging Employees ({currentMonth})</Title>
      <TableContainer sx={{ height: 350 }}>
        <Table stickyHeader size="small">
          <TableHead className='table-header'>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell align="right">Birthday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {birthdayEmployees.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ color: 'gray' }}>{row.firstName}</TableCell>
                <TableCell style={{ color: 'gray' }}>{row.lastName}</TableCell>
                <TableCell style={{ color: 'gray' }}>{row.jobTitle}</TableCell>
                <TableCell style={{ color: 'gray' }} align="right">{row.birthday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CSVLink data={csvData} headers={csvHeader} filename={currentMonth + "EmployeeBirthdays"}>Download</CSVLink>
    </React.Fragment >
  );
}
