'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   Alert,
   Linking,
   TouchableOpacity
 } from 'react-native';

 import {StyleConfig} from '../../style/index';
 import NavigationBar from '../../components/NavigationBar';
 import NewsBulletin from '../../main/myAccount/New/NewsBulletin';
 import YouBiCenter from '../../main/kind/YouBi/YouBiCenter';
 import PersonalData from './PersonalData';
 import AboutUs from './AboutUs/AboutUs';
 import Service from '../../utils/service';
 import Login from '../../main/other/login';
 import Storage from '../../utils/Storage';
 import SecurityCenter from './SecurityCenter/SecurityCenter';
 import OpenHuifu from './OpenHuifu/OpenHuifu.js';
 import AddBank from './OpenHuifu/AddBankCard';
 import AppMain from '../../main/appMain';
 import Invitation from '../../main/kind/Invitation/Invitation';
  import ViewHtml from '../../components/ViewHtml';
 import {ActionUrl} from '../../utils/ActionUrl';
 import {Navigator} from 'react-native-deprecated-custom-components';
 const oPx = StyleConfig.oPx;

  export default class myAccount extends Component{
  	constructor(props) {
  	  super(props);

  	  this.state = {};
  	}

  	//点击头像
  	_head= () =>{
  	 let data = global.USER;
  	 if(data){

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

  	//去登录
  	_goToLogin=()=>{
  		 this.props.navigator.push({
  		 	component:Login,
  		 	name:'Login'
  		 });
  	}

  	//邀请好友
  	_goToInvite= () => {
  	    let data = global.USER;
  	    if(data){
	  	      this.props.navigator.push({
	          component: Invitation,
	          name: 'Invitation'
	      })
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

  	//新闻公告
    _goToNew= () => {
      this.props.navigator.push({
        component: NewsBulletin,
        name: 'NewsBulletin'
      });
    }

    //油币中心
    _goToYouBi= () => {
      let data = global.USER;
      if(data){
	      	this.props.navigator.push({
	        component: YouBiCenter,
	        name: 'YouBiCenter'
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

    //个人中心
    _goToPersonData= () => {
      let data = global.USER;
      if(data){
	      this.props.navigator.push({
	        component: PersonalData,
	        name: 'PersonalData'
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

    //客服热线
    _kefu= () =>{
    	Alert.alert(
              '客服热线',
              '400-1800-550',
              [
                  {text: '取消' },
                  {text: '呼叫' ,onPress: () => {Linking.openURL('tel: 400-1800-550');}},
              ]
          )
    }

    //安全中心
    _goToSecurity= ()=>{
    	let data = global.USER;
      	if(data){
	    	this.props.navigator.push({
	        component: SecurityCenter,
	        name: 'SecurityCenter'
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
    //关于我们
    _goToAboutUs= () => {
      this.props.navigator.push({
        component: AboutUs,
        name: 'AboutUs'
      });
    }

    componentDidMount(){
       this._getData();
    }

    //获取数据
    _getData(){
    	let formTjData = new FormData();
    	formTjData.append("OPT","120");
    	Service.post(formTjData,(data)=>{    		
    		this.setState({
    			userName:data.result.userName,
    			userNameCN:data.result.userNameCN,
    			phone:data.result.phone,
    			isOpenPay:data.result.isOpenPay,//是否开通支付
    			isBoundBank:data.result.isBoundBank,//是否绑定银行卡
    			bankName:data.result.bankName,//银行卡名
    			cardid:data.result.cardid,//银行卡号
    		})
    	})
    }

    //用户名显示   
    disUserName(userName){
    	let data = global.USER;
      	if(!data){
      		userName = '******'
      	}
      	return userName;
    }

    //是否开通
    _isOpen(isOpenPay){
		let user = global.USER;
		if(user){			
			let open = isOpenPay == '0' ?
			<TouchableOpacity onPress={this._goToHuiFu}>
				<Text  style={styles.bottom_font_left}>还未开通,			
			<Text style={styles.bottom_font}>去开通</Text></Text></TouchableOpacity>:
			<Text style={styles.bottom_font_left}>
				已开通
			</Text>
			return open;
		}else{
			return (
				<TouchableOpacity onPress={this._goToLogin}>
					<Text  style={styles.bottom_font_left}>
						还未开通，			
				<Text style={styles.bottom_font}>去开通</Text></Text></TouchableOpacity>);
		}
    }

    //是否绑定银行卡
    _isBind(isBoundBank){
    	let user = global.USER;
		if(user){			
			let bind = isBoundBank == '0' ?
			<TouchableOpacity onPress={this._goToAddBank}>
				<Text style={styles.center_font}>还未绑卡</Text>
				<Text style={styles.bottom_font}>去绑卡</Text>
			</TouchableOpacity>
			:<Text style={styles.center_font}>已绑卡</Text>
			return bind;
		}else{
			return (
				<TouchableOpacity onPress={this._goToLogin}>
					<Text style={styles.center_font}>还未绑卡</Text>
					<Text style={styles.bottom_font}>去绑卡</Text>
				</TouchableOpacity>);
		}
    }

    //webview打开页面
    _openUrl = (url_,title_) =>{
        console.log(title_+':'+url_);
        this.props.navigator.push({
            component:ViewHtml,
            name:'openViewHtml',
            params:{
                url:url_,
                title:title_,
                showTitle:true
            }
        });
    }

    //开通汇付
    _goToHuiFu= ()=>{
    	/*this.props.navigator.push({
        component: OpenHuifu,
        name: 'OpenHuifu'
      });*/
      let url=ActionUrl.PAY_OPEN_ADDRESS;//开通汇付
      this._openUrl(url,"开通汇付");
    }


    //添加银行卡
    _goToAddBank= ()=>{
    	if(this.state.isOpenPay==0){
    	 Alert.alert(
              '提示信息',
              '请先开通汇付！',
              [
                  {text: '确定' },                  
              ]
          )	
    	}else{
    		let url=ActionUrl.CARD_ADD_ADDRESS;//开通汇付
      		this._openUrl(url,"添加银行卡");
	    	/*this.props.navigator.push({
	        component: AddBank,
	        name: 'AddBank'
	      });*/
	    }
    }

    //退出登录显示状态
    disExit(){
    	let data = global.USER;
      	if(!data){
      		return <View></View>
      	}
      	return (<TouchableOpacity style={styles.line} onPress={this.exit}>
 						<Image source={require('../../imgs/myAccount/icon_exist.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>退出登录</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>);
    }

    exit = () => {
      global.USER = null;
      Storage.clear();
      this.props.navigator.resetTo({component:AppMain,name:'AppMain'});
    }

  	render(){
  		return(
  			<ScrollView style={styles.content}>
	  			<View>
	  				{/*<TouchableOpacity style={styles.notice}>
		  				<Image
		  				    style={styles.notice_icon}
		  					source={require('../../imgs/myAccount/notice.png')}/>
	  				</TouchableOpacity>*/}
	  				<NavigationBar title="我的账户"/>
	  				{/*<TouchableOpacity style={styles.info}>
	  					<Image
	  						source={require('../../imgs/myAccount/info.png')}
	  						style={styles.info_icon}/>
	  				</TouchableOpacity>*/}
	  			</View>
	  			<Image
	  				source={require('../../imgs/myWealth/back.png')}
	  				style={styles.back}>
	  				<View style={styles.back_box}>
	  					<View style={styles.head_view}>
		  					<TouchableOpacity onPress={this._head}>
		  						<Image
		  							source={require('../../imgs/myAccount/head.png')}
		  							style={styles.head}/>
		  					</TouchableOpacity>
		  					<View style={{marginLeft:24/oPx}}>
		  						<Text style={styles.name}>{this.disUserName(this.state.userName)}</Text>
		  						{/*<Text style={styles.grade}>会员等级：0</Text>*/}
		  					</View>
	  					</View>
	  					<View style={styles.head_right}>
	  						<TouchableOpacity style={styles.btn} onPress={this._goToInvite}>
	  							<Text style={styles.btn_font}>邀请好友得现金</Text>
	  						</TouchableOpacity>
	  					</View>
	  				</View>
	  			</Image>
	  			<View style={styles.card_box}>
	  				<View style={styles.card_left}>
	  					<Text style={styles.top_font}>资金托管</Text>
	  					<Text style={styles.center_font}>汇付天下</Text>
	  					<View style={{flexDirection:'row'}}>	  						
	  						{this._isOpen(this.state.isOpenPay)}
	  					</View>
	  				</View>
	  				<View style={styles.card_right}>
	  					<Text style={styles.top_font}>我的银行卡</Text>
	  					{/*<Text style={styles.center_font}>还未绑卡</Text>
	  					<Text style={styles.bottom_font}>去绑卡</Text>*/}
	  					{this._isBind(this.state.isBoundBank)}
	  				</View>
	  			</View>
	  			<View style={{marginTop:20/oPx}}>
	  				<TouchableOpacity style={styles.line} onPress={this._goToNew}>
 						<Image source={require('../../imgs/myAccount/icon_new.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>新闻公告</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
          <TouchableOpacity style={styles.line} onPress={this._goToYouBi}>
          <Image source={require('../../imgs/myAccount/icon_myYou.png')}
              style={styles.icon}/>
          <Text style={styles.line_font}>我的油币</Text>
          <Image source={require('../../imgs/myWealth/icon_right.png')}
              style={styles.icon_right}/>
        </TouchableOpacity>
 					<TouchableOpacity style={styles.line} onPress={this._goToPersonData}>
 						<Image source={require('../../imgs/myAccount/icon_myInfo.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>个人资料</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
	  			</View>

	  			<View style={{marginTop:20/oPx}}>
	  				<TouchableOpacity style={styles.line} onPress={this._kefu}>
 						<Image source={require('../../imgs/myAccount/icon_kefu.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_kefu}>客服热线</Text>
 						<Text style={styles.kefu_info}>工作日09:00-21:00  周末09:00-18:00</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
 					<TouchableOpacity style={styles.line} onPress={this._goToSecurity}>
 						<Image source={require('../../imgs/myAccount/icon_safy.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>安全中心</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
 					{/*<TouchableOpacity style={styles.line}>
 						<Image source={require('../../imgs/myAccount/icon_help.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>帮助中心</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>*/}
 					<TouchableOpacity style={styles.line} onPress={this._goToAboutUs}>
 						<Image source={require('../../imgs/myAccount/icon_about.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>关于我们</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>
 					{this.disExit()}
          			{/*<TouchableOpacity style={styles.line}>
 						<Image source={require('../../imgs/myAccount/icon_exist.png')}
 								style={styles.icon}/>
 						<Text style={styles.line_font}>退出登录</Text>
 						<Image source={require('../../imgs/myWealth/icon_right.png')}
 								style={styles.icon_right}/>
 					</TouchableOpacity>*/}
	  			</View>
	  			<View>

	  			</View>
	  		</ScrollView>
  		);
  }
}

	const styles = StyleSheet.create({
		content:{
			backgroundColor:'#f5f5f5',
		},
		notice:{
			position:'absolute',
			left:24/oPx,
			zIndex:9,
			top:40/oPx
		},
		notice_icon:{
			width:42/oPx,
			height:42/oPx
		},
		info:{
			position:'absolute',
			right:24/oPx,
			zIndex:9,
			width:42/oPx,
			height:42/oPx,
			top:40/oPx
		},
		info_icon:{
			width:46/oPx,
			height:44/oPx
		},
		//基本信息
		back:{
			width:StyleConfig.screen_width,
			height:220/oPx
		},
		back_box:{
			width:StyleConfig.screen_width,
			flexDirection:'row',
		},
		head_view:{
			width:375/oPx,
			height:220/oPx,
			flexDirection:'row',
			alignItems: 'center',
			paddingLeft:24/oPx
		},
		head_right:{
			width:375/oPx,
			height:220/oPx,
			alignItems: 'flex-end',
			justifyContent:'center',
			paddingRight:40/oPx
		},
		head:{
			width:120/oPx,
			height:120/oPx,
			borderWidth:StyleConfig.borderWidth,
			borderColor:'#fff',
			borderRadius:60/oPx
		},
		name:{
			fontSize:30/oPx,
			color:'#fff',
		},
		grade:{
			fontSize:24/oPx,
			color:'#fff',
		},
		btn:{
			width:260/oPx,
			height:60/oPx,
			borderColor:'#fff',
			borderWidth:StyleConfig.borderWidth,
			borderRadius:5/oPx,
			alignItems: 'center',
			justifyContent: 'center',
		},
		btn_font:{
			fontSize:30/oPx,
			color:'#fff',
		},
		//卡信息
		card_box:{
			width:StyleConfig.screen_width,
			height:160/oPx,
			flexDirection:'row',
			paddingLeft:24/oPx,
			paddingRight:24/oPx,
			backgroundColor:'#fff',
			borderColor:StyleConfig.borderColor,
			borderBottomWidth:StyleConfig.borderWidth,
		},
		card_left:{
			paddingTop:20/oPx,
			paddingBottom:20/oPx,
			width:350/oPx,
			height:160/oPx,
			borderRightWidth:StyleConfig.borderWidth,
			borderColor:'#ccc',
		},
		card_right:{
			paddingTop:20/oPx,
			paddingBottom:20/oPx,
			paddingLeft:10/oPx,
			width:350/oPx,
			height:160/oPx,
		},
		top_font:{
			color:'#333',
			fontSize:30/oPx,
		},
		center_font:{
			fontSize:24/oPx,
			color:'#999',
			marginTop:8/oPx,
			marginBottom:8/oPx
		},
		bottom_font_left:{
			color:'#333',
			fontSize:24/oPx
		},
		bottom_font:{
			color:'#0f98df',
			fontSize:24/oPx,
		},

		//行
		line:{
			height:100/oPx,
			width:StyleConfig.screen_width,
			backgroundColor:'#fff',
			borderColor:StyleConfig.borderColor,
			borderBottomWidth:StyleConfig.borderWidth,
			paddingLeft:24/oPx,
			paddingRight:24/oPx,
			flexDirection:'row',
			alignItems:'center',
		},
		line_font:{
			color:'#333',
			fontSize:28/oPx,
			width:625/oPx,
			paddingLeft:10/oPx
		},
		line_kefu:{
			paddingLeft:10/oPx,
			color:'#333',
			fontSize:28/oPx,
		},
		kefu_info:{
			fontSize:24/oPx,
			color:'#999',
			width:500/oPx,
			paddingLeft:54/oPx,
		},
		icon:{
			width:42/oPx,
			height:42/oPx
		},
		icon_right:{
			width:22/oPx,
			height:22/oPx,
		},

	});
