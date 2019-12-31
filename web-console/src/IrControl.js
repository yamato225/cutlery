import React, { useState } from 'react'

import {RadioGroup,FormControlLabel,Radio} from '@material-ui/core';
import {ListItem,ListItemText} from '@material-ui/core';

import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

import mqtt from 'mqtt';
import BackToHomeBtn from "./BackToHomeBtn";

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

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


class IrControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      remote_mode: "send"
    };
  }

  backToHome = () =>{
    this.props.history.push("/")
  }

  handleChange = panel => (event, newExpanded) => {
    //setExpanded(newExpanded ? panel : false);
  };

  render() {
    return (
      <div>
        <h2>リモコン</h2>

        <ExpansionPanel >
        <ExpansionPanelSummary >
          リモコン登録
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          あああああ
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel >
        <ExpansionPanelSummary >
          <Typography>リモコン送信</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          いいいいい
        </ExpansionPanelDetails>
      </ExpansionPanel>
        <hr />
        <BackToHomeBtn onClick={this.backToHome} />
      </div>
    );
  }
}
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
export default withRouter(IrControl);