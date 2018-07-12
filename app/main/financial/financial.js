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
 import {StyleConfig} from '../../style/index';
 import NavigationBar from '../../components/NavigationBar';
 import styles from '../../style/financial';
 import FinacialList from './financialList';
 import ZQZRPage from './ZQZRPage';
 import ZRDetail from './ZRDetail';
 import ProductList from '../../components/product';
 import Service from '../../utils/service';
 import financialDetail from './financiaDetail';
 import Login from '../../main/other/login';
 import TabNavigator from 'react-native-tab-navigator';

 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
 const oPx = StyleConfig.oPx;
 let paddingHeight = Platform.OS === 'ios' ? 20 : 25;

 export default class Financial extends Component{
 	constructor(props) {
 	  super(props);
 	  let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 	  this.state = {
          isRefreshing:false,
          listData: listData.cloneWithRows([])
	  };
 	}
  
     //产品点击事件
     _pressRow = (id,title) => {
       let data = global.USER;
       if(data){
          this.props.navigator.push({
         component: financialDetail,
         name: 'financialDetail',
          params:{
            id:id,
            title:title,
          }
       });
       }else{
        Alert.alert(
              '提示信息',
              '您还未登录，请先登录！',
              [
                  {text: '取消' },
                  {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
              ]
          )
       }
      }

      //债权产品点击事件
     _pressZQRow = (id,title) => {
      let data = global.USER;
       if(data){
          this.props.navigator.push({
         component: ZRDetail,
         name: 'ZRDetail',
          params:{
            id:id,
            title:title,
          }
       });
       }else{
        Alert.alert(
              '提示信息',
              '您还未登录，请先登录！',
              [
                  {text: '取消' },
                  {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
              ]
          )
       }
     }

 	render(){
 		return(
 			<View style={{flex:1}}>
 				<NavigationBar
		           title={"理财"}
         		/>
            <ScrollableTabView
              style={styles.scrollable}
              tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
              tabBarTextStyle={styles.tabBarTextStyle}
              tabBarActiveTextColor={'#e5383e'}
              tabBarInactiveTextColor={'#333'}
              initialPage={0}
              renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
              >
                <FinacialList tabLabel="全部" navigator={this._pressRow}/>
                <FinacialList tabLabel="新手标" loanSigntypeId="4" navigator={this._pressRow}/>
                <FinacialList tabLabel="中金链" loanSigntypeId="6" navigator={this._pressRow}/>
                <ZQZRPage tabLabel="债权转让" navigator={this._pressZQRow}/>
            </ScrollableTabView>
            {/*<ScrollableTabView
              style={styles.scrollable2}
              tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
              tabBarTextStyle={styles.tabBarTextStyle}
              tabBarActiveTextColor={'#e5383e'}
              tabBarInactiveTextColor={'#333'}
              renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle2} style={styles.defaultBar}/>}
              >
                <Text tabLabel="全部期限"/>
                <Text tabLabel="天标"/>
                <Text tabLabel="1个月"/>
                <Text tabLabel="3个月"/>
                <Text tabLabel="6个月"/>
                <Text tabLabel="9个月"/>
                <Text tabLabel="12个月"/>
            </ScrollableTabView>*/}
				{/* <View>
					<ListView
						dataSource={this.state.listData}
						renderRow={this._renderRow}
						enableEmptySections={true}
					/>
				</View> */}
 			</View>
 			);
 	}

 }
