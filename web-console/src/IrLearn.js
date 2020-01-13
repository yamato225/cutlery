import React,{Component} from 'react'

import mqtt from 'mqtt';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, Grid} from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import { Paper ,Button } from '@material-ui/core';
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
        <p></p>
        <ExpansionPanel square >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>登録するリモコンの情報を設定</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item>
              <Typography variant="caption">登録するリモコンを選ぶか、新しいリモコンの名前を入れてください。</Typography>
              <CreatableSelect
              isClearable
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              options={options}
              placeholder="機器"
              formatCreateLabel={(inputValue) => `新しい機器を登録: ${inputValue}`}
              required
              />
              </Grid>
              <Grid item>
                <Typography variant="caption">登録するリモコンのボタンを選ぶか、新しいボタンの名前を入れてください。</Typography>
                <CreatableSelect
                isClearable
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                options={options}
                placeholder="ボタン"
                formatCreateLabel={(inputValue) => `新しいボタンを登録: ${inputValue}`}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography variant="subtitle1">シグナル読み取り</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item>
                <Typography variant="caption">センサーに向けて登録したいリモコンのボタンを押してください。</Typography>
                <p></p>
              </Grid><Grid item>
                <TextField multiline rows="4" label="センサーの状態" fullWidth variant="outlined" value="シグナル受信待ちです・・・" disabled/>
                <Button variant="outlined" color="default">もう一度読み取る</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Paper>
          <Typography variant="caption">登録するリモコンを選ぶか、新しいリモコンの名前を入れてください。</Typography>
          <CreatableSelect
            isClearable
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            options={options}
            placeholder="機器"
            formatCreateLabel={(inputValue) => `新しい機器を登録: ${inputValue}`}
            required
          />
        </Paper>
      </div>
    );
  }
}