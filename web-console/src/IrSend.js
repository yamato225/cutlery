import React from 'react'

import {Grid,Card,CardContent,Typography, Select, MenuItem, FormControl, InputLabel, Button, Box} from '@material-ui/core';


export default class IrLearn extends React.Component {

  componentWillMount = () => {
    this.setState({devices:[]});
    this.setState({buttons:[]});
  }

  update_buttons_selector = (event) =>{
    var buttons=[];
    console.log(event);
    if(event.target.value){
      //nullでない
        var device=this.props.devices_data.find(dev=>{
          return dev["id"]===event.target.value;
        });
        device["buttons"].forEach(btn=>{
          buttons.push({"value":btn["id"],"label":btn["label"]});
        });
    }
    this.setState({buttons: buttons});
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
                <Card variant="outlined" square style={{ overflow: 'visible'}}>
                  <CardContent>
                    <Typography variant="h6" component="h6" >シグナル送信</Typography>
                      <Typography variant="caption" color="textSecondary">送信先の機器を選んでください。</Typography>
                        <Box m={1}/>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>機器</InputLabel>
                          <Select
                            label="機器"
                            onChange={this.update_buttons_selector}
                          >
                            {devices.map(dev=>(
                              <MenuItem value={dev.value}>{dev.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      <Box m={2}/>
                      <Typography variant="caption" color="textSecondary">送信するボタンを選んでください。</Typography>
                      <Box m={1}/>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>ボタン</InputLabel>
                          <Select
                            label="ボタン"
                          >
                            {this.state.buttons.map(btn=>(
                              <MenuItem value={btn.value}>{btn.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                  </CardContent>
                </Card>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">送信する</Button>
        </Grid>
        </Grid>
      </div>
    );
  }
}