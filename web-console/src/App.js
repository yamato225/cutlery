import React from 'react';
import AppList from './AppList';
import WifiConfig from './WifiConfig';
import IrControl from './IrControl';
import { BrowserRouter, Route } from 'react-router-dom';

//Appbar components
import AppBar from '@material-ui/core/AppBar';
import RestaurantIcon from '@material-ui/icons/RestaurantMenu';
import AntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';


export default class App extends React.Component{
  render(){
    
    return (
      <BrowserRouter>
          <AppBar position="static">
              <Toolbar>
                  <RestaurantIcon />
                  <Typography variant="h6" color="inherit" style={{flex:1}} onClick={() =>document.location="./"}>
                    CUTLERY
                  </Typography>
                <AntennaIcon />
              </Toolbar>
          </AppBar>
          <Container maxWidth="md">
                <main>
                 <Route exact path='/' component={AppList} />
                 <Route exact path='/wifi' component={WifiConfig} />
                 <Route exact path='/ircontrol' component={IrControl} />
                </main>
          </Container>
        </BrowserRouter>
      );
  }
}
