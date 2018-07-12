import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackHandler,
  //Navigator,
  StatusBar,
  Platform,
  Alert,
  Linking,
  NativeAppEventEmitter,
  DeviceEventEmitter,
} from 'react-native';

import NavigatorBar from './components/NavigationBar';
import {StyleConfig} from './style';
import {toastShort} from './utils/Toast';
import AppMain from './main/appMain';
import Storage from './utils/Storage';
import {goBack} from './utils/NavigatorBack';
import Welcome from './main/other/WelcomePage';
import JPushModule from 'jpush-react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NewsBulletin from './main/myAccount/New/NewsBulletin';

import Login from './main/other/login';
let _navigator;

//跳转页面之后不能滑回
const NoBackSwipe = {  
...Navigator.SceneConfigs.HorizontalSwipeJump,  
  gestures: {  
    pop: {}  
  }  
};
export default class App extends Component{
    constructor(props){
      super(props);
      this.state = {

      }
    }

    _goback(){
      return goBack(_navigator);
    }

    componentWillMount() {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this._goback);
      }
    }

    componentWillUnmount() {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', this._goback);
      }
    }

    componentDidMount() {

    }

    renderScene(route, navigator){
      let Component = route.component;
      _navigator = navigator;
      return (
         <Component {...route.params} navigator={navigator} route={route} />
      );
    }

    _navigationBar(){
      return <View style={{backgroundColor:'#f00',height:100,width:1000}}></View>
    }

    render(){      
        return (
          <View style={{flex: 1}}>
              <Navigator
                ref='navigator'
                initialRoute={{ name: Welcome, component: Welcome }}
                configureScene={(route) => {
                  /*return Navigator.SceneConfigs.VerticalDownSwipeJump;*/
                  return NoBackSwipe;
                }}
                renderScene={this.renderScene} />
          </View>
      );
    }
}

let styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

//export default App;
