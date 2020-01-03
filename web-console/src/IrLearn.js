import React,{Component} from 'react'

import mqtt from 'mqtt';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import { FormLabel,Button } from '@material-ui/core';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 }];

export default class IrLearn extends React.Component {
  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  render() {
    return (
      <div>
        <h5>1.登録先を設定してください。</h5>
        <FormLabel>登録するリモコンを選ぶか、新しいリモコンの名前を入れてください。
        <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
        placeholder="機器"
        formatCreateLabel={(inputValue) => `新しい機器を登録: ${inputValue}`}
        required
        />
        </FormLabel>
        <FormLabel>登録するリモコンのボタンを選ぶか、新しいボタンの名前を入れてください。
        <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
        placeholder="ボタン"
        formatCreateLabel={(inputValue) => `新しいボタンを登録: ${inputValue}`}
        />
        </FormLabel>
        <h5>2. シグナルを読み取ります。センサーに向けて登録したいリモコンのボタンを押してください。</h5>
        <TextField multiline rows="4" label="センサーの状態" fullWidth variant="outlined" value="シグナル受信待ちです・・・" disabled/>
        <Button variant="outlined" color="default">もう一度読み取る</Button>
        <h5>3. </h5>
        <br />
      </div>
    );
  }
}