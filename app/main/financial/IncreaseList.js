'use strict';
 import React, {Component} from 'react';
 import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	ListView,
 } from 'react-native';

 import {StyleConfig} from '../../style/index';
 import OneCoupon from './oneCoupon';
 import TitleBar from '../../components/TitleBar';
 import {goBack} from '../../utils/NavigatorBack';
 import Service from '../../utils/service';
 import financialDetail from './financiaDetail';
 import {Navigator} from 'react-native-deprecated-custom-components';
 const oPx = StyleConfig.oPx;
 export default class IncreaseList extends Component{
 	constructor(props) {
 	  super(props); 	
 	  let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 	  this.state = {
 	  	//status:this.props.status,
 	  	listData: listData.cloneWithRows([]),
 	  	itemValue:''
 	  };
 	}

 	_onPress(money){
    	this.props.navigator.push({
         component: financialDetail,
         name: 'financialDetail',
          params:{
            id:this.props.id,
            title:this.props.title,
            increaseMoney:money,
            money:this.props.money,
            investMoney:this.props.investMoney,
          }
   		})
 	}

  //不使用
  noUse(){
    this.props.navigator.push({
         component: financialDetail,
         name: 'financialDetail',
          params:{
            id:this.props.id,
            title:this.props.title,
            money:"a",
            increaseMoney:this.props.money,
            investMoney:this.props.investMoney,
          }
      })
  }

 	_goBack(){
      goBack(this.props.navigator);
    }

 	componentDidMount(){
 		this._getData();
 		this.setState({
 			status:this.props.status,
 			id:this.props.id,
      investMoney:this.props.investMoney,
 		})
 	}
 	
 	_getData(){
 		let formData = new FormData();
 		formData.append("OPT","129");
 		formData.append("status",2);
 		Service.post(formData,(data)=>{
 			if(data.errorCode==0){
	 			var loanData = data.result.myredmoney;
	 			this.setState({
	 				 listData: this.state.listData.cloneWithRows(loanData),
	 			})
 			}else{
 				alert(data.errorMsg);
 			}
 		})

 	}
 	//生成list
     _renderRow(data){
       return (
          <OneCoupon data={data} onPress={this._onPress.bind(this)}/>
        );
     }

 	render(){
 		return(
 			<View style={{backgroundColor:'#f5f5f5'}}>
 				<TitleBar title="加息券" leftBtnFunc={this._goBack.bind(this)}/>
 				<TouchableOpacity style={styles.one} onPress={this.noUse.bind(this)}>
	 				<View style={styles.line}></View>
	 				<View style={styles.content}>
	 					<Text style={{textAlign:'center',fontSize:30/oPx,color:'#f7315c'}}>不使用</Text>
	 				</View>
 				</TouchableOpacity>
	 			<ListView
	         		dataSource={this.state.listData}
	            renderRow={this._renderRow.bind(this)}         
	         		enableEmptySections = {true}/>
         	</View>
 	  );
 	}
 }

 const styles = StyleSheet.create({
 	one:{
 		marginLeft:24/oPx,
 		marginRight:24/oPx,
 		marginTop:10/oPx,
 		borderRadius:8/oPx, 
 		backgroundColor:'#fff',
 		width:StyleConfig.screen_width-48/oPx,		
 	},
 	line:{
 		height:30/oPx,
 		width:StyleConfig.screen_width-48/oPx,
 		backgroundColor:'#f7315c',
 		borderTopLeftRadius:8/oPx,
 		borderTopRightRadius:8/oPx,
 	},
 	content:{
 		width:StyleConfig.screen_width-48/oPx,
 		justifyContent:'center',
 	},
 })