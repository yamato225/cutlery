import React,{Component} from 'react'

import mqtt from 'mqtt';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, Grid} from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import { Paper ,Button,Card,CardHeader,CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

function get_IR_device_list(){
  var host_name=window.location.host.split(':')[0];
  var url="http://"+host_name+":5000/device";

}

export default class IrLearn extends React.Component {

  devices_list=null;

  componentWillMount = () => {
    this.setState({devices:[]});
    this.setState({buttons:[]});
    this.get_devices_list();
  }

  get_devices_list = () =>{
    fetch('/api/devices').then(response => {
      console.log(response.status); // 200
      return response.json();
    }).then(json => {
      this.devices_list=json["devices"];
    }).finally(() =>{
      var devices=[];
      this.devices_list.forEach(d=> {
        devices.push({"value":d["id"], "label": d["label"]});
      });
      this.setState({devices: devices});
    });
  }

  update_buttons_selector = (selected) =>{
    var buttons=[];
    console.log(selected);
    if(selected){
      //nullでない
      if(!("__isNew__" in selected)){
        var device=this.devices_list.find(dev=>{
          return dev["id"]===selected["value"];
        });
        device["buttons"].forEach(btn=>{
          buttons.push({"value":btn["id"],"label":btn["label"]});
        });
      }else{
        //生成時
        console.log("detect:isNew");
      }
    }
    this.setState({buttons: buttons});
  }

  render() {
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
                options={this.state.devices}
                placeholder="機器"
                formatCreateLabel={(inputValue) => `新しい機器を登録: ${inputValue}`}
                required
                />
                <Typography variant="caption" color="textSecondary">登録するリモコンのボタンを選ぶか、新しいボタンの名前を入れてください。</Typography>
                <CreatableSelect
                isClearable
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
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
                <TextField multiline rows="4" label="センサーの状態" fullWidth variant="outlined" value="シグナル受信待ちです・・・" disabled/>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">保存する</Button>
          <Button variant="outlined" color="default">もう一度読み取る</Button>
        </Grid>
        </Grid>
      </div>
    );
  }
}