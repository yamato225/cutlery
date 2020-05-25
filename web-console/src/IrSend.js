import React from 'react'

import mqtt from 'mqtt';
import {Grid,Card,CardContent,Typography} from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';

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
                        <Typography variant="caption" color="textSecondary">送信するリモコンを選んでください。</Typography>
                        <CreatableSelect
                        isClearable
                        onChange={this.handleChange}
                        onInputChange={this.handleInputChange}
                        options={options}
                        placeholder="機器"
                        formatCreateLabel={(inputValue) => `新しい機器を登録: ${inputValue}`}
                        required
                        />
                        <Typography variant="caption" color="textSecondary">登録するリモコンのボタンを選ぶか、新しいボタンの名前を入れてください。</Typography>
                        <CreatableSelect
                        isClearable
                        onChange={this.handleChange}
                        onInputChange={this.handleInputChange}
                        options={options}
                        placeholder="ボタン"
                        formatCreateLabel={(inputValue) => `新しいボタンを登録: ${inputValue}`}
                        />
                  </CardContent>
                </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}