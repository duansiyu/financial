'use strict';
 import React, {Component} from 'react';
 import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	ListView,
	Platform,
	Alert,
	RefreshControl,
 } from 'react-native';

 import {StyleConfig} from '../../../style/index';
 import TitleBar from '../../../components/TitleBar';
 import CashList from './CashList';
 import IncreaseList from './IncreaseList';
 import MoneyList from './MoneyList';
 import {goBack} from '../../../utils/NavigatorBack';
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
 import TabNavigator from 'react-native-tab-navigator';
 import appMain from '../../appMain';
 import ViewHtml from '../../../components/ViewHtml';
 import {ActionUrl} from '../../../utils/ActionUrl';
 import Service from '../../../utils/service';
 const oPx = StyleConfig.oPx;
 export default class MyRed extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {};
 	}

 	_goBack() {
        goBack(this.props.navigator);
    }

    _pressRow(){
    	this.props.navigator.push({
    		component:appMain,
    		name:'appMain',
    		params:{
    			selectedTab:'financial',
    		}
    	});
    }

    _pressMoney(id){
    	let url = ActionUrl.ACTIVATION_ADDRESS;
        Service.URL == url;//激活红包地址
        let getData = new FormData(); 
        getData.append("id",id);
        console.log(id); 
        console.log(this.state.id);  
        console.log(this.props.id);  
    	//getData.append("URL",url);
    	Service.post1(getData,(data)=>{
    		console.log(data);
    		alert(data.errorMsg);   		
    	}) ;  
    }

 	render(){
 		return (
 			<View style={{flex:1,backgroundColor:'#f5f5f5'}}>
 				<TitleBar
		           title={"我的红包"} leftBtnFunc={this._goBack.bind(this)}
         		/>
	            <ScrollableTabView
	              style={styles.scrollable}
	              tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
	              tabBarTextStyle={styles.tabBarTextStyle}
	              tabBarActiveTextColor={'#ffb742'}
	              tabBarInactiveTextColor={'#666'}
	              renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
	              >
	                <CashList tabLabel="代金券" status="1" navigator={this._pressRow.bind(this)}/>
	                <IncreaseList tabLabel="加息券" status="2" navigator={this._pressRow.bind(this)}/>
	                <MoneyList tabLabel="现金券" status="0" navigator={this._pressMoney.bind(this)}/>              
	            </ScrollableTabView>
            </View>
            );
 	}
 }

 const styles = StyleSheet.create({
 	scrollable:{
    position:'relative',
    height:80/oPx,
    backgroundColor:'#f5f5f5',
   /* width:690/oPx,
    marginTop:20/oPx,
    marginLeft:30/oPx,
    marginRight:30/oPx,*/

  },
  defaultBar:{
    height:80/oPx,
    backgroundColor:'#fff',
    borderWidth:StyleConfig.borderWidth,
    borderColor:StyleConfig.borderColor,
  },
  tabStyle:{
    paddingBottom:0,
    height:80/oPx,
    backgroundColor:'#fff',
    //alignSelf: 'center',
    justifyContent:'center',
  },
  tabBarUnderlineStyle:{
    backgroundColor:'#e5383e',
    height:0/oPx,
  },
  tabBarTextStyle:{
    fontSize:28/oPx,
    fontWeight:'200'
  },
 })