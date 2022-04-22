import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import User from './User';
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
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    minWidth: '100px'
  }
}));

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [type, setFormType] = React.useState(TYPE_FORM.ADD);

  const handleClickOpen = type => {
    setOpen(true);
    setFormType(type);
  };

  const handleClose = () => {
    setOpen(false);
    setFormType(null);
  };

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <b>Vymo - RESTful Service</b>
            </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.layout}>
          <Typography variant="h5" component="h5">
            <div className={classes.buttons}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => {
                  handleClickOpen(TYPE_FORM.VIEW);
                }}
              >
                View
              </Button>

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  handleClickOpen(TYPE_FORM.ADD);
                }}
              >
                Add
              </Button>
            </div>
          </Typography>

          <User handleClose={handleClose} open={open} type={type} />
        </main>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
}
