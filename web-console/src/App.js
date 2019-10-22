import React from 'react';
import AppList from './AppList';
import WifiConfig from './WifiConfig';
import { BrowserRouter, Route } from 'react-router-dom';

//Appbar components
import AppBar from '@material-ui/core/AppBar';
import RestaurantIcon from '@material-ui/icons/RestaurantMenu';
import AntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



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
          <main>
          <Route exact path='/' component={AppList} />
          <Route exact path='/wifi' component={WifiConfig} />
          </main>
        </BrowserRouter>
      );
  }
}
