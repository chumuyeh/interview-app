import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteEmployeeByIndex, selectEmployees } from '../redux/EmployeesSlice';
import { Employee } from '../util/Types';
import { IconButton, TableContainer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function AllEmployeesTable() {
  const dispatch = useAppDispatch();
  const employees: Employee[] = useAppSelector(selectEmployees);

  return (
    <React.Fragment>
      <Title>Employees</Title>
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead className='table-header'>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell style={{ color: 'gray' }}>{row.firstName}</TableCell>
                <TableCell style={{ color: 'gray' }}>{row.lastName}</TableCell>
                <TableCell style={{ color: 'gray' }}>{row.jobTitle}</TableCell>
                <TableCell style={{ color: 'gray' }}>{row.birthday}</TableCell>
                <TableCell style={{ color: 'gray' }} align="right">
                  <IconButton
                    onClick={() => {
                      console.log(index);
                      dispatch(deleteEmployeeByIndex(index))
                    }}>
                    <DeleteIcon color="primary" />
                  </IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
