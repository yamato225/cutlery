import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router';


  class AppList extends React.Component{
    handleToAboutPage = (url) => {
        this.props.history.push(url);
    }

    render() {
        var cards = [{id:"wifi" ,name: "wifi設定",url: "./wifi",description:"接続先wifiを設定します。"},
        {id:"ircontrol" ,name: "リモコン",url: "./ircontrol",description:"リモコンで機器を操作します"}];//,
        //{id:"irsend" ,name: "リモコン操作",url: "./irsend",description:"リモコンの信号を送信して操作します"}];//, 
            //{id:"ir_receiver" ,name: "リモコンコピー",url: "./ir_receiver",description:"リモコンの信号を保存します"}];
            //,{id:"dummy",name: "dummy",url:"./dummy",description:"nurupo"}];

        return (
          <div>
          <h2>App List</h2>
          <Grid container spacing={2}>
            {cards.map(card => (
              <Grid item key={card.id} xs={12} md={6}>
              <Card onClick={() => this.handleToAboutPage(card.url)}>
                <CardHeader
                  avatar={
                      <Avatar aria-label="Recipe">
                          <SettingsIcon/>
                      </Avatar>
                  }
                  title={card.name}
                  subheader={card.description}
                />
              </Card></Grid>))}
          </Grid>
          </div>
      );
    }
  };

  export default withRouter(AppList);