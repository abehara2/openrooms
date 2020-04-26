import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import { render } from "react-dom";
import { withRouter } from "react-router-dom";
import {compose} from "recompose";
//import "./styles/styles.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import VideoCall from './VideoCall';

function VideoTest() {
    return(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
            <AppBar title="React Twilio Video" />
            <VideoCall />
        </div>
    </MuiThemeProvider>
    
    );
} export default compose(withRouter)(VideoTest);