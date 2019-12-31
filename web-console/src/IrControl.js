import React, { useState } from 'react'

import {RadioGroup,FormControlLabel,Radio} from '@material-ui/core';
import {ListItem,ListItemText} from '@material-ui/core';

import { withRouter } from 'react-router';

import mqtt from 'mqtt';
import BackToHomeBtn from "./BackToHomeBtn";

class IrControl extends React.Component {
  backToHome = () =>{
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h2>リモコン</h2>

        <hr />
        <BackToHomeBtn onClick={this.backToHome} />
      </div>
    );
  }
}
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
export default withRouter(IrControl);