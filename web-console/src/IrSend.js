import React from 'react'

import mqtt from 'mqtt';
import {Grid,Card,CardContent,Typography, Select, MenuItem, FormControl, InputLabel, Button, Box} from '@material-ui/core';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];



export default class IrLearn extends React.Component {

  render() {
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
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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