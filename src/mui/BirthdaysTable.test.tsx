import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setEmployees } from '../redux/EmployeesSlice';
import store from '../redux/store';
import BirthdaysTable from './BirthdaysTable';
import { getCurrentDateString } from '../util/DateUtil';
import { Employee } from '../util/Types';
import format from 'date-fns/format';

describe('AddEmployeeForm tests', () => {
  const currentDate = getCurrentDateString();
  const differentMonthDate = new Date();
  differentMonthDate.setMonth(differentMonthDate.getMonth() + 1);
  const formattedDate = format(differentMonthDate, "yyyy-MM-dd");

  beforeEach(() => {
    store.dispatch(setEmployees([]))
  })

  it('renders the birthday employee and not the non-birthday employee', () => {
    const currentDate = getCurrentDateString();
    const differentMonthDate = new Date();
    differentMonthDate.setMonth(differentMonthDate.getMonth() + 1);
    const formattedDate = format(differentMonthDate, "yyyy-MM-dd");
    const birthdayEmployee: Employee = { id: '1', firstName: 'john', lastName: 'smith', birthday: currentDate, jobTitle: 'associate job' };
    const regularEmployee: Employee = { id: '2', firstName: 'sarah', lastName: 'williams', birthday: formattedDate, jobTitle: 'senior job' }
    store.dispatch(setEmployees([birthdayEmployee, regularEmployee]));

    const component = render(<Provider store={store}><BirthdaysTable /></Provider>);

    expect(component.container.innerHTML).toContain('john');
    expect(component.container.innerHTML).toContain('smith');
    expect(component.container.innerHTML).toContain('associate job');
    expect(component.container.innerHTML).toContain(currentDate);
  });

  it('renders both birthday employees', () => {
    const birthdayEmployee1: Employee = { id: '1', firstName: 'john', lastName: 'smith', birthday: currentDate, jobTitle: 'associate job' };
    const birthdayEmployee2: Employee = { id: '2', firstName: 'sarah', lastName: 'williams', birthday: currentDate, jobTitle: 'senior job' }
    store.dispatch(setEmployees([birthdayEmployee1, birthdayEmployee2]));

    const component = render(<Provider store={store}><BirthdaysTable /></Provider>);

    expect(component.container.innerHTML).toContain('john');
    expect(component.container.innerHTML).toContain('smith');
    expect(component.container.innerHTML).toContain('associate job');
    expect(component.container.innerHTML).toContain('sarah');
    expect(component.container.innerHTML).toContain('williams');
    expect(component.container.innerHTML).toContain('senior job');
    expect(component.container.innerHTML).toContain(currentDate);
  });

  it('renders neither employee', () => {
    const regularEmployee1: Employee = { id: '1', firstName: 'john', lastName: 'smith', birthday: formattedDate, jobTitle: 'associate job' };
    const regularEmployee2: Employee = { id: '2', firstName: 'sarah', lastName: 'williams', birthday: formattedDate, jobTitle: 'senior job' }
    store.dispatch(setEmployees([regularEmployee1, regularEmployee2]));

    const component = render(<Provider store={store}><BirthdaysTable /></Provider>);

    expect(component.container.innerHTML).not.toContain('john');
    expect(component.container.innerHTML).not.toContain('sarah');
  });
});