import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  PixelRatio,
  Dimensions,
  Alert
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Index from './index/index';
import Financial from './financial/financial';
import {StyleConfig} from '../style';
import MyWealth from './myWealth/myWealth';
import MyAccount from './myAccount/myAccount';
//import Service from '../utils/service';

export default class AppMain extends Component{
  constructor(props){
     super(props);
     this.state = {
       selectedTab:props.selectedTab||'index'
     }
   }
     render(){
     return (
       <View style={{flex:1}}>        
           <TabNavigator tabBarStyle={styles.TabNavigator}>
             <TabNavigator.Item
               title="主页"
               selected={this.state.selectedTab === 'index'}
               selectedTitleStyle={styles.selectedTextStyle}
               titleStyle={styles.textStyle}
               renderIcon={() => <Image source={require("../imgs/icon/icon_01.png")} style={styles.iconStyle}/>}
               renderSelectedIcon={() => <Image source={require("../imgs/icon/icon_01_pre.png")} style={styles.iconStyle}/>}
               onPress={() => this.setState({ selectedTab: 'index' })}>
               <Index {...this.props}/>
             </TabNavigator.Item>
             <TabNavigator.Item
               title="理财"
               selected={this.state.selectedTab === 'financial'}
               selectedTitleStyle={styles.selectedTextStyle}
               titleStyle={styles.textStyle}
               renderIcon={() => <Image source={require("../imgs/icon/icon_02.png")} style={styles.iconStyle}/>}
               renderSelectedIcon={() => <Image source={require("../imgs/icon/icon_02_pre.png")} style={styles.iconStyle}/>}
               onPress={() => this.setState({ selectedTab: 'financial' })}>
              <Financial {...this.props}/>
             </TabNavigator.Item>
             <TabNavigator.Item
               title="我的财富"
               selected={this.state.selectedTab === 'myWealth'}
               selectedTitleStyle={styles.selectedTextStyle}
               titleStyle={styles.textStyle}
               renderIcon={() => <Image source={require("../imgs/icon/icon_03.png")} style={styles.iconStyle}/>}
               renderSelectedIcon={() => <Image source={require("../imgs/icon/icon_03_pre.png")} style={styles.iconStyle}/>}
               onPress={() => this.setState({ selectedTab: 'myWealth' })}>
              <MyWealth {...this.props}/>
             </TabNavigator.Item>
             <TabNavigator.Item
               title="我的账户"
               selected={this.state.selectedTab === 'myAccount'}
               selectedTitleStyle={styles.selectedTextStyle}
               titleStyle={styles.textStyle}
               renderIcon={() => <Image source={require("../imgs/icon/icon_04.png")} style={styles.iconStyle}/>}
               renderSelectedIcon={() => <Image source={require("../imgs/icon/icon_04_pre.png")} style={styles.iconStyle}/>}
               onPress={() => this.setState({ selectedTab: 'myAccount' })}>
              <MyAccount {...this.props}/>
             </TabNavigator.Item>
           </TabNavigator>
        
     </View>
     )
   }
 }
 const styles = StyleSheet.create({
     TabNavigator:{
       backgroundColor:'#ffb133',
       shadowColor:'#fff',
       shadowOffset:{height:0,width:0},
       shadowOpacity:.2,
       width:750/StyleConfig.oPx,
       height:110/StyleConfig.oPx,
       alignItems:'center',
       paddingTop:10/StyleConfig.oPx,
     },
     back:{
      width:750/StyleConfig.oPx,
      height:98/StyleConfig.oPx,
      position:'absolute',
      bottom:0,
      left:0,
     },
     iconStyle:{
       width:48/StyleConfig.oPx,
       height:48/StyleConfig.oPx,
     },
     textStyle:{
       fontSize:20/StyleConfig.oPx,
       color:'#fff',
       marginBottom:10/StyleConfig.oPx,
     },
     selectedTextStyle:{
        fontSize:20/StyleConfig.oPx,
        color:'#ec091a',
     }
  });
