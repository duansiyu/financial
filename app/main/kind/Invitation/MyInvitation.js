import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native';

import TitleBar from '../../../components/TitleBar';
import {StyleConfig} from '../../../style';
import Invitation from '../../kind/Invitation/Invitation';
import {goBack} from '../../../utils/NavigatorBack';
import Service from '../../../utils/service';
import {Navigator} from 'react-native-deprecated-custom-components';
const oPx = StyleConfig.oPx;

export default class MyInvitation extends Component{
  constructor(props) {
      super(props);
      this.state={

      };
  }

  //返回
    _goBack(){
        goBack(this.props.navigator);
    }

  _renderRow(data){
		return(
			<View style={styles.data_content}>
        <Text style={styles.data_title_font}>{data.username}</Text>
        <Text style={styles.data_title_font}>{data.createTime}</Text>
        <Text style={styles.data_title_font}>{data.rewardMoney}</Text>
      </View>
			);
	}

  returnElm(){
     return <ListView dataSource={this.state.dataSource}
         renderRow={this._renderRow.bind(this)}
         />
  }

  componentDidMount(){
    this._getData();
  }

  _getData(){
    let invData = new FormData();
    invData.append("OPT","163");
    Service.post(invData,(data)=>{
      console.log(data.result.count);

      this.setState({
        count:data.result.count, //共邀请
        effectiveCount:data.result.effectiveCount,//已生效好友数
        username:data.result.myInvitation.username,//用户名
        createTime:data.result.myInvitation.createTime,// 推广时间
        rewardMoney:data.result.myInvitation.rewardMoney,//推荐奖金额
      });
    })
  }

  render(){
    return(
      <View>
        <TitleBar title='我的邀请' leftBtnFunc={this._goBack.bind(this)}/>
        <View style={styles.top}>
          <View style={styles.top_view}>
            <Text style={styles.top_text}>共邀请好友：
              <Text style={styles.red}>{this.state.count}个</Text>
            </Text>
          </View>
          <View style={styles.top_view}>
            <Text style={styles.top_text}>已生效好友：
              <Text style={styles.red}>{this.state.effectiveCount}个</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.detail}>奖励明细</Text>
        <View style={styles.data_title}>
          <Text style={styles.data_title_font}>会员名</Text>
          <Text style={styles.data_title_font}>注册时间</Text>
          <Text style={styles.data_title_font}>奖金</Text>
        </View>
        {this.returnElm}
      </View>
    );
  }
}
  const styles = StyleSheet.create({
     top:{
       width:StyleConfig.screen_width,
       height:60/oPx,
       alignItems:'center',
       paddingLeft:24/oPx,
       paddingRight:24/oPx,
       flexDirection:'row',
     },
     top_view:{
       width:350/oPx,
     },
     top_text:{
       fontSize:28/oPx,
       color:'#333',
       fontWeight:'400'
     },
     red:{
       fontSize:28/oPx,
       color:'#ec091a',
     },
     detail:{
       fontSize:28/oPx,
       color:'#666',
       paddingLeft:24/oPx,
       height:60/oPx,
       alignItems:'center',
     },
     data_title:{
       flexDirection:'row',
       backgroundColor:'#f5f5f5',
       paddingLeft:24/oPx,
       height:80/oPx,
       alignItems:'center',
     },
     data_title_font:{
       flex:1,
       fontSize:26/oPx,
       color:'#333'
     },
     data_content:{
       flexDirection:'row',
       backgroundColor:'#fff',
       paddingLeft:24/oPx,
       height:80/oPx,
       alignItems:'center',
     },

  })
