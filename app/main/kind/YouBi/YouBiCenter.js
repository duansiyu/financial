'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   Alert,
   Animated,
   Easing,
   ScrollView,
   TouchableOpacity,
   Dimensions,
   ListView,
 	 RefreshControl,
   Modal,
   TouchableHighlight
 } from 'react-native';
 import {StyleConfig} from '../../../style/index';
 import TitleBar from '../../../components/TitleBar';
 import YouBiDetail from '../YouBi/YouBiDetail';
 import YouBiList from '../YouBi/YouBiList';
 import Index from '../../index/index';
 import { goBack } from '../../../utils/NavigatorBack';
 import TabNavigator from 'react-native-tab-navigator';
 import Service from '../../../utils/service';
 import LookPrize from './LookPrize';
 import ViewHtml from '../../../components/ViewHtml';
 import {ActionUrl} from '../../../utils/ActionUrl';
 import {Navigator} from 'react-native-deprecated-custom-components';
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

 const oPx = StyleConfig.oPx;
 const {width, height} = Dimensions.get('window');
 export default class YouBiCenter extends Component{
   constructor(props) {
 	  super(props);
 	  this.state = {
      show:false,  
    };
 	}

  componentDidMount(){
       this._getData();
    }

    //获取数据
    _getData(){
      let formTjData = new FormData();
      formTjData.append("OPT","124");
      console.log(formTjData);
      Service.post(formTjData,(data)=>{
        console.log(data);
        this.setState({
          total:data.result.total, //油币总额
          tendMoneyShould:data.result.total,  //建议投资额
          pointsNunberRest:data.result.pointsNunberRest, //距离下一级的油币差额
          loanMonth:data.result.loanMonth, //建议投资几月标

        })
      })
    }

  // 显示/隐藏 兑换规则
  _setModalVisible() {  
    let isShow = this.state.show;  
    this.setState({  
      show:!isShow,  
    });  
  } 

  _rightButtonClick() {  
    this._setModalVisible();  
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

  _goToLookPrize() {
    let url=ActionUrl.HOST;//地址
    url+='/mobileVisitor/hd_16120102.htm';
    this._openUrl(url,"查看奖品");
  }

  //返回
  _goBack(){
      goBack(this.props.navigator);
  }

  render(){
    let data = global.USER;
    return(
      <View style={{flex:1,position:'relative'}}>
        <TitleBar title="邮币中心" leftBtnFunc={this._goBack.bind(this)}/>
          <View style={styles.content}>
            <View style={styles.top_view}>
              <View style={styles.flex}>
                <View style={styles.left}>
                  <Text style={styles.red}>{data.USERNAME}，</Text>
                  <Text style={styles.black}>您好！</Text>
                </View>
                <TouchableOpacity style={styles.right} onPress={this._goToLookPrize.bind(this)}>
                  <Text style={styles.prize}>(查看奖品)</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flex}>
                <View style={styles.left}>
                  <Text style={styles.black}>您当前邮币：</Text>
                  <Text style={styles.red}>{this.state.total}</Text>
                </View>
                <TouchableOpacity style={styles.right} onPress={this._rightButtonClick.bind(this)}>
                  <Text style={styles.prize}>(兑换规则)</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flex}>
                <Text style={styles.top_text}>距下一阶段奖励还差
                  <Text style={styles.small_red}>{this.state.pointsNunberRest}</Text>
                  邮币，建议投资
                <Text style={styles.small_red}>{this.state.loanMonth}</Text>月标
                <Text style={styles.small_red}>{this.state.tendMoneyShould}</Text>元</Text>
              </View>
            </View>
            <Text style={styles.center_text}>邮币明细</Text>
          </View>
          <ScrollableTabView
            style={styles.scrollable}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarActiveTextColor={'#e5383e'}
            tabBarInactiveTextColor={'#333'}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.defaultBar}/>}
            >
              <YouBiList tabLabel="全部" pointUseTypeId='0'/>
              <YouBiList tabLabel="收入" pointUseTypeId='1'/>
              <YouBiList tabLabel="支出" pointUseTypeId='2'/>
          </ScrollableTabView>
          <Modal  
           animationType={'none'}  
           transparent={true}  
           visible={this.state.show}  
           onShow={() => {}}  
           onRequestClose={() => {}} >
            <View style={styles.modalStyle}>  
             <View style={styles.subView}>  
               <Text style={styles.titleText}>  
                 兑换规则 
               </Text>  
               <Text style={styles.contentText}>  
                 投资3月标，1元=2油币  
               </Text> 
               <Text style={styles.contentText}>  
                 投资6月标，1元=5油币  
               </Text>
               <Text style={styles.contentText}>  
                 投资9月标，1元=8油币  
               </Text>
               <Text style={styles.contentText}>  
                 投资12月标，1元=12油币  
               </Text> 
               <View style={styles.horizontalLine} />  
               <View style={styles.buttonView}>  
                 <TouchableHighlight underlayColor='transparent'  
                   style={styles.buttonStyle}  
                   onPress={this._setModalVisible.bind(this)}>  
                   <Text style={styles.buttonText}>  
                     取消  
                   </Text>  
                 </TouchableHighlight>  
                 <View style={styles.verticalLine} />  
                 <TouchableHighlight underlayColor='transparent'  
                   style={styles.buttonStyle}  
                   onPress={this._setModalVisible.bind(this)}>  
                   <Text style={styles.buttonText}>  
                     确定  
                   </Text>  
                 </TouchableHighlight>  
               </View>  
             </View>  
           </View>  
          </Modal>
      </View>
    );
  }
 }

 const styles = StyleSheet.create({
   content:{
     backgroundColor:'#f5f5f5',
   },
   top_view:{
     backgroundColor:'#FFF',
     width:750/oPx,
     paddingLeft:24/oPx,
     paddingRight:24/oPx,
     paddingTop:24/oPx,
     paddingBottom:24/oPx,
   },
   flex:{
     flexDirection:'row',
   },
   left:{
     width:351/oPx,
      flexDirection:'row',
   },
   right:{
     width:351/oPx,
     justifyContent:'flex-end',
   },
   prize:{
     color:'#0099FF',
     fontSize:28/oPx,
     lineHeight:26,
     textAlign:'right',
   },
   red:{
     color:'#ec091a',
     fontSize:28/oPx,
     lineHeight:26,
   },
   black:{
     color:'#333',
     fontSize:28/oPx,
     lineHeight:26,
   },
   top_text:{
     fontSize:24/oPx,
     lineHeight:21,
     color:'#666',
   },
   small_red:{
     fontSize:24/oPx,
     color:'#ec091a',
   },
   center_text:{
     fontSize:28/oPx,
     color:'#666',
     paddingLeft:24/oPx,
     marginTop:10/oPx,
     marginBottom:10/oPx,
   },
   button: {
     height: 45,
     backgroundColor: '#fff',
     alignSelf: 'stretch',
     justifyContent: 'center',
     },
  //菜单
  TabNavigator:{
    backgroundColor:'#fff',
    //shadowColor:'#000',
    //shadowOffset:{height:0,width:0},
    //shadowOpacity:.2,
    width:750/StyleConfig.oPx,
    height:80/StyleConfig.oPx,
    position:'relative',
    alignItems:'center',
    //marginTop:80/oPx,
  },
  textStyle:{
    fontSize:28/StyleConfig.oPx,
    color:'#333',
    marginBottom:4
  },
  selectedTextStyle:{
     fontSize:28/StyleConfig.oPx,
     color:'#ff404c',
     borderBottomWidth:3/oPx,
     borderColor:'#ff404c',
  },
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
    height:0/oPx,
  },
  tabBarTextStyle:{
    fontSize:28/oPx,
    fontWeight:'200'
  },
  invest_container:{
    flex:1,
    backgroundColor:'#fff',
    marginTop:16/oPx
  },

  modalStyle: {  
    backgroundColor:'rgba(0,0,0,0.5)',  
    alignItems: 'center',  
    justifyContent:'center',  
    flex:1,  
  },  
  // modal上子View的样式  
  subView:{  
    marginLeft:60,  
    marginRight:60,  
    backgroundColor:'#fff',  
    alignSelf: 'stretch',  
    justifyContent:'center',  
    borderRadius: 10,  
    borderWidth: 0.5,  
    borderColor:'#ccc',  
  },  
  // 标题  
  titleText:{  
    marginTop:10/oPx,  
    fontSize:28/oPx,  
    fontWeight:'bold',  
    textAlign:'center',  
  },  
  // 内容  
  contentText:{  
    margin:8/oPx,  
    fontSize:28/oPx,  
    textAlign:'center',  
  },  
  // 水平的分割线  
  horizontalLine:{  
    marginTop:5,  
    height:0.5,  
    backgroundColor:'#ccc',  
  },  
  // 按钮  
  buttonView:{  
    flexDirection: 'row',  
    alignItems: 'center',  
  },  
  buttonStyle:{  
    flex:1,  
    height:44,  
    alignItems: 'center',  
    justifyContent:'center',  
  },  
  // 竖直的分割线  
  verticalLine:{  
    width:0.5,  
    height:44,  
    backgroundColor:'#ccc',  
  },  
  buttonText:{  
    fontSize:28/oPx,  
    color:'#3393F2',  
    textAlign:'center',  
  },  
 })
