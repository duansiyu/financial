'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ListView,
   TouchableOpacity
 } from 'react-native';
 import TitleBar from '../../../components/TitleBar';
 import {goBack} from '../../../utils/NavigatorBack';
 import {Navigator} from 'react-native-deprecated-custom-components';
 import {StyleConfig} from '../../../style/index';
 import NewDetail from './NewDetail';
 import TabNavigator from 'react-native-tab-navigator';
 import NewList from './NewList';
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
 const oPx = StyleConfig.oPx;

 export default class NewsBulletin extends Component {
   constructor(props) {
     super(props);
     this.state = {
     };
   }

   _goBack(){
     goBack(this.props.navigator);
   }

     //产品点击事件
   _pressRow(afficheId){
        this.props.navigator.push({
       component: NewDetail,
       name: 'NewDetail',
        params:{
          afficheId:afficheId,
        }
     });
    }

   render(){
     return(
       <View style={{flex:1}}>
         <TitleBar title='新闻公告' leftBtnFunc={this._goBack.bind(this)}/>
         <ScrollableTabView
           style={styles.scrollable}
           tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
           tabBarTextStyle={styles.tabBarTextStyle}
           tabBarActiveTextColor={'#e5383e'}
           tabBarInactiveTextColor={'#333'}
           renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
           >
             <NewList tabLabel="网站公告" deputysectionId="0" navigator={this._pressRow.bind(this)}/>
             <NewList tabLabel="媒体报告" deputysectionId="1" navigator={this._pressRow.bind(this)}/>
             <NewList tabLabel="公司动态" deputysectionId="2" navigator={this._pressRow.bind(this)}/>
         </ScrollableTabView>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   scrollable:{
     position:'relative',
     height:80/oPx,
     backgroundColor:'#f5f5f5'
   },
   defaultBar:{
     borderWidth:0,
     height:80/oPx,
     backgroundColor:'#fff',
   },
   tabStyle:{
     width:220/oPx,
     paddingBottom:0,
     height:80/oPx,
     borderWidth:0,
     backgroundColor:'#fff',
     alignSelf: 'center',
   },
   tabBarUnderlineStyle:{
     backgroundColor:'#e5383e',
     height:3/oPx,
   },
   tabBarTextStyle:{
     fontSize:28/oPx,
     fontWeight:'200'
   },
 })
