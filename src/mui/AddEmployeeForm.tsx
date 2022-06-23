import * as React from 'react';
import Title from './Title';
import { Box, Button, Stack, TextField } from '@mui/material';
import { getCurrentDateString } from '../util/DateUtil';
import { useAppDispatch } from '../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { addEmployee } from '../redux/EmployeesSlice';
import { validateInput } from '../util/GeneralUtil';

export default function AddEmployeeForm() {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [jobTitle, setJobTitle] = React.useState<string>('');
  const [birthday, setBirthday] = React.useState<string>(getCurrentDateString());
  const [firstNameValid, setFirstNameValid] = React.useState<boolean>(true)
  const [lastNameValid, setLastNameValid] = React.useState<boolean>(true)
  const [jobTitleValid, setJobTitleValid] = React.useState<boolean>(true)
  const [birthdayValid, setBirthdayValid] = React.useState<boolean>(true)

  const inputsValid = React.useMemo(() => {
    if (firstName.length > 0 && lastName.length > 0 && jobTitle.length > 0 && firstNameValid && lastNameValid && jobTitleValid && birthdayValid) {
      return true;
    } else {
      return false;
    }
  }, [firstName, lastName, jobTitle, birthday])

  const onSubmitEmployee = React.useCallback(() => {
    if (inputsValid) {
      dispatch(addEmployee({ id: uuidv4(), firstName: firstName, lastName: lastName, jobTitle: jobTitle, birthday: birthday }))
    } else {
      alert("The employee could not be created due to an invalid or empty field.");
    }
  }, [firstName, lastName, birthday, jobTitle, birthday, inputsValid])


  React.useEffect(() => {
    setBirthdayValid(birthday.length > 0);
  }, [birthday])

  return (
    <React.Fragment>
      <Title>Add New Employee</Title>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="firstName" label="First Name"
          sx={{ width: 220 }} type='text'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setFirstName(event.target.value);
            setFirstNameValid(validateInput(event.target.value));
          }}
          inputProps={{
            "data-testid": "firstName",
          }}
          value={firstName}
          error={!firstNameValid && firstName.length > 0} />
        <TextField id="lastName" label="Last Name"
          sx={{ width: 220 }} type='text'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setLastName(event.target.value);
            setLastNameValid(validateInput(event.target.value));
          }}
          inputProps={{
            "data-testid": "lastName",
          }}
          value={lastName}
          error={!lastNameValid && lastName.length > 0} />
        <TextField id="jobTitle" label="Job Title"
          sx={{ width: 220 }} type='text'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setJobTitle(event.target.value);
            setJobTitleValid(validateInput(event.target.value));
          }}
          inputProps={{
            "data-testid": "jobTitle",
          }}
          value={jobTitle}
          error={!jobTitleValid && jobTitle.length > 0} />
        <TextField
          id="birthday"
          label="Birthday"
          type="date"
          value={birthday}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setBirthday(event.target.value);
          }}
          error={!birthdayValid}
        />
      </Box>
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Stack spacing={2} direction="row">
          <Button
            data-testid="submitButton"
            onClick={() => {
              onSubmitEmployee();
            }}
            variant="contained">Submit</Button>
          <Button
            data-testid="resetButton"
            onClick={() => {
              setFirstName('');
              setLastName('');
              setJobTitle('');
              setBirthday(getCurrentDateString());
            }} variant="outlined">Reset</Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
