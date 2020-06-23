import React from 'react'

import { withRouter } from 'react-router';

import BackToHomeBtn from "./BackToHomeBtn";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Paper,Select} from '@material-ui/core';

import mqtt from 'mqtt';

import IrLearn from './IrLearn';
import IrSend from './IrSend';

function getUrl(){
  var host_name=window.location.host.split(':')[0];
  var url="ws://"+host_name+":9090";
  //url="ws://dishbase01.local:9090";
  //console.log(url);
  //url="ws://dishdev02.local:9090";
  //url="ws://192.168.3.147:9090";
  //this.mqtt_client = mqtt.connect(url);
  return url;
}

class IrControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      remote_mode: 0, //set "learn" as default
      device_list:[]
    };
  }

  update_device_list = (topic,message) => {
    console.log(message.toString());
    if(topic=="ir_devices/devices"){
      var obj=JSON.parse(message.toString());
      this.setState({devices_data: obj["devices"]});
    }
  }

  connect_mqtt_server(){
    var url=getUrl();
    console.log(url);
    this.mqtt_client = mqtt.connect(url);

    this.mqtt_client.on('connect',function(){
      console.log("connected to list.");
    })

    this.mqtt_client.subscribe('ir_devices/devices');
    this.mqtt_client.publish('ir_devices/request/devices','get');
    this.mqtt_client.on("message",this.update_device_list);
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
    //this.get_devices_list();
    this.connect_mqtt_server();
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