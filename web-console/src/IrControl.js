import React from 'react'

import { withRouter } from 'react-router';

import mqtt from 'mqtt';
import BackToHomeBtn from "./BackToHomeBtn";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import IrLearn from './IrLearn';
import IrSend from './IrSend';

class IrControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      remote_mode: 0, //set "learn" as default
    };
  }

  backToHome = () =>{
    this.props.history.push("/")
  }

  handleChange = (event,newValue) =>{
    this.setState({remote_mode:newValue});
  }

  render() {
    return (
      <div>
        <h2>リモコン</h2>
        <Paper square>
          <Tabs
          value={this.state.remote_mode}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          variant="fullWidth">
            <Tab label="シグナル登録" />
            <Tab label="シグナル送信" />
          </Tabs>
        </Paper>
          {this.state.remote_mode === 0 ? 
          <IrLearn /> : <IrSend />}
        <hr />
        <BackToHomeBtn onClick={this.backToHome} />
      </div>
    );
  }
}
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
export default withRouter(IrControl);