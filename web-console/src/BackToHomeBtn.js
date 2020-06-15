import React from 'react';
import Button from '@material-ui/core/Button';

export default class backToHomeBtn extends React.Component {
    render() {
      return (
        <div>
            <Button variant="contained" color="default" onClick={this.props.onClick}>戻る</Button>
        </div>
      );
    }
  }