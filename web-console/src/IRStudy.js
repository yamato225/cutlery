import React, { useState } from 'react'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {RadioGroup,FormControl,FormControlLabel,FormLabel,Radio} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import { Dialog,DialogTitle,DialogContent,DialogActions,DialogContentText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//import signalWifi4Bar from '@material-ui/icons/signalWifi4Bar';
import {SignalWifi4Bar,SignalWifi3Bar,SignalWifi2Bar,SignalWifi1Bar,SignalWifi0Bar, CheckCircle} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

import mqtt from 'mqtt';

  class IRStudy extends React.Component {
    render() {
      return (
        <div>
          <Container maxWidth="md">
            <h2>リモコン学習</h2>
            あああああ
            <hr />
            <Button variant="contained" color="default" onClick={this.backToHome}>戻る</Button>
          </Container>
        </div>
      );
    }
  }
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
  export default withRouter(IRStudy);