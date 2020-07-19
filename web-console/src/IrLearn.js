import React from 'react'

import mqtt from 'mqtt';
import { TextField, Typography, Grid} from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import { Button,Card,CardContent } from '@material-ui/core';

function getUrl(){
  var host_name=window.location.host.split(':')[0];
  var url="ws://"+host_name+":9090";
  return url;
}

export default class IrLearn extends React.Component {
  devices_list=null;

  constructor(props){
    super(props);
    this.state = {
      devices:[],
      buttons:[],
      recv_signal:"シグナル受信待ちです..."
    };
  }

  subscribe_ir_codes=()=>{
    this.mqtt_signal=mqtt.connect(getUrl());
    this.mqtt_signal.on('connect',()=>{
      console.log("connected");
    });
    this.mqtt_signal.subscribe('ir_control/recv_signal');
    this.mqtt_signal.on('message',this.on_receive_signal);
  }

  on_receive_signal = (topic,message) => {
    this.setState({recv_signal:message.toString()})
  }

  componentWillMount = () => {
    this.subscribe_ir_codes();
  }

  update_buttons_selector = (selected) =>{
    var buttons=[];
    console.log(selected);
    if(selected){
      //nullでない
      if(!("__isNew__" in selected)){
        var device=this.props.devices_data.find(dev=>{
          return dev["id"]===selected["value"];
        });
        device["buttons"].forEach(btn=>{
          buttons.push({"value":btn["id"],"label":btn["label"]});
        });
        this.target_device={"id":selected["value"],"label":selected["label"]};
      }else{
        //生成時
        console.log("detect:isNew");
        this.target_device={"id":0,"label":selected["label"]};
      }
    }
    this.setState({buttons: buttons});
  }

  recv_added_button_name=(selected)=>{
    if(selected){
      //nullでない
      if("__isNew__" in selected){
        this.target_button={"id":0,"label":selected["label"]};
      }else{
        this.target_button={"id":selected['value'],"label":selected["label"]};
      }
    }
  }

  on_save_button=()=>{
    var new_dev={"device":this.target_device, "button":this.target_button };
    console.log(new_dev);

    this.mqtt_signal.publish('ir_devices/add/device',JSON.stringify(new_dev));
  }

  render() {
    var devices=[];
    if(this.props.devices_data){
      this.props.devices_data.forEach(d=> {
        devices.push({"value":d["id"], "label": d["label"]});
      });
    }

    return (
      <div>
        <p></p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
        <Card variant="outlined" square style={{ overflow: 'visible'}}>
          <CardContent>
            <Typography variant="h6" component="h6" >リモコンの情報を設定</Typography>
                <Typography variant="caption" color="textSecondary">登録するリモコンを選ぶか、新しいリモコンの名前を入れてください。</Typography>
                <CreatableSelect
                isClearable
                onChange={this.update_buttons_selector}
                options={devices}
                placeholder="機器"
                formatCreateLabel={(inputValue) => `新しい機器を登録: ${inputValue}`}
                required
                />
                <Typography variant="caption" color="textSecondary">登録するリモコンのボタンを選ぶか、新しいボタンの名前を入れてください。</Typography>
                <CreatableSelect
                isClearable
                onChange={this.recv_added_button_name}
                options={this.state.buttons}
                placeholder="ボタン"
                formatCreateLabel={(inputValue) => `新しいボタンを登録: ${inputValue}`}
                />
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12}>
        <Card variant="outlined" square>
          <CardContent>
          <Typography variant="h6">シグナル登録</Typography>
                <Typography variant="caption" color="textSecondary">センサーに向けて登録したいリモコンのボタンを押してください。</Typography>
                <p></p>
                <TextField multiline rows="4" label="センサーの状態" fullWidth variant="outlined" value={this.state.recv_signal} disabled/>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={this.on_save_button}>保存する</Button>
          <Button variant="outlined" color="default">もう一度読み取る</Button>
        </Grid>
        </Grid>
      </div>
    );
  }
}