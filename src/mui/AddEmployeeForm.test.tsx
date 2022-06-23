import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import AddEmployeeForm from './AddEmployeeForm';
import { selectEmployees } from '../redux/EmployeesSlice';
import { EnhancedStore } from '@reduxjs/toolkit';
import { initStore } from '../redux/store';

describe('AddEmployeeForm tests', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = initStore();
  })
  it('renders without error', () => {
    const component = render(<Provider store={store}><AddEmployeeForm /></Provider>);

    expect(component.container.innerHTML).toBeTruthy();
    expect(component.container.innerHTML).toContain('Add New Employee');
    expect(component.container.innerHTML).toContain('First Name');
    expect(component.container.innerHTML).toContain('Last Name');
    expect(component.container.innerHTML).toContain('Job Title');
    expect(component.container.innerHTML).toContain('Birthday');
  });


  it('submits the valid inputs', () => {
    const firstNameTestValue = "TestFirstName";
    const lastNameTestValue = "TestLastName";
    const jobTitleTestValue = "TestJobTitle";
    const component = render(<Provider store={store}><AddEmployeeForm /></Provider>);

    const firstNameInput = component.getByTestId('firstName');
    const lastNameInput = component.getByTestId('lastName');
    const jobTitleInput = component.getByTestId('jobTitle');
    fireEvent.change(firstNameInput, { target: { value: firstNameTestValue } });
    fireEvent.change(lastNameInput, { target: { value: lastNameTestValue } });
    fireEvent.change(jobTitleInput, { target: { value: jobTitleTestValue } });
    expect(component.container.innerHTML).toContain(firstNameTestValue);
    expect(component.container.innerHTML).toContain(lastNameTestValue);
    expect(component.container.innerHTML).toContain(jobTitleTestValue);

    const submitButton = component.getByTestId('submitButton');
    fireEvent.click(submitButton);
    const employees = selectEmployees(store.getState());
    expect(employees.length).toEqual(1);
    expect(employees[0].firstName).toEqual(firstNameTestValue);
    expect(employees[0].lastName).toEqual(lastNameTestValue);
    expect(employees[0].jobTitle).toEqual(jobTitleTestValue);
  });

  it('does not submit the valid in puts', () => {
    const firstNameTestValue = "0000";
    const lastNameTestValue = "TestLastName";
    const jobTitleTestValue = "TestJobTitle";
    const component = render(<Provider store={store}><AddEmployeeForm /></Provider>);

    const firstNameInput = component.getByTestId('firstName');
    const lastNameInput = component.getByTestId('lastName');
    const jobTitleInput = component.getByTestId('jobTitle');
    fireEvent.change(firstNameInput, { target: { value: firstNameTestValue } });
    fireEvent.change(lastNameInput, { target: { value: lastNameTestValue } });
    fireEvent.change(jobTitleInput, { target: { value: jobTitleTestValue } });
    expect(component.container.innerHTML).toContain(firstNameTestValue);
    expect(component.container.innerHTML).toContain(lastNameTestValue);
    expect(component.container.innerHTML).toContain(jobTitleTestValue);

    const submitButton = component.getByTestId('submitButton');
    fireEvent.click(submitButton);
    const employees = selectEmployees(store.getState());
    expect(employees.length).toEqual(0);
  });

  it('resets the inputs', () => {
    const firstNameTestValue = "TestFirstName";
    const lastNameTestValue = "TestLastName";
    const jobTitleTestValue = "TestJobTitle";
    const component = render(<Provider store={store}><AddEmployeeForm /></Provider>);

    const firstNameInput = component.getByTestId('firstName');
    const lastNameInput = component.getByTestId('lastName');
    const jobTitleInput = component.getByTestId('jobTitle');
    fireEvent.change(firstNameInput, { target: { value: firstNameTestValue } });
    fireEvent.change(lastNameInput, { target: { value: lastNameTestValue } });
    fireEvent.change(jobTitleInput, { target: { value: jobTitleTestValue } });
    expect(component.container.innerHTML).toContain(firstNameTestValue);
    expect(component.container.innerHTML).toContain(lastNameTestValue);
    expect(component.container.innerHTML).toContain(jobTitleTestValue);

    const resetButton = component.getByTestId('resetButton');
    fireEvent.click(resetButton);
    expect(component.container.innerHTML).not.toContain(firstNameTestValue);
    expect(component.container.innerHTML).not.toContain(lastNameTestValue);
    expect(component.container.innerHTML).not.toContain(jobTitleTestValue);
  });
});