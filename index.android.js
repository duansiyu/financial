/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


//import AppMain from './app/main/appMain';
import App from './app/app';
import setGesture from './app/main/other/setGesture';
import welcome from './app/main/other/WelcomePage';
import PaymentList from './app/main/myWealth/Payment/Payment';
AppRegistry.registerComponent('project', () => App);
