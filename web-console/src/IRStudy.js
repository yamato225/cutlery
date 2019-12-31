import React, { useState } from 'react'

import { withRouter } from 'react-router';

import mqtt from 'mqtt';
import BackToHomeBtn from "./BackToHomeBtn";

class IRStudy extends React.Component {
  backToHome = () =>{
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h2>リモコン登録</h2>
        あああああ
        <hr />
        <BackToHomeBtn onClick={this.backToHome} />
      </div>
    );
  }
}
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
export default withRouter(IRStudy);