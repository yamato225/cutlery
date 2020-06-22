import React from 'react'

import { withRouter } from 'react-router';

import BackToHomeBtn from "./BackToHomeBtn";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Paper,Select} from '@material-ui/core';

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
    // this.setState({devices: [
    //   {"value":1, "label":"poipoi"},
    //   {"value":2, "label":"njo"}
    // ]})
    this.get_devices_list();
  }

  componentWillMount = () => {
    this.get_devices_list();
  }

  devices_list=[];
  get_devices_list = () =>{
    fetch('/api/devices').then(response => {
      console.log(response.status); // 200
      return response.json();
    }).then(json => {
      this.setState({devices_data: json["devices"]});
      //this.devices_list=json["devices"];
    });
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
          <IrLearn devices_data={this.state.devices_data} /> : <IrSend devices_data={this.state.devices_data}/>}
        <hr />
        <BackToHomeBtn onClick={this.backToHome} />
      </div>
    );
  }
}
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
export default withRouter(IrControl);