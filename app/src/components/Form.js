import React, { useState } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';

import { TYPE_FORM } from '../constant';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function UserForm({ type, createUser, loading, error, data }) {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dob: null,
    error: false,
    errorMessage: {}
  });

  const classes = useStyles();
  const disableUpdateField = type === TYPE_FORM.ADD ? false : true;

  const validateForm = () => {
    let isError = false;
    let errorMessage = {};
    if (userForm.name === '') {
      isError = true;
      errorMessage['name'] = 'Empty name. Please provide value.';
    }

    if (userForm.email === '' || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userForm.email)) {
      isError = true;
      errorMessage['email'] = 'Empty email. Please provide value.';
    }

    if (userForm.phoneNumber === '') {
      isError = true;
      errorMessage['phoneNumber'] = 'Empty phoneNumber. Please provide value.';
    }

    if (userForm.address === '') {
      isError = true;
      errorMessage['address'] = 'Empty address. Please provide value.';
    }

    const convertDOB =
      (userForm.dob && Math.floor(moment(new Date()).diff(moment(userForm.dob, 'DDMMYYYY'), 'years', true))) || null;
    if (!convertDOB || convertDOB < 18 || convertDOB > 60) {
      isError = true;
      errorMessage['dob'] =
        (!userForm.dob && 'Empty DOB. Please provide value.') || 'DOB is not accepted, Please reselect the value.';
    }

    setUserForm({
      ...userForm,
      error: isError,
      errorMessage
    });

    if (!isError) {
      const formatDOB = (userForm.dob && moment(userForm.dob).format('YYYYMMDD')) || null;
      createUser({
        variables: {
          var: {
            name: userForm.name,
            email: userForm.email,
            phoneNumber: userForm.phoneNumber,
            address: userForm.address,
            dob: formatDOB
          }
        }
      });
    }
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
            label="Name"
            fullWidth
            required
            disabled={disableUpdateField}
            value={userForm.name}
            autoComplete="name"
            onChange={e => {
              setUserForm({
                ...userForm,
                name: e.target.value
              });
            }}
            error={!!userForm.errorMessage.name}
            helperText={userForm.errorMessage.name}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            required
            disabled={disableUpdateField}
            value={userForm.email}
            autoComplete="name"
            onChange={e => {
              setUserForm({
                ...userForm,
                email: e.target.value
              });
            }}
            error={!!userForm.errorMessage.email}
            helperText={userForm.errorMessage.email}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone"
            required
            disabled={disableUpdateField}
            fullWidth
            autoComplete="name"
            value={userForm.phoneNumber}
            onChange={e => {
              setUserForm({
                ...userForm,
                phoneNumber: e.target.value
              });
            }}
            error={!!userForm.errorMessage.phoneNumber}
            helperText={userForm.errorMessage.phoneNumber}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            required
            disabled={disableUpdateField}
            value={userForm.address}
            autoComplete="name"
            onChange={e => {
              setUserForm({
                ...userForm,
                address: e.target.value
              });
            }}
            error={!!userForm.errorMessage.address}
            helperText={userForm.errorMessage.address}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <KeyboardDatePicker
            id="dob"
            name="dob"
            required
            disabled={disableUpdateField}
            label="DOB"
            disableFuture
            fullWidth
            autoComplete="name"
            value={userForm.dob}
            disableToolbar={true}
            format="DD/MM/YYYY"
            onChange={e => {
              setUserForm({
                ...userForm,
                dob: e
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            error={!!userForm.errorMessage.dob}
            helperText={userForm.errorMessage.dob}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        {(type === TYPE_FORM.ADD && (
          <Button
            onClick={() => {
              validateForm();
            }}
            disabled={loading ? true : false}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Send
          </Button>
        )) ||
          ''}
      </div>

      <br />
      {loading && <p>Submitting...</p>}
      {error && <Alert severity="error">Submission error! ${error.message}</Alert>}
      {data?.statusCode === 200 && <Alert severity="success">Create successful</Alert>}
      {data?.statusCode !== 200 && data?.statusCode && <Alert severity="error">{data?.message}</Alert>}
      <br />
    </React.Fragment>
  );
}
