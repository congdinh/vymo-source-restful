import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import UserForm from './Form';
import { TYPE_FORM } from '../constant';

import { gql, useMutation, useQuery } from '@apollo/client';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GET_LATEST_USER = gql`
  query LatestUser {
    users @rest(type: "User", path: "/users") {
      statusCode
      message
      data {
        _id @export(as: "userId")
        name
        email
        phoneNumber
        address
        dob
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($var: Payload!) {
    createUser(input: $var) @rest(type: "User", path: "/users", method: "POST") {
      statusCode
      message
      data {
        _id @export(as: "userId")
        name
        email
        phoneNumber
        address
        dob
      }
    }
  }
`;

function GetLatestUser({ type }) {
  const { loading, error, data } = useQuery(GET_LATEST_USER, {
    fetchPolicy: 'network-only'
  });

  if (loading) return 'Loading...';
  if (error) return 'Error connection';

  const user = data?.users?.data[0];
  if (!user) return 'Not found any user';

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" gutterBottom>
            {`${user.name}'s Profiles`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            required
            disabled
            value={user.email}
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="phone"
            name="phone"
            label="Phone No"
            required
            disabled
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={`+84 ${user.phoneNumber}`}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            required
            disabled
            value={user.address}
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="dob"
            name="dob"
            label="DOB"
            fullWidth
            required
            disabled
            value={moment(user.dob, 'YYYYMMDD').format('DD MMM of YYYY')}
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function CreateUser({ type }) {
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  return <UserForm type={type} createUser={createUser} loading={loading} error={error} data={data?.createUser} />;
}

function User({ open, type, handleClose }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {(type === TYPE_FORM.ADD && 'Create User') || 'Latest User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {(type === TYPE_FORM.ADD && <CreateUser type={type} />) || <GetLatestUser type={type} />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default User;
