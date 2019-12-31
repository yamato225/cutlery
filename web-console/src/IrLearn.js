import React from 'react'

import mqtt from 'mqtt';
import { TextField } from '@material-ui/core';

export default class IrLearn extends React.Component {

  render() {
    return (
      <div>
        <p>状態：準備完了。センサーに向けてリモコンのボタンを押してください。</p>
        <TextField value="aaaaa" rows="4" multiline fullWidth
        label="受信シグナル" variant="outlined" />
      </div>
    );
  }
}