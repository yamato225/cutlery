import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
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
        var classes = makeStyles(theme => ({
            icon: {
              marginRight: theme.spacing(2),
            },
            heroContent: {
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(8, 0, 6),
            },
            heroButtons: {
              marginLeft: 'auto',
              marginTop: theme.spacing(4),
            },
            cardGrid: {
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(8),
            },
            card: {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
            cardMedia: {
              paddingTop: '10%', // 16:9
            },
            cardContent: {
              flexGrow: 1,
            },
            footer: {
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(6),
            },
            title: {
              flexGrow: 1,
            },
          }));
        var cards = [{id:"wifi" ,name: "wifi設定",url: "./wifi",description:"接続先wifiを設定します。"}, 
            {id:"ir_receiver" ,name: "リモコンコピー",url: "./ir_receiver",description:"リモコンの信号を保存します"}];
            //,{id:"dummy",name: "dummy",url:"./dummy",description:"nurupo"}];

        return (
        <Container className={classes.cardGrid} maxWidth="md">
          <h2>App List</h2>
          {/* End hero unit */}
          <Grid container spacing={2}>
            {cards.map(card => (
              <Grid item key={card.id} xs={12} md={6}>
                <Card className={classes.card} onClick={() => this.handleToAboutPage(card.url)}>
                  <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            <SettingsIcon/>
                        </Avatar>
                    }
                    title={card.name}
                    subheader={card.description}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }
  };

  export default withRouter(AppList);