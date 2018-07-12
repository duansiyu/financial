import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  //Navigator,
  TouchableOpacity,
} from 'react-native';

import TitleBar from '../../../components/TitleBar';
import {StyleConfig} from '../../../style';
import Invitation from '../../kind/Invitation/Invitation';
import MyInvitation from '../../kind/Invitation/MyInvitation';
import {goBack} from '../../../utils/NavigatorBack';
import {Navigator} from 'react-native-deprecated-custom-components';
const oPx = StyleConfig.oPx;

export default class Rules extends Component{
  constructor(props) {
      super(props)
  }

  //返回
    _goBack(){
        goBack(this.props.navigator);
    }

  render(){
    return(
      <View>
        <TitleBar title='查看规则' leftBtnFunc={this._goBack.bind(this)}/>
        <Text style={styles.text}>
          1.推荐资格：平台已投资用户；
        </Text>
        <Text style={styles.text}>
          2.一位老用户限最多推荐30人，超出人数部分不享受推荐奖励；
        </Text>
        <Text style={styles.text}>
          3.推荐方式：被推荐人在填写注册信息时，直接填写推荐人用户名；或被推荐人通过推荐人的推荐链接进行注册；
        </Text>
        <Text style={styles.text}>
          4.活动期间内，好友注册且单笔投资金额≥2000元，计为一个有效邀请人数；
        </Text>
        <Text style={styles.text}>
          5.活动结束时，有效邀请的好友数达到对应数量，可获得对应的奖励，有效邀请人奖励不可叠加；
        </Text>
        <Text style={styles.text}>
          6.奖励发放：推荐好友注册投资后15元现金以现金券的形式立即发放至推荐人的账户中，额外的现金奖励将在活动结束后3个工作日内（节假日顺延）统计发放，现金券可取现可投资；
        </Text>
        <Text style={styles.text}>
          7:除债券转让项目外，其余理财产品均可参与。
        </Text>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
      text:{
        paddingLeft:24/oPx,
        paddingBottom:10/oPx,
        lineHeight:26,
        fontSize:28/oPx,
        color:'#333',
        fontWeight:'400'
      }
  })
