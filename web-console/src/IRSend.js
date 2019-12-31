import React, { useState } from 'react'

import {RadioGroup,FormControlLabel,Radio} from '@material-ui/core';
import {ListItem,ListItemText} from '@material-ui/core';

import { withRouter } from 'react-router';

import mqtt from 'mqtt';
import BackToHomeBtn from "./BackToHomeBtn";

class IRSend extends React.Component {
  backToHome = () =>{
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h2>リモコン</h2>
        <RadioGroup name="network-mode-selector" value={this.state.switch_value}>
          <ListItem button>
              <FormControlLabel value="record" control={<Radio />}/>
              <ListItemText primary="リモコン登録"/>
            </ListItem>
            <ListItem button>
              <FormControlLabel value="send" control={<Radio/>}/>
            <ListItemText primary="リモコン送信"/>
          </ListItem>
        </RadioGroup>
        <hr />
        <BackToHomeBtn onClick={this.backToHome} />
      </div>
    );
  }
}
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
export default withRouter(IRSend);