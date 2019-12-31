import React, { useState } from 'react'


import Button from '@material-ui/core/Button';

import {RadioGroup,FormControlLabel,Radio} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import { Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//import signalWifi4Bar from '@material-ui/icons/signalWifi4Bar';
import {SignalWifi4Bar,SignalWifi3Bar,SignalWifi2Bar,SignalWifi1Bar,SignalWifi0Bar} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

import mqtt from 'mqtt';

  function ShowReconnectMessage(props){
    const {target_ssid,open} = props;

    return(
    <Dialog fullScreen open={open}>
      <h2>wifiへの接続を開始します</h2>
      <ul>
        <li>dishとの接続を切断します。</li>
        <li>スマートフォンを{target_ssid}に接続してください。</li>
        <li>３０秒後に自動的にcutleryを再読み込みします。</li>
      </ul>
    </Dialog>
    );
  }

  function WifiStrengthIcon(props){
    const {strength} = props;

    if (strength>=4){
      return <SignalWifi4Bar />
    }else if(strength===3){
      return <SignalWifi3Bar />
    }else if(strength===2){
      return <SignalWifi2Bar />
    }else if(strength===1){
        return <SignalWifi1Bar />
    }else{
      return <SignalWifi0Bar />
    }
  }

  function PasswordDialog(props){
    const { onClose, onSubmit, open, title } = props;
    const [passwordText,setPassword] = useState(0);

    function handleClose() {
      onClose();
    }

    function submit(){
      onSubmit(passwordText);
    }

    function onChange(event){
      setPassword(event.target.value);
    }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ssid_password"
            label="パスワードを入力"
            type="password"
            onChange={onChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit} color="primary">
            接続
          </Button>
          <Button onClick={handleClose} color="default">
            戻る
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function getUrl(){
    var host_name=window.location.host.split(':')[0];
    var url="ws://"+host_name+":9090";
    //console.log(url);
    //url="ws://dishdev02.local:9090";
    url="ws://192.168.3.147:9090";
    //this.mqtt_client = mqtt.connect(url);
    return url;
  }


  class WifiList extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        ssid_list:[{id:"test",name:"test",strength:70}],
        passwordDialogOpen:false,
        reconnectDialogOpen:false,
        passwordText:"",
        selected_ssid:"",
        switch_value: "ap"
      };
      this.mqtt_connect=null;
      this.mqtt_client=null;
    }

    openPassword = (ssid) =>{
      this.setState({passwordDialogOpen:true,
      selected_ssid:ssid});
    }

    passwordClose = () => {
      this.setState({passwordDialogOpen:false});
    }

    onPasswordSubmitted = (password) => {
      this.setState({passwordText:password});
      this.setState({reconnectDialogOpen:true});
      var config_value={"ssid":this.state.selected_ssid,"password":password}

      this.mqtt_client.publish('wifi_config/config',JSON.stringify(config_value));
      this.passwordClose();
    }

    refresh_ssid_list = (topic,message) => {
      //console.log(message.toString())
      console.log("refreshing");
      var obj=JSON.parse(message.toString());
      //this.setState({ssid_list:this.state.ssid_list.concat(obj)});
      //this.setState({ssid_list:this.state.ssid_list = obj});
      this.setState({ssid_list:obj});
    }

    connect_mqtt_server(){
      var url=getUrl();
      //console.log(url);
      url="ws://dishdev02.local:9090";
      this.mqtt_client = mqtt.connect(url);
      //#this.wireless_switch=mqtt.connect(url);

      this.mqtt_client.on('connect',function(){
        console.log("connected.");
      })

      //this.mqtt_client.subscribe('wireless_switch/get_status',{qos:2});

      this.mqtt_client.subscribe('wifi_config/scan_results',{qos:0});
      this.mqtt_client.publish('process_waker/wake','wifi_config',{qos:2});
      this.mqtt_client.on("message",this.refresh_ssid_list);
    }

    render(){
      return (
        <div>
          <h3>接続可能なWifiリスト</h3>
          <List component="nav">
            {this.state.ssid_list.map(wifi => (
              <ListItem key={wifi.id} onClick={() => this.openPassword(wifi.name)}>
                <ListItemText primary={wifi.name.substr(0,20)} />
                <WifiStrengthIcon strength={wifi.strength} />
              </ListItem>
            )
            )}
            {this.state.ssid_list.length < 1 && <ListItem key="0">
              <ListItemText primary="読込中" />
              <CircularProgress  />
            </ListItem>}
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary="その他" />
            </ListItem>
          </List>
                  {/* Password Dialog */}
        <PasswordDialog title={this.state.selected_ssid.substr(0,20)} open={this.state.passwordDialogOpen} 
        onClose={this.passwordClose} onSubmit={this.onPasswordSubmitted}></PasswordDialog>
        {/* Explain */ }
        <ShowReconnectMessage open={this.state.reconnectDialogOpen} target_ssid={this.state.selected_ssid}/>
        </div>
    );
    }
  }

  class WifiConfig extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        ssid_list:[],
        passwordDialogOpen:false,
        reconnectDialogOpen:false,
        passwordText:"",
        selected_ssid:"",
        switch_value: "ap"
      };
      this.mqtt_connect=null;
      this.mqtt_client=null;
    }

    componentWillMount(){
      //connect to MQTT
      //alert(localtion.host);
      //var host_name=window.location.host.split(':')[0];
      //var url="ws://"+host_name+":9090";
    }

    componentWillUnmount(){
      //console.log("disconnecting...");
      //this.mqtt_client.end();
    }

    backToHome = () => {
        this.props.history.push('/');
    }

    changeSwitchValue = (value) =>{
      this.setState({switch_value:value});
    }

    render() {
      return (
        <div>
          <h2>Wifi設定</h2>
          {/* End hero unit */}
              <h3>接続モード</h3>
              <RadioGroup name="network-mode-selector" value={this.state.switch_value}>
                  <ListItem button onClick={() => this.changeSwitchValue("ap")}>
                    <FormControlLabel value="ap" control={<Radio />}/>
                    <ListItemText primary="APモード" secondary='"dish0010"として接続出来ます' />
                  </ListItem>
                  <ListItem button onClick={() => this.changeSwitchValue("wifi")}>
                    <FormControlLabel value="wifi" control={<Radio/>}/>
                    <ListItemText primary="Wifiモード" secondary="接続中：POMIQ24"/>
                  </ListItem>
              </RadioGroup>
              {this.state.switch_value==="wifi" ? <WifiList /> : ''}
              <hr />
              <Button variant="contained" color="default" onClick={this.backToHome}>戻る</Button>

        </div>
      );
    }
  }
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
  export default withRouter(WifiConfig);